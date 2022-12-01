export interface IPoint {
    x: number;
    originX: number;
    y: number;
    originY: number;
    w: number; 
    h: number;
    sizeMod: number; 
    animOffset: number;
    closest: IPoint[];
};