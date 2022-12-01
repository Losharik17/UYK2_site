import { RefObject } from "react";
import { settings } from "../constants/canvas-settings";
import { IPoint } from "../models/IPoint";
import { contains, getDistance } from "./canvas-helpers";

export const createPoints = (canvasRef: RefObject<HTMLCanvasElement>, points: IPoint[]) => {
    points = [];
    if (canvasRef.current) {
        for(var x = 0 - 100; x < canvasRef.current.width + 100; x = x + 1000 / settings.pointDensity) {
            for(let y = 0 - 100; y < canvasRef.current.height + 100; y = y + 1000 / settings.pointDensity) {
                const px = Math.floor(x + Math.random() * 1000 / settings.pointDensity);
                const py = Math.floor(y + Math.random() * 1000 / settings.pointDensity);

                const pSizeMod = Math.random() * settings.sizeVariation + 1;
                const pw = settings.imgWidth * pSizeMod;
                const ph = settings.imgHeight * pSizeMod;

                const pAnimOffset = Math.random() * 2 * Math.PI;

                const p = {
                    x: px, 
                    originX: px, 
                    y: py, 
                    originY: py, 
                    w: pw, 
                    h: ph, 
                    sizeMod: pSizeMod, 
                    animOffset: pAnimOffset, 
                    closest: []
                };

                points.push(p);
            }
        }
    }
    for(let i = 0; i < points.length; i++) {
        let closest = [];
        let p1 = points[i];
        for(let j = 0; j < points.length; j++) {
            let p2 = points[j]
            if(!contains(p2.closest, p1) && p1 !== p2) {
                let placed = false;
                for(let k = 0; k < settings.connections; k++) {
                    if(!placed && closest[k] === undefined) {
                        closest[k] = p2;
                        placed = true;
                    }
                }

                for(var k = 0; k < settings.connections; k++) {
                    if(!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
                        closest[k] = p2;
                        placed = true;
                    }
                }
            }
        }
        p1.closest = closest;
    }
}

export const drawFrame = (ctx: CanvasRenderingContext2D, canvasRef: RefObject<HTMLCanvasElement>, points: IPoint[], img: HTMLImageElement) => {
    if (canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < points.length; i++) {
            drawLines(ctx, points[i]);
        }

        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            ctx.beginPath();
            ctx.fill();
            ctx.drawImage(img, point.x-point.w / 2, point.y-point.h / 2, point.w, point.h);
        }
    }
}

export const drawLines = (ctx: CanvasRenderingContext2D, point: IPoint) => {
    for(let i in point.closest) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.closest[i].x, point.closest[i].y);
        ctx.strokeStyle = settings.lineColor;
        ctx.stroke();
    }
}