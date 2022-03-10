import React, { FC } from "react";
import { Input, Select, Upload, Form, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadListProps } from "antd/lib/upload";

const { Option } = Select;

export type CustomFormItemType =
  | "input"
  | "select"
  | "checkbox"
  | "upload"
  | "uploadImg";

export type CustomFormItem = {
  type: CustomFormItemType;
  label: string;
  name: string;
  placeholder?: string;
  message?: string;
  require?: boolean;
  selectProps?: {
    datas: { name: string; value: string | number }[] | { [key: string]: string | number };
  };
  uploadProps?: {
    name?: string;
    accept?: string;
    action?: string;
    listType?: UploadListProps
    maxCount?: number;
  };
  render?: (value: any, item: object, index: number) => React.ReactNode;
};

export type CustomFormColumn = CustomFormItem[];

export type CustomFormProps<T = object> = {
  columns: CustomFormColumn;
  defaultValue: T;
  onChange?: (value: T) => void;
};

function getOptions(data: CustomFormItem['selectProps']['datas']) {
  if (Array.isArray(data)) {
    return data.map(({ name, value }) => <Option key={`${name}_${value}`} value={value}>{name}</Option>)
  } else if (typeof data === "object") {
    return Object.entries(data).map(([name, value]) => <Option key={`${name}_${value}`} value={value}>{name}</Option> )
  }
}

const customFormComponents: {
  [key in CustomFormItemType]: (props: CustomFormItem) => React.ReactNode;
} = {
  input: (props: CustomFormItem) => <Input placeholder={props.placeholder} />,
  select: (props: CustomFormItem) => <Select placeholder={props.placeholder}>{getOptions(props.selectProps.datas)}</Select>,
  checkbox: (props: CustomFormItem) => <Select />,
  upload: (props: CustomFormItem) => (
    <Upload name={props.uploadProps.name} action={props.uploadProps.action} listType="picture">
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  ),
  uploadImg: (props: CustomFormItem) => <Upload></Upload>,
};

const object2FieldData = (object: {}) => Object.entries(object).map(([label, value]) => ({ name: label, value }))

const CustomForm: FC<CustomFormProps> = ({ columns, defaultValue, onChange }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    onChange(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      initialValues={defaultValue}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {columns.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={[{ required: item.require, message: item.message }]}
        >
          {customFormComponents[item.type](item)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
