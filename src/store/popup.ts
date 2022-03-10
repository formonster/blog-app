import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export type PopupStateValue = {
    visible: boolean
    title?: string
    [key: string]: unknown
}
export type PopupState = {
    [key: string]: PopupStateValue
}

export const popups = atom<PopupState>({
    key: "popups",
    default: {
        table: {
            visible: false,
            title:'新增表'
        },
        demo: {
            visible: false,
            title:'示例表单'
        },
    }
});

export const usePopup = <T>(popupKey: string) => {
    const [popupsData, setPopupsData] = useRecoilState(popups);

    const state = popupsData[popupKey] as (PopupStateValue & T);
    const setter = useCallback((data: PopupStateValue) => {
        const popupItem = { [popupKey]: { ...state, ...data } }
        setPopupsData({...popupsData, ...popupItem})
    }, [popupKey, popupsData, state])

    const ctl = {
        show: (props?: Partial<PopupStateValue>) => setter({ ...props, visible: true }),
        hide: (props?: Partial<PopupStateValue>) => setter({ ...props, visible: false }),
        setState: setter
    }

    return [state, ctl] as const;
}
export const usePopupCtl = (popupKey: string) => {
    const [, ctl] = usePopup(popupKey);
    return ctl;
}