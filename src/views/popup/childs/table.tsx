import React, { useEffect, useState, FC } from "react";
import { Form, Input, Button, Upload, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { addFoler } from "@/controller/folder";
import { uploadUrl } from "@/api/qiniu";
import { usePopup } from "@/store/popup";
import CustomForm, { CustomFormColumn } from "@/views/components/CustomForm";
import { useRecoilState } from "recoil";

type CardModalProps = {
  visible: boolean;
};

const CardModal: FC<CardModalProps> = function ({ visible }) {
  const [popup, popupCtl] = usePopup("table")

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const columns: CustomFormColumn = [
    {
      type: "input",
      label: "表名",
      name: "name"
    },
    {
      type: "input",
      label: "介绍",
      name: "remarks"
    },
  ]

  return (
    <>
      <Modal
        title={popup.title}
        visible={popup.visible}
        onOk={() => popupCtl.hide()}
        onCancel={() => popupCtl.hide()}
      >
        <CustomForm columns={columns} defaultValue={{}} />
      </Modal>
    </>
  );
};

export default CardModal;
