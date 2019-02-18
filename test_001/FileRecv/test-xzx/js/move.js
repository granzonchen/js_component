var test = document.getElementById("test");
var oUl = test.getElementsByTagName("ul")[0];
var aLi = oUl.getElementsByTagName("li");
var z = 2;

var arr = [];
for (var i = 0; i < aLi.length; i++) {
    arr.push([aLi[i].offsetLeft, aLi[i].offsetTop]);
}

for (var i = 0; i < aLi.length; i++) {
    aLi[i].style.position = "absolute";
    aLi[i].style.left = arr[i][0] + "px";
    aLi[i].style.top = arr[i][1] + "px";
    aLi[i].style.margin = 0;
}

for (var i = 0; i < aLi.length; i++) {
    aLi[i].index = i;
    drag(aLi[i]);
}

function drag(obj) {
    obj.onmousedown = function (ev) {
        ev = ev || window.ev;
        var x = ev.clientX;
        var y = ev.clientY;

        var l = obj.offsetLeft;
        var t = obj.offsetTop;

        this.style.zIndex = z++;

        document.onmousemove = function (ev) {
            ev = ev || window.ev;
            var _left = ev.clientX - x + l;
            var _top = ev.clientY - y + t;
            obj.style.left = _left + "px";
            obj.style.top = _top + "px";

            var li = near(obj);
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.background = "";
            }
            if (li) {
                li.style.background = "#DF971F";
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmousedown = null;

            var nearLi = near(obj);
            var tmp = 0;
            if (nearLi) {
                move(nearLi, {
                    left: arr[obj.index][0],
                    top: arr[obj.index][1]
                });
                move(obj, {
                    left: arr[nearLi.index][0],
                    top: arr[nearLi.index][1]
                });
                nearLi.style.background = "";

                tmp = obj.index;
                obj.index = nearLi.index;
                nearLi.index = tmp;
            } else {
                move(obj, {
                    left: arr[obj.index][0],
                    top: arr[obj.index][1]
                });
            }
        }
        return false;
    }
}

function impact(obj1, obj2) {
    var L1 = obj1.offsetLeft;
    var R1 = obj1.offsetLeft + obj1.offsetWidth;
    var T1 = obj1.offsetTop;
    var B1 = obj1.offsetTop + obj1.offsetHeight;

    var L2 = obj2.offsetLeft;
    var R2 = obj2.offsetLeft + obj2.offsetWidth;
    var T2 = obj2.offsetTop;
    var B2 = obj2.offsetTop + obj2.offsetHeight;

    if (L2 > R1 || T2 > B1 || R2 < L1 || B2 < T1) {
        return false;
    } else {
        return true;
    }
}

function near(obj) {
    var tmp = 5000;
    var oLi = '';
    for (var i = 0; i < aLi.length; i++) {
        if (impact(obj, aLi[i]) && obj != aLi[i]) {
            var c = disCalc(obj, aLi[i]);

            if (tmp > c) {
                tmp = c;
                oLi = aLi[i];
            }
        }
    }
    return oLi;
}

function disCalc(obj1, obj2) {
    var x = obj1.offsetLeft - obj2.offsetLeft;
    var y = obj1.offsetTop - obj2.offsetTop;
    return Math.sqrt(x * x + y * y);
}

function move(obj, json, endFn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bBtn = true;
        for (var attr in json) {
            var iCur = 0;
            if (attr == 'opacity') {
                if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                    iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                }
            } else {
                iCur = parseInt(getStyle(obj, attr)) || 0;
            }

            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != json[attr]) {
                bBtn = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if (bBtn) {
            clearInterval(obj.timer);
            if (endFn) {
                endFn.call(obj);
            }
        }
    }, 30);
}


function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
