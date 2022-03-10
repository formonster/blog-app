import axios from 'axios';
import serviceConfig from '@/config/service';
import { Response } from '@/types/IData';
import { upload as baseUpload } from '@/libs/upload';
import { Folder } from '@/model/Folder';

export const uploadUrl = "http://localhost:7000/oss/upload";

export function upload(file: any) {
    baseUpload({
        url: serviceConfig.root + "/api/public/qiniu/upload",
        params: {
            files: file
        },
        onload: res => {
            console.log(res);
        },
        onprogress: progress => console.log(progress)
    })
}