//define the shapes

function Shape(position){
    this.position = position;
};
Shape.prototype.render = function(){}

Shape.prototype.move = function(position){
    this.position = position;
};

Shape.prototype.resize = function(){};

function Rectangle(position, width, height, strokeStyle){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;
};

//assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function(){
    //render a rectangle
    //console.log(this.strokeStyle)
    drawio.ctx.fillStyle = this.strokeStyle;
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};
Rectangle.prototype.resize = function(x, y){
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}


function Line(position, x1, y1, strokeStyle, lineWidth){
    Shape.call(this, position, strokeStyle);
    this.x1 = x1;
    this.y1 = y1;
    this.shape = "line";
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function(){
   // console.log(context);
    drawio.ctx.beginPath();
    drawio.ctx.strokeStyle = this.strokeStyle;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.x1, this.y1);

    drawio.ctx.closePath();
    drawio.ctx.stroke();
}

Line.prototype.resize = function(x,y){
    this.x1 = x;
    this.y1 = y;
}

function Circle(position, rad, color){
    Shape.call(this, position);
    this.rad = rad;
    this.color = color;
    console.log(color);
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function(){
    //render a circle
    drawio.ctx.beginPath();
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
    drawio.ctx.fill();
    drawio.ctx.closePath();
};
Circle.prototype.resize = function(x1, y1){
    //calculate radians from original position to current position
    this.rad = Math.sqrt(Math.pow((x1 - this.position.x), 2) + Math.pow((y1 - this.position.y), 2));
}

function Text(position, width, height, color){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.color = color;
    this.textData = $('#text-shape').val();
    this.textFont = $('#fontSize').val().concat(' ', $('#textFont').val());
}

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function(){
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.textFont;
    console.log(this.textFont);
    drawio.ctx.fillText(this.textData, this.position.x, this.position.y)

};

function Pencil(position, shapearr, strokeStyle, lineWidth){
  //  console.log(strokeStyle);
    Shape.call(this, position);
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    var pos = [this.position.x, this.position.y];
    this.shapearr = shapearr;
    this.shapearr.push(pos);
}
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function(){
    //console.log(this.strokeStyle, this.lineWidth);
    for(let i = 1; i < this.shapearr.length; i++){
        drawio.ctx.beginPath();
        drawio.ctx.strokeStyle = this.strokeStyle;
        drawio.ctx.lineWidth = this.lineWidth;
        drawio.ctx.moveTo(this.shapearr[i-1][0], this.shapearr[i-1][1]);
        drawio.ctx.lineTo(this.shapearr[i][0], this.shapearr[i][1]);
        drawio.ctx.stroke();
        drawio.ctx.closePath();
    }


}
Pencil.prototype.resize = function(x, y){
    this.position.x = x;
    this.position.y = y;
    var pos = [this.position.x, this.position.y]
    this.shapearr.push(pos);
    //console.log(pos);
}

/*
function Move(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeStyle = "rgba(135, 206, 250, 0.5)";
};

//assign the prototype
Move.prototype = Object.create(Shape.prototype);
Move.prototype.constructor = Move;

Move.prototype.render = function(){
    //render a rectangle
    //console.log(this.strokeStyle)
    drawio.ctx.fillStyle = this.strokeStyle;
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};
Move.prototype.resize = function(x, y){
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}*/
