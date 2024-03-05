export interface Article {
    title: string;
    subtitle: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
    cover?: string;
}

export interface Publisher {
    fistname: string;
    lastname: string;
}
