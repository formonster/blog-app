import { Response } from "@/types/IData";

export interface GetProps {
    table: string;
    columns?: string[];
    where: object;
    order?: string[];
    pageIndex?: number;
    pageSize?: number;
}
export interface ListProps {
    table: string;
    columns?: string[];
    where?: object;
    order?: string[];
    pageIndex?: number;
    pageSize?: number;
}
export interface AddProps {
    table: string;
    data: object | object[];
}
export interface PutProps {
    table: string;
    where: object;
    data: object | object[];
}
export interface DelProps {
    table: string;
    where: object;
}

export interface BaseServiceImpl {
    get(props: GetProps): Promise<Response<unknown>>
    list(props: GetProps): Promise<Response<unknown>>
    add(props: AddProps): Promise<Response<unknown>>
    put(props: PutProps): Promise<Response<unknown>>
    del(props: DelProps): Promise<Response<unknown>>
    remove(props: DelProps): Promise<Response<unknown>>
}