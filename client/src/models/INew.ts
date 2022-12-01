export interface INew {
    id: number;
    author: string;
    date: string;
    img_url: string;
    full_img_url: string;
    link: string;
    text: string;
    title: string;
};

export interface INewsObject {
    number_pages: number;
    array: INew[];
}