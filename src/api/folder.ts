import axios from 'axios';
import serviceConfig from '@/config/service';
import { Response } from '@/types/IData';
import { Folder } from '@/model/Folder';

export function add(folder: Partial<Folder>) {
    return axios.post<Response<Folder>>(serviceConfig.root + "/api/folder/add", folder)
}

export function put(params: { id: string, folder: Partial<Folder> }) {
    return axios.post<Response>(serviceConfig.root + "/api/folder/put", params)
}

export function del(params: { id: string }) {
    return axios.delete<Response>(serviceConfig.root + "/api/folder/delete", { params })
}