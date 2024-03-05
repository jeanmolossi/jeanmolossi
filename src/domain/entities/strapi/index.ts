export namespace Strapi {
    export interface Entry<TAttrs> {
        id: number;
        attributes: TAttrs
    }

    export interface ListResponse<TEntryType> {
        data: Array<Entry<TEntryType>>
        meta: {
            pagination?: {
                start: number;
                limit: number;
                total: number;
            }
        }
    }

    export interface File {
        name: string;
        alternativeText: string | null;
        width: number;
        heigth: number;
        formats: {
            thumbnail: {
                name: string;
                width: number;
                heigth: number;
                url: string;
            }
        };
        url: string;
    }
}
