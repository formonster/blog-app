import { message } from "antd";


export type UploadProps = {
    url: string
    params: any
    onload?: (res: any) => any,
    onerror?: () => void,
    onprogress?: (progress: number) => void,
}

export const upload = ({ url, params, onload, onerror, onprogress }: UploadProps) => {
    var form = new FormData();

    for (var i in params) {
        if (Array.isArray(params[i])) params[i].map((val: any) => form.append(i, val));
        else form.append(i, params[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.onload = function(e) {
        if (xhr.status === 200) {
            const result = JSON.parse(xhr.response);
            if (onload) onload(result);
        } else {
            onerror ? onerror() : message.error("文件上传失败！");
        }
    };
    xhr.onerror = onerror;
    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            if (onprogress) onprogress(Math.round((e.loaded * 100) / e.total))
        } else message.error("当前浏览器无法显示进度！");
    };
    xhr.send(form);
};