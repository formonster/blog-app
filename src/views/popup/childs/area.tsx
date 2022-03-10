import React, { FC } from "react";
import { Modal } from "antd";
import { usePopup } from "@/store/popup";
import CustomForm, { CustomFormColumn } from "@/views/components/CustomForm";
import { UnitType } from "@/views/components/Grid";

type AreaModalFormData = {
  value: string
  unit: UnitType
}

type AreaModalProps = {
  formData: AreaModalFormData;
  onChange: (formData: AreaModalFormData) => void
};

const AreaModal: FC = function () {
  const [popup, popupCtl] = usePopup<AreaModalProps>("area")

  const columns: CustomFormColumn = [
    {
      type: "input",
      label: "名称",
      name: "name",
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
        <CustomForm columns={columns} defaultValue={popup.formData} onChange={(data: AreaModalFormData) => {
          popup.onChange(data)
          popupCtl.hide()
        }} />
      </Modal>
    </>
  );
};

export default AreaModal;
