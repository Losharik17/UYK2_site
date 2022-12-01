import { InfoPage } from "../pages/InfoPage";
import { HomePage } from "../pages/HomePage";
import { CoursesPage } from "../pages/CoursesPage";
import { SciencePage } from "../pages/SciencePage";
import { PostPage } from "../pages/PostPage";

export enum RouteNames {
    HOME_ROUTE = '/',
    INFO_ROUTE = '/about',
    COURSES_ROUTE = '/courses',
    SCIENCE_ROUTE = '/science',
    NEW_ROUTE = '/posts/news/:id',
    EVENT_ROUTE = '/posts/events/:id',
    ARTICLE_ROUTE = '/posts/articles/:id'
};

export interface IRoute { 
    path: string;
    component: any;
    children?: Array<IRoute>;
};

export const publicRoutes: IRoute[] = [
    { path: RouteNames.HOME_ROUTE, component: HomePage },
    { path: RouteNames.INFO_ROUTE, component: InfoPage },
    { path: RouteNames.COURSES_ROUTE, component: CoursesPage },
    { path: RouteNames.SCIENCE_ROUTE, component: SciencePage },
    { path: RouteNames.EVENT_ROUTE, component: PostPage },
    { path: RouteNames.NEW_ROUTE, component: PostPage },
    { path: RouteNames.ARTICLE_ROUTE, component: PostPage }
];

