window.drawio = {
    shapes : [],
    redo: [],
    selectedShape: "pencil",
    ctx: document.getElementById("my-canvas").getContext("2d"),
    canvas: document.getElementById('my-canvas'),
    selectedElement : null,
    availableShapes:{
        RECTANGLE : "rectangle",
        PENCIL : "pencil",
        CIRCLE : "circle",
        LINE : "line",
        TEXT : "text"
    }
};
