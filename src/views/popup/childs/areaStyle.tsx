import React, { FC } from "react";
import { Drawer } from "antd";
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
  const [popup, popupCtl] = usePopup<AreaModalProps>("areaStyle")

  const columns: CustomFormColumn = [
    {
      span: 12,
      type: "input",
      label: "内边距",
      name: "padding",
    },
    {
      span: 12,
      type: "input",
      label: "外边距",
      name: "marging",
    },
    {
      divider: true,
      title: '边框',
      orientation: "left"
    },
    {
      span: 12,
      type: "checkbox",
      labelCol: { span: 24 },
      checkboxProps: {
        options: [
          { label: '上', value: 'top' },
          { label: '下', value: 'bottom' },
          { label: '左', value: 'left' },
          { label: '右', value: 'right' },
        ]
      },
      label: "边框",
      name: "border",
    },
    {
      span: 12,
      labelCol: { span: 24 },
      type: "input",
      label: "宽度",
      name: "borderWidth",
    },
    {
      span: 24,
      labelCol: { span: 24 },
      type: "input",
      label: "颜色",
      name: "borderColor",
    },
  ]

  return (
    <>
      <Drawer
        title={popup.title}
        width="400px"
        visible={popup.visible}
        onClose={() => popupCtl.hide()}
        destroyOnClose
      >
        <CustomForm columns={columns} defaultValue={popup.formData} onChange={(data: AreaModalFormData) => {
          popup.onChange(data)
          popupCtl.hide()
        }} />
      </Drawer>
    </>
  );
};

export default AreaModal;
