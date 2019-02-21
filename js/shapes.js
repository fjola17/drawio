//define the shapes
function Shape(position){
    this.position = position;
};
Shape.prototype.render = function(){}
Shape.prototype.move = function(position){
    this.position = position;
};
Shape.prototype.resize = function(){};
//rectangle constructor
function Rectangle(position, width, height, strokeStyle, checked, lineWidth){
    Shape.call(this, position);
    this.width = width;
    this.type = "rectangle";
    this.height = height;
    this.strokeStyle = strokeStyle;
    this.checked = checked;
    this.lineWidth = lineWidth;
    this.draggable = true;
};
//assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
//rectangle render func
Rectangle.prototype.render = function(){
    if(this.checked){
        drawio.ctx.fillStyle = this.strokeStyle;
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    else{
        drawio.ctx.strokeStyle = this.strokeStyle;
        drawio.ctx.lineWidth = this.lineWidth;
        drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
    }
};
//resize func for rectangle
Rectangle.prototype.resize = function(x1, y1){
    this.width = x1 - this.position.x;
    this.height = y1 - this.position.y;
}
//line constructor
function Line(position, x1, y1, strokeStyle, lineWidth){
    Shape.call(this, position, strokeStyle);
    this.x1 = x1;
    this.y1 = y1;
    this.type = "line";
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.draggable = true;
}
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;
//draw the line
Line.prototype.render = function(){
    drawio.ctx.beginPath();
    drawio.ctx.strokeStyle = this.strokeStyle;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.x1, this.y1);
    drawio.ctx.closePath();
    drawio.ctx.stroke();
}
//line resize function
Line.prototype.resize = function(x2, y2){
    this.x1 = x2;
    this.y1 = y2;
}

//circle constructor
function Circle(position, rad, strokeStyle, checked, lineWidth){
    Shape.call(this, position);
    this.rad = rad;
    this.strokeStyle = strokeStyle;
    this.type = "circle";
    this.checked = checked;
    this.lineWidth = lineWidth;
    this.draggable = true;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.render = function(){
    //render a circle
    drawio.ctx.beginPath();
    //hollow circle
    if(this.checked){
        drawio.ctx.fillStyle = this.strokeStyle;
        drawio.ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
        drawio.ctx.fill();
    }
    //filled circle
    else{
        drawio.ctx.strokeStyle = this.strokeStyle;
        drawio.ctx.lineWidth = this.lineWidth;
        drawio.ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
        drawio.ctx.stroke();
    }

    drawio.ctx.closePath();
};
Circle.prototype.resize = function(x1, y1){
    //calculate radians from original position to current position
    this.rad = Math.sqrt(Math.pow((x1 - this.position.x), 2) + Math.pow((y1 - this.position.y), 2));
}

function Text(position, width, height, strokeStyle, textData, textFont){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;
    this.type = "text";
    this.textData = textData;
    this.textFont = textFont;
    this.draggable = true;
}
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;
Text.prototype.render = function(){
    drawio.ctx.fillStyle = this.strokeStyle;
    drawio.ctx.font = this.textFont;
    drawio.ctx.fillText(this.textData, this.position.x, this.position.y)
};
//Pencil constructor
function Pencil(position, shapeArr, strokeStyle, lineWidth){
    Shape.call(this, position);
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.type = "pencil";
    var pos = [this.position.x, this.position.y];
    this.shapeArr = shapeArr;
    this.shapeArr.push(pos);
    this.draggable = true;
}
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

//pencil render function that goes through the shape array and render the shapes
Pencil.prototype.render = function(){
    for(let i = 1; i < this.shapeArr.length; i++){
        drawio.ctx.beginPath();
        drawio.ctx.strokeStyle = this.strokeStyle;
        drawio.ctx.lineWidth = this.lineWidth;
        drawio.ctx.moveTo(this.shapeArr[i-1][0], this.shapeArr[i-1][1]);
        drawio.ctx.lineTo(this.shapeArr[i][0], this.shapeArr[i][1]);
        drawio.ctx.stroke();
        drawio.ctx.closePath();
    }
}
//pencil resize (adds shapes to the shape array)
Pencil.prototype.resize = function(x1, y1){
    this.position.x = x1;
    this.position.y = y1;
    var pos = [this.position.x, this.position.y]
    this.shapeArr.push(pos);
}
