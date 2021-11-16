import UserServiceImpl, { LoginRes } from "@/server/service/UserServiceImpl";
import config from "@/config/server";
import { resSuccess } from "@/server/utils/response";
import { checkServerResult, nowTimeSecond } from "@/utils/common";
import axios from "axios";
import { User } from "@/model/User";
import { Response } from "@/types/IData";
import jwt from 'jsonwebtoken'
import md5 from 'js-md5'

class UserService implements UserServiceImpl {

    /**
     * 登陆
     * @param account 账号
     * @param password 密码
     */
    async login(account: string, password: string): Promise<Response<LoginRes>> {

        if (!account || !password) throw new Error("请求参数错误！");

        const md5Password = md5(account + password)

        // 查询用户
        const userRes = await axios.get(config.serverHost + "/api/base/list", {
            params: {
                table: "user",
                columns: JSON.stringify(["id", "name", "code", "head", "account", "password"]),
                where: { account, is_delete: 0 }
            }
        })

        const data = userRes.data;
        if (data.code !== 200) throw new Error(data.message);

        const user: User = data.data[0];

        // 判断账号是否存在
        if (!user) throw new Error("您的账号不存在！");

        // 检查密码是否正确
        if (md5Password !== user.password) throw new Error("密码错误！");

        Reflect.deleteProperty(user, "password");

        return new Promise((resolve, reject) => {
            jwt.sign(user, config.secretKey, { expiresIn: '1day' }, (err, token) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(resSuccess<LoginRes>({ user, token }))
            })
        });
    }

    /**
     * 注册
     * @param account 账号
     * @param password 密码
     */
    async register(account: string, password: string): Promise<Response<User>> {
        if (!account || !password) throw new Error("请求参数错误！");

        // 查询用户
        const userRes = await axios.get(config.serverHost + "/base/list", {
            params: {
                table: "user",
                columns: "id,name,account,password",
                where: { account, is_delete: 0 }
            }
        })
        const data = userRes.data;

        if (data.status !== 200) throw new Error(data.msg);
        else {

            const user: User = data.result[0];

            // 判断账号是否存在
            if (user) throw new Error("您的账号已存在！");

            // 创建用户
            const createUserRes = await axios.post(config.serverHost + "/base/add", {
                table: "user",
                data: {
                    account, password: md5(account + password), create_time: nowTimeSecond(),
                }
            })
            const createUserResData: Response<User> = createUserRes.data;

            if (checkServerResult(createUserResData)) throw new Error(createUserResData.message);

            return resSuccess<User>(createUserResData.data);
        }
    }
}

export default UserService;