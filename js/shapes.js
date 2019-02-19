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

function Line(x, y, x1, y1, col, lineWidth){
    Shape.call(this, x, y, col);
    this.x1 = x1;
    this.y1 = y1;
    this.shape = line;
    this.lineWidth = lineWidth;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function(context){
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.position.x1, this.position.y1);
    drawio.ctx.stroke();
}
Line.prototype.resize = function(context){
   /* this.col = x -
    this.lineWidth = */
}



function Circle(position, rad){
    Shape.call(this, position);
    this.rad = rad;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function(){
    //render a circle
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
    drawio.ctx.fill();
    drawio.ctx.closePath();
};
Circle.prototype.resize = function(x1, y1){
    this.rad = Math.sqrt(Math.pow((x1 - this.position.x), 2) + Math.pow((y1 - this.position.y), 2));
}

function Text(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.textData = $('#text-shape').val();
    this.textFont = $('#fontSize').val().concat(' ', $('#textFont').val());
}

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function(){
    //render a text
    //var textData = $('#text-shape').val();
    //var textFont = $('#fontSize').val().concat(' ', $('#textFont').val());
    drawio.ctx.font = this.textFont;
    console.log(this.textFont);
    drawio.ctx.fillText(this.textData, this.position.x, this.position.y)

};/*
Text.prototype.resize = function(x, y){

    this.width = x - this.position.x;
    this.height = y - this.position.y;

}*/
