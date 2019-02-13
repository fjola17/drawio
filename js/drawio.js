//Setup of the assignment


$(function(){
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
    })

    //mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent){
        switch(drawio.selectedShape){
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
                break;
            case drawio.availableShapes.PENCIL:
                console.log("Pencil: NOT DONE YET");
                break;
            case drawio.availableShapes.CIRCLE:
                console.log("Circle: Not done yet");
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.TEXT:
                console.log("TEXT: blablabla");
                break;
        }
    });
    //mosemove
    $('#my-canvas').on('mousemove', function(mouseEvent){
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
    })
});