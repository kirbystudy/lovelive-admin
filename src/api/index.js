import { get } from "./request";


export const getIndex = ()=> {
    return get('/index')
}