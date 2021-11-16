import { atom } from 'recoil';

export const newsListState = atom<{}[]>({
    key: "newsList",
    default: []
});

console.log(newsListState);
