export interface ICourse {
    course_number: number;
    plans: IPlan[];
}

export interface IPlan {
    full_img_url: string;
    img_url: string;
    semester: number;
}

export interface ICourseObject {
    number_pages: number;
    array: ICourse[];
}