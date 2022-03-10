export default class Log {
    constructor() {
        this.init()
    }
    init = () => {
        console.log("Log init");

        this.jsError();
        this.mediaError();
    }
    jsError = () => {
        window.onerror = (eventOrMessage, scriptURI, lineNo, columnNo, error) => {
            console.log("[ 我知道错误了 ]", eventOrMessage);
            console.log(
                JSON.stringify({
                    scriptURI,
                    lineNo,
                    columnNo,
                })
            );

            this.sendError({
                scriptURI,
                lineNo,
                columnNo,
            });

            return true;
        };
    }
    mediaError = () => {
        window.addEventListener(
            'error',
            function (e: ErrorEvent) {
                if (e.target !== window) {
                    console.log('🖼网络错误', [e.target]);
                }
            },
            true
        );
    }
    sendError(data = {}) {
        navigator.sendBeacon("http://localhost:4600/api/public/beacon/jserror", JSON.stringify(data))
    }
}