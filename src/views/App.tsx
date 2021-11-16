import React from "react";
import { renderRoutes } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import routes from "./router";

export default function App() {
  return (
    <RecoilRoot>
      <Route
        render={({ location }) => (
          // prefetch 暂时注释（原因参考 router.ts）
          // <Suspense fallback={<div>Loading...</div>}>
          //   <Switch location={location}>{renderRoutes(routes)}</Switch>
          // </Suspense>
          <Switch location={location}>{renderRoutes(routes)}</Switch>
        )}
      />
    </RecoilRoot>
  );
}
