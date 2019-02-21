//Setup of the assignment


$(function(){
    drawio.canvas.width = drawio.canvas.clientWidth;
    drawio.canvas.height = drawio.canvas.clientHeight;
    var color = "black";
    var size = 4, checked = false;
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
        drawio.shapes.length = 0; //reset array
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
        var lastevent = drawio.shapes[drawio.shapes.length - 1];
        drawio.shapes.pop();
        drawio.redo.push(lastevent);
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    //redo changes
    $("#redo").on("click", function(){
        var redoitem = drawio.redo[drawio.redo.length -1];
        drawio.redo.pop();
        if(redoitem != undefined){
            drawio.shapes.push(redoitem);
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        }        
        drawCanvas();
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
            console.log(shapes[i]);
        }
        return shapesToMove;
    }
    //mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent){
        var mouse = getMouse(mouseEvent)
        switch(drawio.selectedShape){
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouse.x, y: mouse.y }, 0, 0, color, checked, size);
                break;
            case drawio.availableShapes.PENCIL:
                drawing = true;
                drawio.selectedElement = new Pencil({x: mouse.x, y: mouse.y}, [], color, size);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, color, checked, size);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({x: mouse.x, y: mouse.y}, 0, 0, color, size);
                break;
            case drawio.availableShapes.TEXT:
                var textData = $('#text-shape').val();
                var textFont = $('#fontSize').val().concat(' ', $('#textFont').val());
                drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, color, textData, textFont);                
                break;
            case drawio.availableShapes.MOVE:
                dragging = true;
                var toMove = getShape(mouse);
                console.log(toMove);
                var moveOrigin = mouse;
                console.log(moveOrigin);
        }
    });
    //mosemove
    $('#my-canvas').on('mousemove', function(mouseEvent){
        var mouse = getMouse(mouseEvent);
        if(drawio.selectedElement){
            console.log("I'm here");
            if(drawio.selectedElement == 'move'){
                if(dragging === false){
                    return;
                }
                var yOffset = mouse.y - moveOrigin.y;
                var xOffset = mouse.y - mouseOrgin.x;
                mouseOrgin.y = mouse.y;
                mouseOrgin.x = mouse.x;
                /*for(let i = 0; i < toMove.length; j++){
                    
                }*/
            }
            else{
                console.log("right place");
                drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
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
            drawio.redo.length = 0; //make it so it's not able to redo after a pen has been written
        }

    })
    //mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent){
        if(drawio.selectedElement != null){
            drawio.shapes.push(drawio.selectedElement);
            drawio.selectedElement = null;
            drawing = false;
            dragging = false;
            drawio.redo.length = 0; //make it so it's not able to redo after a pen has been written
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas()
        }
    });
    //save image
    $("#save").on("click", function(){
        var imput = $("#image-title").val();
        console.log(imput);
        myStorage = window.localStorage;
        var content = JSON.stringify(drawio);
        //checks if the key already exists in the stoage
        if(myStorage.getItem(imput) === null){
            $("#files").append("<li class='dropdown-item savefile'>"+imput+"</li>");
        }
        //add to storage
        myStorage.setItem(imput, content);        
    });
    //load image
    $("#load").one("click", function(){
        myStorage = window.localStorage;
        var keys = Object.keys(localStorage);
        for(let i = 0; i < keys.length; i++){
            var key = keys[i];
            $("#files").append("<li class='dropdown-item savefile'>"+key+"</li>");
        }
        //get the savefile from the list declared from local storage
        $(".savefile").on("click", function(){
            var someval = $(this).html();
            //get item from local storage
            var canv = localStorage.getItem(someval);
            //parse the string to json
            var values = JSON.parse(canv); //parse the json string from local storage
            
            var item = values.shapes;
            drawio.shapes.length = 0;
            //goes through all the shapes and redraws them
            for(let i = 0; i < item.length; i++){
                drawio.selectedShape = item[i].type;
                console.log(item[i])
                redrawCanvas(item[i]);
                drawio.shapes.push(drawio.selectedElement);
                drawio.selectedElement = null;
            }
            //Change the textbox on top to the name of the image before loading
            $("#image-title").val(someval);
            //change the shape back to the one which was selected
            var shape = $(".icon.selected").data('shape');
            console.log(shape);
            drawio.selectedShape = shape;
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas();
        });
    });
    //Export image to png
    $("#export").on("click", function(){
        var url = drawio.canvas.toDataURL("image/png");
        var contextElement = null;
    });
    $("#fill").on("click", function(){
        if(this.checked){
            checked = true;
        }
        else{
            checked = false;
        }
    });

});
