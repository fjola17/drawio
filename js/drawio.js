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
    function inRect(mx, my, x1, y1, width, height){
        //top left to bottom right
        if(mx >= x1 && mx < x1 + width && my > y1 && my < y1 + height){
            console.log("wut");
            return true;

        }
        else if(mx >= x1 + width && mx <= x1 && my >= y1 && my <= y1 + height) {
            console.log(mx, x1);
            return true;
        }
        else {
            return false;
        }
    }
    function getShape(mousePos){

        var shapesToMove;

        for(let i = 0; i < drawio.shapes.length; i++){
            console.log("inside for loop");
            var tempShape = drawio.shapes[i];
            switch (drawio.shapes[i].type) {

                case "rectangle":
                    //top left to bottom right

                    if(inRect(mousePos.x, mousePos.y, tempShape.position.x, tempShape.position.y, tempShape.width, tempShape.height)) {
                        console.log("Clicked rect");
                        return drawio.shapes[i];
                    }
                    break;
                case "circle":
                    if(Math.sqrt(Math.pow(Math.abs(mousePos.x - tempShape.position.x), 2) + Math.pow(Math.abs(mousePos.y - tempShape.position.y), 2)) <= tempShape.rad) {
                        console.log("Clicked circle");
                        return true;
                    }
                    break;
                case "text":
                    console.log("made it");
                    if(inRect(mousePos.x - 15, mousePos.y - (tempShape.textData.length * 10), tempShape.position.x, tempShape.position.y, tempShape.textData.length * 10, 15)) {
                        console.log("Clicked text");
                        return true;
                    }
                    break;
                case "line":
                    if ((tempShape.position.x < mousePos.x < tempShape.x1 && tempShape.position.y < mousePos.y < tempShape.y1) || (tempShape.position.x > mousePos.x > tempShape.x1 && tempShape.position.y > mousePos.y > tempShape.y1)) {
                        console.log("Clicked line");
                        return true;
                    }
                    break;
                case "pencil":
                    for(let i = 0; i < tempShape.shapearr.length; i++){
                        console.log("Mouse: " + mousePos.x, mousePos.y + "Line: " + tempShape.shapearr[i][0], tempShape.shapearr[i][1]);
                        if ((mousePos.x - 8 < tempShape.shapearr[i][0] && mousePos.x + 8 > tempShape.shapearr[i][0]) && (mousePos.y - 8 < tempShape.shapearr[i][1] && mousePos.y + 8 > tempShape.shapearr[i][1])) {
                            console.log("Clicked pencil line");
                            return true;
                        }

                    }
                    break;
                default:
                    console.log("oops");

            }
        }
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
                toMove = getShape(mouse);
                moveOrigin = mouse;
                dragging = true;

        }
    });

    function moveShape(shape){

        drawio.selectedShape = shape;

        console.log("Shape:" + drawio.selectedShape);
    }

    //mosemove
    $('#my-canvas').on('mousemove', function(mouseEvent){
        var mouse = getMouse(mouseEvent);
        if(drawio.selectedElement){
            console.log("right place");
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);

        }

        if(dragging ===true){
            if(dragging == false){
                return;
            }
            toMove.position.x = mouse.x;
            toMove.position.y = mouse.y;
            moveShape(toMove);
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);

        }
        drawCanvas();

    });

    //mouse goes out of the canvas, it should
    $('#my-canvas').on('mouseleave', function(mouseEvent){
        if(drawio.selectedElement != null){
        if(dragging){
            dragging = false;
        }
        else{
            drawio.shapes.push(drawio.selectedElement);

            drawing = false;
            toMove = null;
            drawio.redo.length = 0; //make it so it's not able to redo after a pen has been written
        }
        drawio.selectedElement = null;
    }

    })
    //mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent){
        if(drawio.selectedElement != null){
            if(!dragging){
            drawio.shapes.push(drawio.selectedElement);
            toMove = null;
            }
            drawio.redo.length = 0; //make it so it's not able to redo after a pen has been written
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas()

        }
        dragging = false;
       drawio.selectedElement = null;
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
