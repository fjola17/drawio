//define the shapes

function Shape(position){
    this.position = position;
};
Shape.prototype.render = function(){}

Shape.prototype.move = function(position){
    this.position = position;
};

Shape.prototype.resize = function(){};

function Rectangle(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

//assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function(){
    //render a rectangle
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};
Rectangle.prototype.resize = function(x, y){
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}


function Line(position, x1, y1, col, lineWidth){
    Shape.call(this, position, col);
    this.x1 = x1;
    this.y1 = y1;
    this.shape = "line";
    this.lineWidth = lineWidth;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function(){
   // console.log(context);
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.x1, this.y1);
    
    drawio.ctx.closePath();
    drawio.ctx.stroke();
}
Line.prototype.resize = function(x,y){
    this.x1 = x;
    this.y1 = y;    
}