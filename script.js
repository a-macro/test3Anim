const main = document.getElementById("main");
const gallery = document.getElementById("gallery");
let isMouseDown = false;
let startX = 0;
let rightLimit = 0;
let translateX = 0;
let valueX = 0;
let currentTranslate = 0;

const init = () => {
    rightLimit = gallery.offsetWidth - window.innerWidth;
    gallery.addEventListener("mousedown", (e) => {
        e.preventDefault();
        startCalc(e.pageX);
    });
    gallery.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startCalc(e.touches[0].pageX);
    }), false;

    gallery.addEventListener("mouseleave", () => {
        isMouseDown = false;
    });
    gallery.addEventListener("touchcancel", () => {
        isMouseDown = false;
    }), false;

    gallery.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
    gallery.addEventListener("touchend", () => {
        isMouseDown = false;
    }), false;

    gallery.addEventListener("mousemove", e => {
        e.preventDefault();
        moveCalc(e.pageX);
    });
    gallery.addEventListener("touchmove", e => {
        e.preventDefault();
        moveCalc(e.touches[0].pageX);
    }), false;
};

window.addEventListener("resize", init);

const updateTranslate = () => {
    valueX += (translateX - valueX) * 0.1;
    gallery.style.transform = `translateX(-${Math.floor(valueX)}px)`;
    requestAnimationFrame(updateTranslate);
};

const moveCalc = (pageX) => {
    if (!isMouseDown) {
        return;
    }
    const x = pageX - gallery.offsetLeft;
    const step = x - startX;
    translateX = currentTranslate - step;
    if (translateX >= rightLimit) {
        translateX = rightLimit;  
    } 
    if (translateX <= 0) {
        translateX = 0;
    }
};
const startCalc = (pageX) => {
    isMouseDown = true;
    startX = pageX - gallery.offsetLeft;
    currentTranslate = valueX;
}

window.addEventListener("DOMContentLoaded", (event) => {
    init();
    updateTranslate();
});
