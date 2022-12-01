import React, { RefObject, useEffect, useRef } from 'react';
import { getDistance, contains } from '../../../utils/canvas-helpers';
import { drawFrame } from '../../../utils/canvas-draw';
import { settings } from '../../../constants/canvas-settings';
import { IPoint } from '../../../models/IPoint';

export const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const img = new Image();
    img.src = settings.imagePath;

    let points: IPoint[] = [];

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx !== null) {
                let resizeTimer: any;
                window.addEventListener('resize', (event) => { resizeCanvas(ctx, resizeTimer, canvasRef) }, false);
                
                resizeCanvas(ctx, resizeTimer, canvasRef);
                createPoints(canvasRef);
            };
        };
    }, [ ]);
    const resizeCanvas = (ctx: CanvasRenderingContext2D, resizeTimer: any, canvasRef: RefObject<HTMLCanvasElement>) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (canvasRef.current !== null) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = 500;
            }
            createPoints(canvasRef);
            drawFrame(ctx, canvasRef, points, img);
        }, 250);
    };
    const createPoints = (canvasRef: RefObject<HTMLCanvasElement>) => {
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
                };
            };
        };
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
                        };
                    };

                    for(var k = 0; k < settings.connections; k++) {
                        if(!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        };
                    };
                };
            };
            p1.closest = closest;
        };
    };
    const animate = (
        ctx: CanvasRenderingContext2D, 
        start: number, 
        timestamp: number, 
        lasttimestamp: number, 
        delta: number, 
        mousePoint: { x: number, y: number }
    ) => {
        if (!start) {
            start = timestamp;
            lasttimestamp = timestamp;
        };
        let elapsed = timestamp + - start;
        lasttimestamp = timestamp;

        for (let i = 0; i < points.length; i++) {
            
            let point: IPoint = points[i];
            let attractionOffset = {x: 0, y: 0};
            let distanceToMouse = getDistance({x: point.originX, y: point.originY}, mousePoint);
  
            if (distanceToMouse <= settings.attractionRange) {
                let displacementFactor = (Math.cos(distanceToMouse / settings.attractionRange * Math.PI) + 1) / 2 * settings.attractionFactor;
                attractionOffset.x = displacementFactor * (mousePoint.x - point.x);
                attractionOffset.y = displacementFactor * (mousePoint.y - point.y);
            };

            point.x = point.originX + Math.sin(elapsed * settings.velocity + point.animOffset) * settings.maxMovement * point.sizeMod+attractionOffset.x;
            point.y = point.originY - Math.cos(elapsed * settings.velocity + point.animOffset) * settings.maxMovement * point.sizeMod+attractionOffset.y;
        };

        drawFrame(ctx, canvasRef, points, img);
    };

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx !== null) {
                let animationFrameId: number;
    
                let frameCount = 0;
                let start: number = 0;
                let lasttimestamp: number = 0;
                let delta = 0;
                const mousePoint: { x: number, y: number } = { x: 0, y: 0 };
                
                const render = () => {
                    frameCount++;
                    animationFrameId = window.requestAnimationFrame(render);
                    animate(ctx, frameCount, start, lasttimestamp, delta, mousePoint)
                }
                render();
        
                return () => {
                  window.cancelAnimationFrame(animationFrameId)
                }
            };
        };
    }, []);
    

    return (
        <div className="canvas">
            <canvas ref={ canvasRef } id='canvas'></canvas>
        </div>
    );
};
