var box = my$("box");
var screen = box.children[0];
var imgWidth = screen.offsetWidth;
var ulObj = screen.children[0];
var list = ulObj.children;
var olObj = screen.children[1];
var arr = my$("arr");
var pic = 0;
for (var i = 0; i < list.length; i++) {
    var liObj = document.createElement("li");
    olObj.appendChild(liObj);
    liObj.innerHTML = (i + 1);
    liObj.setAttribute("index", i);
    liObj.onmouseover = function () {
        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        this.className = "current";
        pic = this.getAttribute("index");
        animate(ulObj, -pic * imgWidth);
    };
}
olObj.children[0].className = "current";
ulObj.appendChild(ulObj.children[0].cloneNode(true));
var timeId = setInterval(clickHandle, 1000);
box.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timeId);
};
box.onmouseout = function () {
    arr.style.display = "none";
    timeId = setInterval(clickHandle, 1000);
};
my$("right").onclick = clickHandle;
function clickHandle() {
    if (pic == list.length - 1) {
        pic = 0;
        ulObj.style.left = 0 + "px";
    }
    pic++;
    animate(ulObj, -pic * imgWidth);
    if (pic == list.length - 1) {
        olObj.children[olObj.children.length - 1].className = "";
        olObj.children[0].className = "current";
    } else {
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }
};

my$("left").onclick = function () {
    if (pic == 0) {
        pic = 5;
        ulObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(ulObj, -pic * imgWidth);

    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    olObj.children[pic].className = "current";

};

function animate(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 10);
}