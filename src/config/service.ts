import { isWindow } from "@/utils/check";
import serverConfig from "@/config/server";

export default {
    root: isWindow() ? "" : "http://localhost:" + serverConfig.port
}