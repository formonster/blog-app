import { User } from "@/model/User";
import { Response } from "@/types/IData";

export type LoginRes = { user: User, token: string };

interface UserServiceImpl {
    login(account: string, password: string): Promise<Response<LoginRes>>
    register(account: string, password: string): Promise<Response<User>>
}

export default UserServiceImpl;