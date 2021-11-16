export const isJsonString = (str: string) => {
    try {
        const o = JSON.parse(str)
        return o;
    } catch (error) {
        return false;
    }
}