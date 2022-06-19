class Point{
    x:number;
    y:number;
    constructor(x: number, y: number){
      this.x = x;
      this.y = y;
    }
  
    draw(ctx: CanvasRenderingContext2D){ roundRect(ctx, this.x, this.y, 26, 26, true); }
  
    drawHeld(ctx: CanvasRenderingContext2D, id: number){
      if (id == 1 || id == 3 || id == 4){
        roundRect(ctx, this.x - 2 * (26), this.y + 2 * (26), 26, 26, true);
      } else if (id == 5) {
        roundRect(ctx, this.x - 75, this.y + 75, 26, 26, true);
      } else {
        roundRect(ctx, this.x - 75, this.y + 2 * (26), 26, 26, true);
      }
    }
  
    moveLeft(dx){ this.x -= dx; }
    moveRight(dx){ this.x += dx; }
    moveDown(dy){ this.y += dy; }
  
    rotateLeft(center: Point){
      let returned = rotate(center.x, center.y, this.x, this.y, 270);
      this.x = returned[0];
      this.y = returned[1];
    }
  
    rotateRight(center: Point){
      let returned = rotate(center.x, center.y, this.x, this.y, 90);
      this.x = returned[0];
      this.y = returned[1];
    }
  }
  
  function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }
  
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, stroke: boolean) {
    if (typeof stroke === 'undefined') { stroke = true; }
    if (stroke) { ctx.strokeRect(x+2, y+2, width-4, height-4); }
  }
  
  export { Point };