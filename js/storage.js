//funcion to redraw the whole canvas from local storage
function redrawCanvas(item){
    switch(drawio.selectedShape){
        case drawio.availableShapes.RECTANGLE:
            drawio.selectedElement = new Rectangle({ x: item.position.x, y: item.position.y }, item.width, item.height, item.strokeStyle);
            break;
        case drawio.availableShapes.PENCIL:                
            drawio.selectedElement = new Pencil({x: item.position.x, y: item.position.y}, item.shapearr, item.strokeStyle, item.lineWidth);
            break;
        case drawio.availableShapes.CIRCLE:
            drawio.selectedElement = new Circle({ x: item.position.x, y: item.position.y }, item.rad, item.strokeStyle);
            break;
        case drawio.availableShapes.LINE:
            drawio.selectedElement = new Line({x: item.position.x, y: item.position.y}, item.x1, item.y1, item.strokeStyle, item.lineWidth);
            break;
        case drawio.availableShapes.TEXT:
        console.log(item);
            drawio.selectedElement = new Text({ x: item.position.x, y: item.position.y}, item.width, item.height, item.strokeStyle, item.textData, item.textFont);
            break;
    }
}