import UserServiceImpl from "@/server/service/UserServiceImpl";
import { POST, route } from "awilix-koa";
import Router from "@koa/router";

@route('/api/public/user')
class UserController {
    private userService: UserServiceImpl;
    constructor({ userService }: { userService: UserServiceImpl }) {
        this.userService = userService;
    }
    @route('/login')
    @POST()
    async login(ctx: Router.RouterContext) {
        const { account, password } = ctx.request.body as any;
        ctx.body = await this.userService.login(account, password);
    }
    @route('/register')
    @POST()
    async register(ctx: Router.RouterContext) {
        const { account, password } = ctx.request.body as any;
        ctx.body = await this.userService.register(account, password);
    }
}

export default UserController;