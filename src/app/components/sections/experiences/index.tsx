import React from "react";

export const expSelector = new Map([
    ['informatic-center', React.lazy(() => import('./informatic-center'))],
])

export * from './skills';
