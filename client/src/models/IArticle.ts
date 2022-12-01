export interface IArticle {
    id: number;
    author: string;
    full_img_url: string;
    img_url: string;
    link: string;
    text: string;
    title: string;
};

export interface IArticlesObject {
    number_pages: number;
    array: IArticle[];
}