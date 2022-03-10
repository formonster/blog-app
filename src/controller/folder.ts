import { Folder } from "@/model/Folder";
import { add } from "@/api/base";

export const addFoler = async (folder: Folder) => {
    return await add<Folder>({
        table: "folder",
        data: folder
    })
}