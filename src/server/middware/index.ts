import Koa from "koa";
import errorHandler from './errorHandler'
import logHandler from './logHandler'
import domainHandler from './domainHandler'
import brHandler from './brHandler'

export function loadMiddware(app: Koa) {
    app.use(logHandler);
    // app.use(errorHandler);
    // app.use(brHandler);
    app.use(domainHandler);
}