//Setup of the assignment


$(function(){
    drawio.canvas.width = drawio.canvas.clientWidth;
    drawio.canvas.height = drawio.canvas.clientHeight;
    function drawCanvas(){
        if(drawio.selectedElement){
            drawio.selectedElement.render();
        }
        for(let i = 0; i < drawio.shapes.length; i++){
            drawio.shapes[i].render();
        }
    };

    //Document is ready
    $('.icon').on('click', function(){
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');  
    });
    
    $("#reset").on("click", function(){
        drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
        drawio.shapes = [];
    });
    
    $("#undo").on("click", function(){
        console.log("I do nothing");
    });
    
    $("redo").on("click", function(){
        console.log("I do nothing");
    });
    function getMouse(mouseEvent){
       // var ble = drawio.canvas.getBoundingClientRect()
        var xpos = mouseEvent.pageX - drawio.canvas.offsetLeft;
        var ypos = mouseEvent.pageY - drawio.canvas.offsetTop;
        return {x: xpos, y: ypos};
    }
    //mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent){
        var mouse = getMouse(mouseEvent);
        //console.log("Pos: " + xpos, ypos)
        switch(drawio.selectedShape){
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouse.x, y: mouse.y }, 0, 0, 0, 0);
                break;
            case drawio.availableShapes.PENCIL:
                console.log("Pencil: NOT DONE YET");
                break;
            case drawio.availableShapes.CIRCLE:
                console.log("Circle: Not done yet");
                break;
            case drawio.availableShapes.LINE:
            console.log("drawing a line");
                drawio.selectedElement = new Line({x: mouse.x, y: mouse.y}, 0, 0);
                break;
            case drawio.availableShapes.TEXT:
                console.log("TEXT: blablabla");
                break;
        }
    });
    //mosemove
    $('#my-canvas').on('mousemove', function(mouseEvent){
        var mouse = getMouse(mouseEvent), drawing = false;
        if(drawio.availableShapes.LINE || drawio.availableShapes.PENCIL){
            drawing = true;
        }
        if(drawio.selectedElement){
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas()
        }

    });
    //mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent){
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
        //drawCanvas();
    })
});