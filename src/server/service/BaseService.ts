import { BaseServiceImpl, GetProps, AddProps, PutProps, DelProps } from "./BaseServiceImpl";
import mysql from "@/utils/mysql";
import { createWhere, insert, select, update, count } from "@/server/utils/sql";
import { fieldFilterFormat } from "@/server/utils/common";
import { v4 as uuidv4 } from "uuid";

class BaseService implements BaseServiceImpl {
    async get(props: GetProps) {
        const connection = await mysql.conn();
        const sql = select(props);

        var res = await connection.query(sql);
        connection.release();
        return {
            code: 200,
            message: 'success',
            data: res[0]
        }
    }
    async list(props: GetProps) {
        const connection = await mysql.conn();

        const page = Boolean(props.pageIndex && props.pageSize);

        // 查询总条数
        let totalCount = 0;
        if (page) {
            let { sql, key } = count(props);
            var totalCountRes = await connection.query(sql);
            totalCount = totalCountRes[0] && totalCountRes[0][key];
        }

        const sql = select(props);
        var res = await connection.query(sql);
        connection.release();
        return page ? {
            code: 200,
            message: 'success',
            data: res,
            page: {
                current: props.pageIndex,
                totalNum: totalCount,
                totalPage: Math.ceil(totalCount / props.pageSize),
                size: props.pageSize
            }
        } : {
            code: 200,
            message: 'success',
            data: res
        }
    }
    async add(props: AddProps) {

        // 过滤数据
        let data: any = fieldFilterFormat(props.table, props.data)

        const connection = await mysql.conn();
        const id = uuidv4().replace(/-/g, "");
        data.id = id;

        const sql = insert({ table: props.table, data });
        await connection.query(sql);
        connection.release();
        return {
            code: 200,
            message: 'success',
            data: data
        }
    }
    async put(props: PutProps) {

        // 过滤数据
        let data: any = fieldFilterFormat(props.table, props.data)

        const connection = await mysql.conn();
        const sql = update({ ...props, data });

        await connection.query(sql);
        connection.release();
        return {
            code: 200,
            message: 'success',
            data: data
        }
    }
    async del(props: DelProps) {
        const dbData = { is_delete: 1 };
        return await this.put({
            ...props,
            data: dbData
        })
    }
    async remove(props: DelProps) {
        const connection = await mysql.conn();
        const sql = `DELETE FROM ${props.table} ${createWhere(props.where)}`
        var res = await connection.query(sql);
        connection.release();
        return {
            code: 200,
            message: 'success',
            data: res
        }
    }
}

export default BaseService;