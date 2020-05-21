
var btn = document.querySelector('.btn');  //結果按鈕
var show = document.querySelector('.result_show'); //上方結果顯示
var showStatus = document.querySelector('.status'); //上方結果文字
var showBmi = document.querySelector('.bmiNum');
var resultNum; //bmi數字
var resetBtn = document.querySelector('.reset_btn');
var height;
var weight;
var d = new Date();
var today;
var h;
var w;
var data = JSON.parse(localStorage.getItem('listData')) || [];
var list = document.querySelector('.list');
btn.addEventListener('click',calc,false);
resetBtn.addEventListener('click',resetForm,false);
var bmiStatus = {
    lv1:{
        status: '過輕',
        class: 'level1'
    },
    lv2:{
        status: '理想',
        class: 'level2'
    },
    lv3:{
        status: '過重',
        class: 'level3'
    },
    lv4:{
        status: '輕度肥胖',
        class: 'level4'
    },
    lv5:{
        status: '中度肥胖',
        class: 'level5'
    },
    lv6:{
        status: '重度肥胖',
        class: 'level6'
    }
};
var bmiColor;
updatelist();
function resetForm(e) {
    e.preventDefault();
    document.getElementById("form1").reset();
    // show.classList.remove('dflex');
    show.setAttribute('class', 'result_show');
    btn.classList.remove('hide');
}

function calc() {
    today = (d.getMonth()+1) +'-'+d.getDate()+'-'+d.getFullYear();
    // console.log(today);
    height = document.getElementById('height').value;
    weight = document.getElementById('weight').value;
    h = Number(height) / 100;
    w = Number(weight);
    resultNum = Math.round((w/Math.pow(h,2)) * 100) /100;
    if (isNaN(height)||isNaN(weight)||height==""||weight=="") {
        alert('請輸入數字');
    } else {
        btn.classList.add('hide');
        // console.log(resultNum);
        switch (true) {
            case resultNum < 18.5:
                bmiColor = bmiStatus.lv1.class;
                showStatus.innerHTML = bmiStatus.lv1.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            case resultNum >= 18.5 && resultNum <24:
                bmiColor = bmiStatus.lv2.class;
                showStatus.innerHTML = bmiStatus.lv2.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            case resultNum >=24 && resultNum <27:
                bmiColor = bmiStatus.lv3.class;
                showStatus.innerHTML = bmiStatus.lv3.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            case resultNum >=27 && resultNum <30:
                bmiColor = bmiStatus.lv4.class;
                showStatus.innerHTML = bmiStatus.lv4.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            case resultNum >=30 && resultNum <35:
                bmiColor = bmiStatus.lv5.class;
                showStatus.innerHTML = bmiStatus.lv5.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            case resultNum >=35:
                bmiColor = bmiStatus.lv6.class;
                showStatus.innerHTML = bmiStatus.lv6.status;
                showBmi.innerHTML = resultNum;
                show.classList.add('dflex',bmiColor);
                resetBtn.setAttribute('class', bmiColor);
                break;
            default:
                break;
        }
        saveData();
        updatelist();
    }      
}

function saveData () {
    var newlist = {
        date: today,
        color: bmiColor,
        status: showStatus.innerHTML,
        bmi: resultNum,
        height: height,
        weight: weight,
    }
    data.push(newlist);
    localStorage.setItem('listData', JSON.stringify(data));
}

function updatelist () {
    var str='';
    var len = data.length;
    for (var i = 0; i < data.length; i++) {
        str+='<li class="item '+data[i].color+'"> <p>'+data[i].status+'</p> <p><span>BMI</span>'+data[i].bmi+'</p> <p><span>weight</span>'+data[i].weight+'kg</p> <p><span>height</span>'+data[i].height+'cm</p> <p><span>'+data[i].date+'</span></p> </li>';
    }
    list.innerHTML = str;
}

// 體重（公斤）除以身高（公尺）的平方
// Math.round(X * 100) / 100. 四捨五入小數點後第二位方法
//js date
//
