import React, { FC } from "react";
import { Modal } from "antd";
import { usePopup } from "@/store/popup";
import CustomForm, { CustomFormColumn } from "@/views/components/CustomForm";
import { UnitType } from "@/views/components/Grid";

type AxiosModalFormData = {
  value: string
  unit: UnitType
}

type AxiosModalProps = {
  formData: AxiosModalFormData;
  onChange: (formData: AxiosModalFormData) => void
};

const AxiosModal: FC = function () {
  const [popup, popupCtl] = usePopup<AxiosModalProps>("axis")

  const columns: CustomFormColumn = [
    {
      type: "input",
      label: "尺寸",
      name: "value"
    },
    {
      type: "select",
      label: "单位",
      name: "unit",
      selectProps: {
        datas: UnitType
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
        footer={false}
        destroyOnClose
      >
        <CustomForm columns={columns} defaultValue={popup.formData} onChange={(data: AxiosModalFormData) => {
          popup.onChange(data)
          popupCtl.hide()
        }} />
      </Modal>
    </>
  );
};

export default AxiosModal;
