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
  const [popup, popupCtl] = usePopup("demo")

  const columns: CustomFormColumn = [
    {
      type: "input",
      label: "输入框",
      name: "name"
    },
    {
      type: "select",
      label: "下拉选择",
      name: "remarks",
      selectProps: {
        datas: [
          { name: "选项1", value: 1 },
          { name: "选项2", value: 2 },
        ]
      }
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
