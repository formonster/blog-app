import React, { Suspense, FC } from "react";

const LazyComponent: FC = function ({ children }) {
    if (typeof window !== "undefined")
      return (
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      );
    else return <p>Loading...</p>;
  };

export default LazyComponent;