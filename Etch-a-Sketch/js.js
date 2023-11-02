//for the pixel density 
let isPainting = false;
let isErasing = false;
let rainbowMode = false;
let btn = document.getElementById("draw");
let btnRainbow = document.getElementById("Rainbow");


function clearBoxes(){
    const containerDiv = document.querySelector(".container");
    containerDiv.innerHTML = "";
}

function clearCol(){
    var sel = parseFloat(document.getElementById("fader").value);
    createBox(sel,sel);
}

function createBox(rows, columns) {
    clearBoxes();
    const containerDiv = document.querySelector(".container");
    const containerSize = 620.8;

    const boxSize = (containerSize / Math.max(rows, columns));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const box = document.createElement("div");
            box.className = "box";
            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
            containerDiv.appendChild(box);
        }
    }
}



function sliderSel(){
        var sel = parseFloat(document.getElementById("fader").value);
        createBox(sel,sel);

        var val = document.getElementById("fader");//for displaying the number of the grid
        var number = document.getElementById("number"); 
        number.innerHTML = val.value;
} 

function blackCol(){
    box.style.backgroundColor = "black";
}
    
//trigger the initial grid load (diabase ligo parapano gia auto)
document.addEventListener("DOMContentLoaded", function(){
    sliderSel();

    document.getElementById("fader").addEventListener("input", function(){
        sliderSel();
    });
});

//to run func when dom is loaded 

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const btn = document.getElementById("draw");
    let isPainting = false;
    let isErasing = false;

    function togglePainting() {
        isPainting = !isPainting;
        isErasing = false;
        btn.textContent = isPainting ? "Painting" : "Erasing";
    }

    btn.addEventListener("click", togglePainting);

    function paintOrErase(box) {
        if (box.classList.contains("box")) {
            if (isPainting) {
                if (rainbowMode) {
                    box.style.backgroundColor = getRandomColor();
                } else {
                    box.style.backgroundColor = "black";
                }
            } else {
                box.style.backgroundColor = "";
            }
        }
    }

    container.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if (isPainting || isErasing) {
            paintOrErase(event.target);
        }
    });

    container.addEventListener("mousemove", (event) => {
        if (mouseDown) {
            paintOrErase(event.target);
        }
    });

    container.addEventListener("mouseleave", () => {
        mouseDown = false;
    });

    let mouseDown = false;

    container.addEventListener("mousedown", () => {
        if (isErasing) {
            isPainting = false;
        }
        mouseDown = true;
    });

    container.addEventListener("mouseup", () => {
        mouseDown = false;
    });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
    btnRainbow.textContent = rainbowMode? "Rainbow mode: on" : "Rainbow mode: off";
}


btnRainbow.addEventListener("click", () => {
    if (isPainting || isErasing) {
        paintOrErase(event.target);
    } else {
        toggleRainbowMode();
    }
});
