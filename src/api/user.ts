import axios from 'axios';
import serviceConfig from '@/config/service';
import { Response } from '@/types/IData';
import { User } from '@/model/User';

export function login(account: string, password: string) {
    return axios.post<Response<{ token: string, user: User }>>(serviceConfig.root + "/api/public/user/login", { account, password })
}

export function register(account: string, password: string) {
    return axios.post<Response>(serviceConfig.root + "/api/public/user/register", { account, password })
}