import React, { useState } from "react";
import { Upload as AntdUpload, message } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { FC } from "react";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";

interface Props extends UploadProps {
  maxSize?: number;
  onFinish?: Function;
  children?: React.ReactNode | Function;
}

/**
 * 在 Antd Upload 组件基础上封装的上传组件
 * @param {*} props
 */
const Upload: FC<Props> = function Upload(props) {
  const [loading, setLoading] = useState(false);
  const { maxSize, children, onFinish } = props;

  async function beforeUpload(file: RcFile) {
    const isLtMax = !maxSize || file.size / 1024 < maxSize;
    if (!isLtMax) {
      message.error(
        `图片必须小于 ${maxSize < 1024 ? maxSize + "kb" : maxSize / 1024 + "M"}`
      );
    }
    const res = isLtMax;
    if (res) setLoading(true);

    return false;
  }

  const onChnageHandler = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      if (onFinish) onFinish(info);
      setLoading(false);
    }
  };

  return (
    <AntdUpload
      {...props}
      beforeUpload={beforeUpload}
      onChange={onChnageHandler}
    >
      {typeof children === "function" ? children(loading) : children}
    </AntdUpload>
  );
};
export default Upload;
