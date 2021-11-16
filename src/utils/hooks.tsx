import { Popup } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";

export const useModal = (modalAtom: RecoilState<Popup>) => {
    const [modal, setModal] = useRecoilState(modalAtom);

    const show = useCallback((props?: Popup | {}) => {
        setModal({...modal, open: true, ...props})
    }, [modal])

    const hide = useCallback(() => {
        setModal({...modal, open: false})
    }, [modal])

    return [show, hide] as const;
}

export function useItem<T>(value: T) {
    const [data, setData] = useState<T>(value);

    useEffect(() => {
        setData(value);
    }, [value])

    return [data, setData] as const;
}