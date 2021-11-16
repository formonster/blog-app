import React from "react";
import { message } from "antd";

const sendForm = ({ url, params, onload, onerror, onprogress }: any) => {
  var form = new FormData();

  for (var i in params) {
    if (params[i].length) params[i].map((val: any) => form.append(i, val));
    else form.append(i, params[i]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("post", url, true);
  xhr.onload = () => {
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
      if (onprogress) onprogress(Math.round((e.loaded * 100) / e.total));
    } else message.error("当前浏览器无法显示进度！");
  };
  xhr.send(form);
};

/**
 * @param {*} props
 */
function UploadContainer(props: any) {
  const { onUploadFinish, action } = props;

  const _props = { ...props };

  function _onUploadFinish(file: any) {
    return function (res: any) {
      if (onUploadFinish)
        onUploadFinish({
          file,
          response: res,
        });
    };
  }

  function onKeyDownHandler(event: any) {
    const paste = event.clipboardData || (window as any).clipboardData;
    [...paste.items].forEach(async (item) => {
      if (item.kind === "file") {
        var f = item.getAsFile();
        if (action)
          sendForm({
            url: action,
            params: { files: f },
            onload: _onUploadFinish(f),
          });
        else onUploadFinish({ file: f });
      }
    });
  }

  return (
    <div {..._props} onPaste={onKeyDownHandler}>
      {props.children}
    </div>
  );
}

export default UploadContainer;
