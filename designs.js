// Select color input
let color_input = document.getElementById("colorPicker");
// Select size input
let size_input_height = document.getElementById("inputHeight");
let size_input_width = document.getElementById("inputWidth");
let cell_size = document.getElementById("inputSize");
let canvas = document.getElementById("pixelCanvas");
let print_eraser = document.getElementById("eraser");
let print_eraser_header = document.getElementById("switchTools");
let color_header = document.getElementById("colorHeader");
let user_form = document.getElementById("sizePicker");
let resetNow = document.getElementById("resetButton");
// When size is submitted by the user, call makeGrid()
function logSubmit(event) {
    event.preventDefault();
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    }
    makeGrid(size_input_width.value, size_input_height.value, cell_size.value);
}

user_form.addEventListener("submit", logSubmit);

resetNow.addEventListener("click", function (event) {
    event.preventDefault();
    const exec = confirm("Are you sure to reset the canvas?\nWARNING: All your works will be deleted!");
    if (exec) {
        logSubmit(event);
    }
})

print_eraser.addEventListener("click", function (event) {
    event.preventDefault();
    if (print_eraser.innerHTML == "Eraser") {
        print_eraser.innerHTML = "Painter";
        color_input.style.visibility = "hidden";
        print_eraser_header.innerHTML = "Switch to Painter";
        color_header.innerHTML = "Eraser Mode";
    } else {
        print_eraser.innerHTML = "Eraser";
        color_input.style.visibility = "visible";
        print_eraser_header.innerHTML = "Switch to Eraser";
        color_header.innerHTML = "Pick A Color";
    }
})

function makeGrid(width, height, size) {
// Your code goes here!
    let h = 0;
    while (h < height) {
        let rows = canvas.insertRow(h);
        h++;
        let w = 0;
        while (w < width) {
            let cells = rows.insertCell(w);
            cells.style.width = size + "px";
            cells.style.height = size + "px";
            cells.addEventListener("mousedown", function (event) {
                if (print_eraser.innerHTML == "Painter") {
                    cells.style.backgroundColor = "white";
                } else {
                    cells.style.backgroundColor = color_input.value;
                }
            });
            w++;
        }
    }

}
