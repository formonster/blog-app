import { useCallback } from 'react'

export const inputChange = (
    setState: React.Dispatch<React.SetStateAction<unknown>>,
) => useCallback((e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value), [setState]);