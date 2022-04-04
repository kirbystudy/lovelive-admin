import COS from 'cos-js-sdk-v5'
import { createUploaderComponent } from 'quasar'
import { finishUpload, initUpload } from '../api/file.js'
import { ref } from 'vue'
import md5 from 'md5'
import { useStore } from 'vuex'

// 导出Vue组件
export default createUploaderComponent({
  // 在这里定义QUploader插件

  name: 'CosUploader', // 组件的名称

  props: {
    // ...您的自定义道具
  },

  emits: [
    // 您的自定义事件名称列表
    'file-uploaded'
  ],

  injectPlugin({ props, emit, helpers }) {
    const fileId = ref(null)
    const initCosClient = () => {
      return new COS({
        getAuthorization: (options, callback) => {
          const file = helpers.queuedFiles.value[0]
          const uploadFile = {
            name: file.name.substring(0, file.name.lastIndexOf('.')),
            size: file.size,
            key: md5(file.__key),
            ext: file.name.substring(file.name.lastIndexOf('.'))
          }

          initUpload(uploadFile).then(res => {
            fileId.value = res.fileId
            callback({
              TmpSecretId: res.secretId, // 获取回来的临时密钥的 tmpSecretId
              TmpSecretKey: res.secretKey, // 获取回来的临时密钥的 tmpSecretKey
              SecurityToken: res.sessionToken, // 获取回来的临时密钥的 sessionToken
              StartTime: res.startTime, // 创建时间戳
              ExpiredTime: res.expiredTime, // 过期时间戳
              ScopeLimit: true // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            })
          })
        }
      })
    }
    const cos = initCosClient()

    const store = useStore()
    const bucket = store.getters['setting/bucket']
    const region = store.getters['setting/region']

    // 可以在这里调用任何其他可组合项
    // 因为这个函数将在组件的 setup() 中运行

    // [ 必需的！]
    // 我们正在上传文件
    const isUploading = ref(false)

    // [ 可选的 ]
    // 在顶部显示叠加层
    // 上传者表示它正在等待
    // 在某事上（阻止所有控件）
    const isBusy = ref(false)

    const uploadedFiles = ref(new Set())
    const taskId = ref('')

    // [ 必需的！]
    // 中止并清理任何进程
    // 正在进行中
    const abort = e => {
      console.log(e)
    }

    // [ 必需的！]
    // 开始上传过程
    const upload = () => {
      // cos 上传
      uploadFiles()
      isUploading.value = true
    }

    const uploadFiles = () => {
      let file = helpers.queuedFiles.value[0]
      cos.uploadFile({
        Bucket: bucket,
        Region: region,
        Key: md5(file.__key),
        Body: file,
        SliceSize: 1024 * 1024 * 10, // 分片大小
        onTaskReady(id) {
          taskId.value = id
          console.log(taskId)
        },
        onProgress: progressData => {
          isBusy.value = false
          isUploading.value = true
          helpers.updateFileStatus(file, 'uploading', progressData.loaded)
        },
        onFileFinish: () => {
          finishUpload(fileId.value).then(uploadedFile => {
            helpers.updateFileStatus(file, 'uploaded', file.size)
            helpers.uploadedFiles.value = [file]
            helpers.uploadedSize.value = file.size
            helpers.queuedFiles.value = []
            isUploading.value = false
            helpers.updateFileStatus(file, 'uploaded')
            emit('file-uploaded', uploadedFile)
          })
        }
      })
    }

    return {
      isUploading,
      isBusy,
      abort,
      upload
    }
  }
})
