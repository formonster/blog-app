import React, { FC } from "react";
import { Input, Select, Upload, Form, Button, FormItemProps, ColProps, Col, Row, Checkbox, CheckboxOptionType, Divider, DividerProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadListProps } from "antd/lib/upload";
import { Gutter } from "antd/lib/grid/row";

const { Option } = Select;

export type CustomFormItemType =
  | "input"
  | "select"
  | "checkbox"
  | "upload"
  | "uploadImg";

export interface CustomFormItem<T = any> extends FormItemProps<T> {
  span?: ColProps['span']
  type: CustomFormItemType;
  label: string;
  name: string;
  placeholder?: string;
  message?: string;
  require?: boolean;
  selectProps?: {
    datas: { name: string; value: string | number }[] | { [key: string]: string | number };
  };
  checkboxProps?: {
    options: (string | number | CheckboxOptionType)[]
  }
  uploadProps?: {
    name?: string;
    accept?: string;
    action?: string;
    listType?: UploadListProps
    maxCount?: number;
  };
  render?: (value: any, item: object, index: number) => React.ReactNode;
  format?: (self: any, forData: T) => any
};

export interface DividerItem extends DividerProps {
  divider: boolean;
  title: string;
}
export type CustomFormColumn = (CustomFormItem | DividerItem)[];

export type CustomFormProps<T = object> = {
  columns: CustomFormColumn;
  gutter?: Gutter;
  defaultValue: T;
  onChange?: (value: T) => void;
};

function getOptions(data: CustomFormItem['selectProps']['datas']) {
  if (Array.isArray(data)) {
    return data.map(({ name, value }) => <Option key={`${name}_${value}`} value={value}>{name}</Option>)
  } else if (typeof data === "object") {
    return Object.entries(data).map(([name, value]) => <Option key={`${name}_${value}`} value={value}>{name}</Option>)
  }
}

const customFormComponents: {
  [key in CustomFormItemType]: (props: CustomFormItem) => React.ReactNode;
} = {
  input: (props: CustomFormItem) => <Input placeholder={props.placeholder} />,
  select: (props: CustomFormItem) => <Select placeholder={props.placeholder}>{getOptions(props.selectProps.datas)}</Select>,
  checkbox: (props: CustomFormItem) => <Checkbox.Group options={props.checkboxProps.options} />,
  upload: (props: CustomFormItem) => (
    <Upload name={props.uploadProps.name} action={props.uploadProps.action} listType="picture">
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  ),
  uploadImg: (props: CustomFormItem) => <Upload></Upload>,
};

const object2FieldData = (object: {}) => Object.entries(object).map(([label, value]) => ({ name: label, value }))

const CustomForm: FC<CustomFormProps> = ({ columns, gutter = 16, defaultValue, onChange }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    columns.forEach(item => {
      if ('format' in item) values = item.format(values[item.name], values);
    })
    console.log("Format:", values);
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
      <Row gutter={gutter}>
        {columns.map(item => {

          // 分割线
          if ('divider' in item) return <Divider {...item}>{item.title}</Divider>

          const { name, label, require, message, type, span, ...props } = item
          return (
            <Col span={span}>
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={[{ required: require, message: message }]}
                {...props}
              >
                {customFormComponents[type](item)}
              </Form.Item>
            </Col>
          )
        })}
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
