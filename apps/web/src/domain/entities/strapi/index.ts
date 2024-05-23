
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

    type Format = {
        ext: `.${'jpg' | 'jpeg' | 'png'}`;
        url: string;
        hash: string;
        mime: HTMLInputElement['accept'];
        name: string;
        path: null;
        size: number;
        width: number;
        heigth: number;
    }

    export interface File {
        name: string;
        alternativeText: string | null;
        width: number;
        heigth: number;
        formats: Record<'thumbnail' | 'small' | 'medium' | 'large', Format>;
        url: string;
    }
}
