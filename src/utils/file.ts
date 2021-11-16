/**
 * 图片转 base64
 * @param {File} img 图片对象
 */
export const getBase64Sync = (img: Blob) => {
    return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.readAsDataURL(img);
    });
}