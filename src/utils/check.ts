import { Response } from '@/types/IData'
import { message } from 'antd';

export const isFunction = (obj: any) => typeof obj === "function" && typeof obj.nodeType !== "number";
export const isWindow = () => global.window ? true : false;
export const hasChina = (str: string) => /.*[\u4e00-\u9fa5]+.*$/.test(str);
export const isNullObject = (obj: object) => JSON.stringify(obj) === "{}";
export const isPC = () => isWindow() && !Boolean(window.navigator.userAgent.match(/(Android|iPhone|SymbianOS|Phone|iPad|iPod)/i));
export const isNode = () => !isWindow();
export const isJsonString = (str: string) => {
    try {
        const o = JSON.parse(str)
        return o;
    } catch (error) {
        return false;
    }
}
export const checkResultError = (res: Response) => {
    if (res.code !== 200) {
        message.error(res.message);
        return true;
    }
}