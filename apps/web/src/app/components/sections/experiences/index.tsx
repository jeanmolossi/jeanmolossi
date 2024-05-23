import React from "react";

export const expSelector = new Map([
    ['informatic-center', React.lazy(() => import('./informatic-center'))],
    ['bokas-restaurante', React.lazy(() => import('./bokas-restaurante'))],
    ['khube', React.lazy(() => import('./khube'))],
    ['catho-online', React.lazy(() => import('./catho-online'))],
])

export * from './skills';
