
// 获取类型的属性名
export type Fileds<T> = { [K in keyof T]: K }[keyof T]
