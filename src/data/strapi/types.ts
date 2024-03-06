export type CollectionResult<T> = {
    data: T[];
    pagination: {
        prevPageParams: string | null;
        nextPageParams: string | null;
    }
}
