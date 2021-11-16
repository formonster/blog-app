export interface Response<T = unknown> {
    message: string;
    code: number;
    data: T | null;
}
export interface PageResponse<T> extends Response<T[]> {
    current: number;
    totalNum: number;
    totalPage: number;
    size: number;
}