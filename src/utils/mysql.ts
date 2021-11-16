import mysql from "mysql";
import config from "@/config/db";

interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit?: number;
    useConnectionPooling?: boolean;
}

class Mysql {

    option: DBConfig;
    pool: mysql.Pool;
    connection: any;

    constructor({ connectionLimit, host, port = 3306, user, password, database }: DBConfig) {
        this.option = { connectionLimit, host, port, user, password, database }
        this.pool = null;
        this.connection = null;
        this.start();
    }
    async start() {
        const { host, port, database } = this.option;
        console.log(host, ":", port, database)
        this.pool = mysql.createPool(this.option);
    }
    conn(): Promise<{ query: Function, release: Function }> {
        return new Promise<{ query: Function, release: Function }>((resolve, reject) => {
            try {
                this.pool.getConnection((err, conn) => {
                    if (err) {
                        // logger.error(err);
                        reject(err);
                    }
                    resolve({
                        query: (async (conn: mysql.PoolConnection, sql: string) => {
                            return new Promise(function (resolve, reject) {
                                conn.query(sql, async function (err: any, rows: any[], fields: any) {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve(rows);
                                });
                            });
                        }).bind(null, conn),
                        release: () => {
                            try {
                                conn.release()
                            } catch (error) {
                                // logger.error(error);
                                reject(error);
                            }
                        }
                    });
                })
            } catch (error) {

                // logger.error(error);
                reject(error);
            }
        })
    }
}

export default new Mysql(config);