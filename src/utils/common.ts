import { Response } from '@/types/IData';
import { isWindow } from '@/utils/check';

export const resSuccess = <T>(data: T): Response<T> => {
    return { message: "success", code: 200, data }
}
export const resError = (msg: string): Response<unknown> => {
    return { message: msg, code: 500, data: null }
}
export const nowTimeSecond = () => Math.floor(new Date().getTime() / 1000);
// 检查服务端返回结果是否有异常
export const checkServerResult = (res: Response<unknown>) => res.code !== 200;

type ReplaceOption = {
    [keyof in string]: string;
}
export const createHtml = (template: string, replaceOption: ReplaceOption): string => {
    Object.entries(replaceOption).map(([key, value]) => {
        template = template.replace(key, value);
    })
    return template;
}
function getOs() {
    if (!isWindow()) return;
    var ua = window.navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}
export const os = getOs();