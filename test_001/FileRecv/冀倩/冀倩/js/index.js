          /*
            * ��Ȼ�Ѿ��趨��imgԪ�ؿɱ��϶������������Ĭ�ϵأ��޷�������/Ԫ�ط��õ�����Ԫ���С�
            * �������Ҫ����ĳЩԪ�ؿɽ��ܱ��϶�Ԫ�أ���Ҫ��ֹ����Ĭ����Ϊ��
            * ��Ҫͨ�����øý���Ԫ�ص�ondragover �¼�������event.preventDefault() ����
            */
           function allowDrop(ev) {
               ev.preventDefault(); //��ֹĬ����Ϊ

               //ev.target.id
               //�˴�ev.target�ǽ���Ԫ�أ�ͨ���¼��������ĸ�Ԫ�ؼ�������
           }

/*
 * ����imgԪ�ر��϶�ʱ���ᴥ��һ��ondragstart �¼������¼�������һ������drag(event)��
 */
function drag(ev) {
    //ev.dataTransfer.setData() �������ñ������ݵ��������ͣ�Text����ֵ������Ԫ��id����
    //�÷��������϶�Ԫ�ص�id�洢���¼���dataTransfer�����ڣ�ev.dataTransfer.getData()�ɽ���Ԫ��ȡ����
    //�˴�ev.target�Ǳ��϶�Ԫ��
    ev.dataTransfer.setData("Text", ev.target.id);
}

/*
 * ������Ԫ���ƶ�������Ԫ�أ�
 * �ɿ����ʱ��������Ԫ�ط����ڽ���Ԫ����ʱ�������ondrop�¼�
 */
function drop(ev) {
    ev.preventDefault(); //��ֹĬ����Ϊ
    var data = ev.dataTransfer.getData("Text"); //�����϶�Ԫ��idȡ��
    ev.target.appendChild(document.getElementById(data)); //�����϶�Ԫ����ӵ�����Ԫ��β��
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
