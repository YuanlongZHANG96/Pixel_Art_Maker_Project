/** 
 *   Here's the list of variables and the descriptive info in this JS:
 * 
 *   color_input - the color code the user selected to draw the grid
 *   size_input_height / size_input_width - number of squares represents the height & width of canvas
 *   cell_size - define the size of the cells of canvas
 *   canvas - define the canvas object
 *   print_eraser - the drawing tools the user selected: can be painter or eraser
 *   print_eraser_header - the descriptive header of the painter or eraser header, display editing mode
 *   color_header - the descriptive header for color picker -will switch to different info depends on mode
 *   resetNow - the reset button which allows end users to remove all the contents on canvas
 */

// Select color input
let color_input = document.getElementById("colorPicker");
// Select size input
let size_input_height = document.getElementById("inputHeight");
let size_input_width = document.getElementById("inputWidth");
// Defined the grid and cells related input
let cell_size = document.getElementById("inputSize");
let canvas = document.getElementById("pixelCanvas");
// Defind the painter and eraser related input
let print_eraser = document.getElementById("eraser");
let print_eraser_header = document.getElementById("switchTools");
let color_header = document.getElementById("colorHeader");
let user_form = document.getElementById("sizePicker");
let resetNow = document.getElementById("resetButton");


// When size is submitted by the user, call makeGrid()
function logSubmit(event) {
    /**
    * The function will try to find whether the canvas already existed. If so, remove the canvas at first.
    * Then it will trigger the makeGrid function to create a new canvas based on user's input.
    */
    event.preventDefault();
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    }
    makeGrid(size_input_width.value, size_input_height.value, cell_size.value);
}


//Main function for the app to create the new canvas (or reset the canvas)
function makeGrid(width, height, size) {
    /**
     * The function required 3 arguments:
     * width - number of squares to represent the width of canvas
     * height - number of squares to represent the height of canvas
     * size - the size (in px) of the cell in canvas (assuming they are square)
     */
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
                /**
                 * The function will determine whether it is a painter or an eraser based on print_eraser
                 * After user click on a cell, it will change the color of the cell under painter mode, 
                 * or it will set the cell to white under eraser mode
                 */
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


// Add the listener to user_form for submit event. When submitted, trigger the logSubmit and define canvas.
user_form.addEventListener("submit", logSubmit);


/**
 * Add the listener to resetNow button on click. When click, it will pop up a warning message box.
 * Only when user confirm to reset the canvas, it will trigger logSubmit to reset a new canvas.
 */
resetNow.addEventListener("click", function (event) {
    event.preventDefault();
    const exec = confirm("Are you sure to reset the canvas?\nWARNING: All your works will be deleted!");
    if (exec) {
        logSubmit(event);
    }
})


// The listener will catch the user select whether eraser or painter, and change the info accordingly
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


