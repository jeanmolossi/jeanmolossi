interface PaginationResponse {
    hasPrevPage: boolean;
    hasNextPage: boolean;

    nextPageParams: string | null;
    prevPageParams: string | null;
}

export function handlePagination(
    page: number = 1,
    limit: number = 10,
    pagination: {
        total: number,
        start: number,
    } = {
        total: 0,
        start: 0
    },
    prevParamsCustomHook?: (p: URLSearchParams) => void,
    nextParamsCustomHook?: (p: URLSearchParams) => void,
): PaginationResponse {
    const hasNextPage = pagination.total > (limit + pagination.start)
    const hasPrevPage = page > 1;

    let nextPageParams = null,
        prevPageParams = null

    if (hasNextPage) {
        nextPageParams = new URLSearchParams({
            page: `${page + 1}`,
            pageSize: limit.toString(),
        })

        nextParamsCustomHook?.(nextPageParams);
    }

    if (hasPrevPage) {
        prevPageParams = new URLSearchParams({
            page: `${page - 1}`,
            pageSize: limit.toString(),
        })

        prevParamsCustomHook?.(prevPageParams)
    }

    return {
        hasNextPage,
        hasPrevPage,
        nextPageParams: nextPageParams?.toString() || null,
        prevPageParams: prevPageParams?.toString() || null,
    }
}

export function addSearch(search?: string) {
    return (param: URLSearchParams) => {
        if (search) {
            param.set('search', search)
        }
    }
}
