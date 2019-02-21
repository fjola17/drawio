//define the shapes

function Shape(position){
    this.position = position;
};
Shape.prototype.render = function(){}

Shape.prototype.move = function(position){
    this.position = position;
};

Shape.prototype.resize = function(){};

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
Rectangle.prototype.resize = function(x, y){
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}

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

function Circle(position, rad, color, checked, lineWidth){
    Shape.call(this, position);
    this.rad = rad;
    this.color = color;
    this.type = "circle";
    this.checked = checked;
    this.lineWidth = lineWidth;
    this.draggable = true;
    console.log(color);
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function(){
    //render a circle
    drawio.ctx.beginPath();
    if(this.checked){
        drawio.ctx.fillStyle = this.color; 
        drawio.ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
        drawio.ctx.fill();   
    }
    else{
        drawio.ctx.strokeStyle = this.color;
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

function Text(position, width, height, color, textData, textFont){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.color = color;
    this.type = "text";
    this.textData = textData;
    this.textFont = textFont;
    this.draggable = true;
}

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function(){
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.textFont;
    //console.log(this.textFgitont);
    drawio.ctx.fillText(this.textData, this.position.x, this.position.y)

};

function Pencil(position, shapearr, strokeStyle, lineWidth){
    Shape.call(this, position);
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.type = "pencil";
    var pos = [this.position.x, this.position.y];
    this.shapearr = shapearr;
    this.shapearr.push(pos);
    this.draggable = true;
}
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function(){
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
}
