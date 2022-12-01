export interface IEvent {
    id: number;
    address: string;
    start_date: string;
    end_date: string;
    img_url: string;
    full_img_url: string;
    link: string;
    text: string;
    title: string;
};

export interface IEventsObject {
    number_pages: number;
    array: IEvent[];
}