import axios from 'axios';
import serviceConfig from '@/config/service';
import { Table } from '@/types/table';
import { Response } from '@/types/IData';

type Where = {
    [key in string]: string | number | {
        table?: Table,
        mode?: "AND" | "OR",
        field?: string,
        condition: "=" | "!=" | "LIKE",
        value: unknown,
        arrMode?: "AND" | "OR",
    }
}

type GetProps = {
    table: Table,
    where?: Where | Array<Where | "AND" | "OR">
}

type AddProps<T = unknown> = {
    table: Table,
    data: T
}

type PutProps<T = unknown> = {
    table: Table,
    where?: Where | Array<Where | "AND" | "OR">,
    data: T
}

export const get = function <T = unknown>(params: GetProps) {
    return axios.get<Response<T>>(serviceConfig.root + "/api/public/base/get", { params })
}

export const list = function <T = unknown>(params: GetProps) {
    return axios.get<Response<T[]>>(serviceConfig.root + "/api/public/base/list", { params })
}

export const add = function <T = unknown>(params: AddProps<T>) {
    return axios.post<Response<T>>(serviceConfig.root + "/api/base/add", params)
}

export const put = function <T = unknown>(params: PutProps<T>) {
    return axios.put<Response<T>>(serviceConfig.root + "/api/base/put", params)
}

export default {
    get: (params: any) => axios.get(serviceConfig.root + "/api/base/get", {
        params
    }),
    list: (params: any) => axios.get(serviceConfig.root + "/api/base/list", {
        params
    }),
    put: (params: { table: string, data: object, where: object }) => axios.put(serviceConfig.root + "/api/base/put", params),
    add: (params: { table: string, data: object }) => axios.post(serviceConfig.root + "/api/base/add", params),
    del: (params: { table: string, where: object }) => axios.get(serviceConfig.root + "/api/base/del", {
        params
    }),
    column: (params: any) => axios.get(serviceConfig.root + "/api/base/list", {
        params: {
            table: "user_table_columns",
            pageIndex: 1,
            pageSize: 10,
            where: {
                ...params
            }
        }
    }),
    table: (params: any) => {
        return Promise.all([
            axios.get(serviceConfig.root + "/api/base/list", {
                params: {
                    table: params.tableName,
                    pageIndex: 1,
                    pageSize: 10,
                    where: {
                        is_delete: 0
                    }
                }
            }),
            axios.get(serviceConfig.root + "/api/base/list", {
                params: {
                    table: "user_table_columns",
                    where: {
                        user_table_id: params.tableId
                    }
                }
            }),
        ])
    },
    /**
     * 根据ID查询产品
     */
    product: ({ id }: { id: string }) => axios.get(`http://api.amlitance.jonekung.cn/Product?id=${id}`),
}