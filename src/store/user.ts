import { atom, useRecoilCallback } from 'recoil';
import { User } from '@/model/User'
import { login } from '@/api/user'
import { checkResultError, isWindow } from '@/utils/check';
import { message } from 'antd';
import { setAuthorization } from '@/api';

type UserState = {
    token: string,
    isLogin: boolean,
    user: Partial<User>
}

const IS_WINDOW = isWindow();
const userCacheStateJson = IS_WINDOW && localStorage.getItem('userState');
const userCacheState: UserState = userCacheStateJson && JSON.parse(userCacheStateJson);

if (userCacheState) setAuthorization(userCacheState.token);

export const userState = atom<UserState>({
    key: "userState",
    default: userCacheState || {
        token: "",
        isLogin: false,
        user: {}
    }
});

const cacheUserState = (user: UserState) => {
    localStorage.setItem("userState", JSON.stringify(user));
    setAuthorization(user.token);
}

export const useUserAction = function () {

    // 登录
    const loginHandler = useRecoilCallback(({ set }) => async (account: string, password: string) => {
        const res = await login(account, password);

        if (checkResultError(res.data)) return false;

        const user = { ...res.data.data, isLogin: true };
        set(userState, user);
        cacheUserState(user);
        return true;
    });

    return { loginHandler }
}