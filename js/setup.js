window.drawio = {
    shapes : [],
    selectedShape: "rectangle",
    ctx: document.getElementById("my-canvas").getContext("2d"),
    canvas: document.getElementById('my-canvas'),
    selectedElement : null,
    availableShapes:{
        RECTANGLE : "rectangle",
        PENCIL : "pencil",
        LINE : "line",
        TEXT : "text",
        CIRCLE : "circle"
    }
};
