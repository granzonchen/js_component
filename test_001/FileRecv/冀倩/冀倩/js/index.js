          /*
            * 虽然已经设定了img元素可被拖动，但是浏览器默认地，无法将数据/元素放置到其他元素中。
            * 如果有需要设置某些元素可接受被拖动元素，则要阻止它的默认行为，
            * 这要通过设置该接收元素的ondragover 事件，调用event.preventDefault() 方法
            */
           function allowDrop(ev) {
               ev.preventDefault(); //阻止默认行为

               //ev.target.id
               //此处ev.target是接收元素，通过事件被绑定在哪个元素即可区分
           }

/*
 * 当该img元素被拖动时，会触发一个ondragstart 事件，该事件调用了一个方法drag(event)。
 */
function drag(ev) {
    //ev.dataTransfer.setData() 方法设置被拖数据的数据类型（Text）和值（被拖元素id），
    //该方法将被拖动元素的id存储到事件的dataTransfer对象内，ev.dataTransfer.getData()可将该元素取出。
    //此处ev.target是被拖动元素
    ev.dataTransfer.setData("Text", ev.target.id);
}

/*
 * 当被拖元素移动到接收元素，
 * 松开鼠标时（即被拖元素放置在接收元素内时）会出发ondrop事件
 */
function drop(ev) {
    ev.preventDefault(); //阻止默认行为
    var data = ev.dataTransfer.getData("Text"); //将被拖动元素id取出
    ev.target.appendChild(document.getElementById(data)); //将被拖动元素添加到接收元素尾部
}

var zoom = 1;
function fd(objId) {
    zoom += 1
    var w = 150
    var h = 100

    var newW = (100 + zoom) * w / 100;
    var newH = (100 + zoom) * h / 100;

    document.getElementById(objId).style.height = newH + "px";
    document.getElementById(objId).style.width = newW + "px";
}

function sx(objId) {
    zoom -= 1
    var h = 100
    var w = 150

    var newH = (100 + zoom) * h / 100;
    var newW = (100 + zoom) * w / 100;
    document.getElementById(objId).style.height = newH + "px";
    document.getElementById(objId).style.width = newW + "px";
}

var timer = null;
function singleClick(objId) {
    clearTimeout(timer);

    timer = setTimeout(function () {
        fd(objId)
    }, 300);
}
function doubleClick(objId) {
    clearTimeout(timer);
    var img = document.getElementById(objId)
    img.style.transform = "rotate(180deg)";
}
function rightClick(event, objId) {

    if (event.button == 2) {

        sx(objId)
    }
}
