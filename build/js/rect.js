/* Rect class -- describes a rectangle with two points, usually
   top left and bottom right. It allows the second set of coordinates
   to be described as either w/h or x2/y2 and allows getting and
   setting of those values such that the object values will always be
   consistent with the latest input. It should be noted that it does not
   attempt to keep these points normalized. That is, you should expect
   to see the actual w/h properties to sometimes be negative values.
   To normalize the values, use the normalize method, which will return
   a new Rect object with normalized values.
*/
class Rect {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
  }

  set x1(v) {
    this.w = this.x2 - v;
    this.x = v;
  }

  set y1(v) {
    this.h = this.y2 - v;
    this.y = v;
  }

  get x2() {
    return this.x + this.w;
  }

  set x2(x) {
    this.w = x - this.x;
  }

  get y2() {
    return this.y + this.h;
  }

  set y2(y) {
    this.h = y - this.y;
  }

  normalize() {
    const [x1,y1,x2,y2] = [
      Math.min(this.x,this.x2),
      Math.min(this.y,this.y2),
      Math.max(this.x,this.x2),
      Math.max(this.y,this.y2)
    ];
    return Rect.create(x1,y1,x2-x1,y2-y1);
  }

  rebound(w,h) {
    const rect = this.normalize();
    if (rect.x<0) rect.x = 0;
    if (rect.y<0) rect.y = 0;
    if (rect.x2>w) rect.x = w-rect.w;
    if (rect.y2>h) rect.y = h-rect.h;
    return rect;
  }
}

Rect.fromCoordSet = function(p1,p2){
  const [x1,y1,x2,y2] = [
    Math.min(p1[0],p2[0]),
    Math.min(p1[1],p2[1]),
    Math.max(p1[0],p2[0]),
    Math.max(p1[1],p2[1])
  ];
  return Rect.create(x1,y1,x2-x1,y2-y1);
};

Rect.create = function(x=0,y=0,w=0,h=0) {
  const c = new Rect;
  c.x = x;
  c.y = y;
  c.w = w;
  c.h = h;
  return c;
};

Rect.from = function(el){
  const c = new Rect;
  c.x = el.offsetLeft;
  c.y = el.offsetTop;
  c.w = el.offsetWidth;
  c.h = el.offsetHeight;
  return c;
}

export default Rect;

