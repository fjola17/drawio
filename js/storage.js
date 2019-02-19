function redrawCanvas(item){
    switch(drawio.selectedShape){
        case drawio.availableShapes.RECTANGLE:
        console.log("im here");
            drawio.selectedElement = new Rectangle({ x: item.position.x, y: item.position.y }, item.width, item.height, item.strokeStyle);
            break;
        case drawio.availableShapes.PENCIL:                
            drawing = true;
            drawio.selectedElement = new Pencil({x: item.position.x, y: item.position.y}, item.shapearr, item.strokeStyle, item.lineWidth);
            break;
        case drawio.availableShapes.CIRCLE:
            
            break;
        case drawio.availableShapes.LINE:
            drawio.selectedElement = new Line({x: item.position.x, y: item.position.y}, item.x1, item.y1, item.strokeStyle, item.lineWidth);
            break;
        case drawio.availableShapes.TEXT:

            break;
    }
}