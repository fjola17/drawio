//Setup of the assignment


$(function(){
    drawio.canvas.width = drawio.canvas.clientWidth;
    drawio.canvas.height = drawio.canvas.clientHeight;
    var color = "black";
    var size = 4;
    drawio.ctx.strokeStyle = color;
    drawio.ctx.lineWidth = size;
    var drawing = false, dragging = false;
    function drawCanvas(){
        if(drawio.selectedElement){
            drawio.selectedElement.render();
        }
        for(let i = 0; i < drawio.shapes.length; i++){
            drawio.shapes[i].render();
        }
    };

    //Selecting icons
    $('.icon' ).on('click', function(){
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
        console.log(drawio.selectedShape);
    });
    //change color on the pen, shapes or the text
    $("#color-picker").on("change",function(){
        color = $(this).val();
        drawio.ctx.strokeStyle = color;
    });
    //delete everything off the canvas
    $("#reset").on("click", function(){
        drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
        drawio.shapes = [];
    });
    //resize the pen/line
    $(".pen-size").on("click", function(){
        $(".pen-size").removeClass("selected");
        $(this).addClass("selected");
        var id = this.id;
        if(id == "small"){
            size = 1;
        }
        else if(id == "medium"){
            size = 4;
        }
        else if(id == "large"){
            size = 8;
        }
        drawio.ctx.lineWidth = size;
    });

    //undo changes
    $("#undo").on("click", function(){

    });

    //redo changes
    $("redo").on("click", function(){
        console.log("I do nothing");
    });
    //get mouse coordinates
    function getMouse(mouseEvent){
        var xpos = mouseEvent.pageX - drawio.canvas.offsetLeft;
        var ypos = mouseEvent.pageY - drawio.canvas.offsetTop;
        return {x: xpos, y: ypos};
    }
    function getShape(mousePos){
        var i;
        var shapesToMove = [];
        for(i = 0; i < drawio.shapes.length; i++){
            if((mousePos.x < drawio.shapes[i].width && mousePos.x > drawio.shapes[i].position.x || mousePos.x > drawio.shapes[i].width && mousePos.x < drawio.shapes[i].position.x) || (mousePos.y < drawio.shapes[i].height && mousePos.y > drawio.shapes[i].position.y || mousePos.y > drawio.shapes[i].height && mousePos.y < drawio.shapes[i].position.y)){
                shapesToMove.push(i);
            }
        }
        return shapesToMove;
    }
    //mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent){
        var mouse = getMouse(mouseEvent)

        switch(drawio.selectedShape){
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouse.x, y: mouse.y }, 0, 0, color);
                break;
            case drawio.availableShapes.PENCIL:
                drawing = true;
                drawio.selectedElement = new Pencil({x: mouse.x, y: mouse.y}, [], color, size);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, color);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({x: mouse.x, y: mouse.y}, 0, 0, color, size);
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, color);
                break;
            case drawio.availableShapes.MOVE:
                var toMove = getShape(mouse);
                var moveOrigin = mouse;
        }
    });
    //mosemove
    $('#my-canvas').on('mousemove', function(mouseEvent){
        var mouse = getMouse(mouseEvent)

        if(drawio.selectedElement){
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            if(drawio.selectedElement == "move"){
                var j;
                var xOffset = mouse.x - moveOrigin.x;
                var yOffset = mouse.y - moveOrigin.y;
                for(i = 0; i < toMove.length; j++){
                    shapes[toMove[j]].position.x + xOffset;
                    shapes[toMove[j]].position.y + yOffset;
                    shapes[toMove[j]].position.width + xOffset;
                    shapes[toMove[j]].position.height + yOffset;
                }
            }
            else{
                drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            }

            drawCanvas();
        }

    });
    //mouse goes out of the canvas, it should
    $('#my-canvas').on('mouseleave', function(mouseEvent){
        if(drawio.selectedElement != null){
            drawio.shapes.push(drawio.selectedElement);
            drawio.selectedElement = null;
            drawing = false;
            dragging = false;
        }

    })
    //mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent){
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
        drawing = false;
        dragging = false;

    })
});
