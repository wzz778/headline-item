//获取文章id
var article_id=localStorage.getItem('article_id');
const E = window.wangEditor;
const editor = new E('#div1');
const $text1 = $('#text1')
const text=$('#text2')
editor.config.height = 520;
editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
    $text1.val(html)
    text.val(editor.txt.text())
}
editor.create()
// 第一步，初始化 textarea 的值
$text1.val(editor.txt.html())

//下拉框
var email = document.getElementById('email');
var user = document.getElementById('user');
var silder = document.getElementById("silder-email");
var silder2 = document.getElementById('silder-user');
email.onmouseover = silder.onmouseover = function () {
    silder.style.display = "block";
};
email.onmouseout = silder.onmouseout = function () {
    silder.style.display = "none";
};
user.onmouseover = silder2.onmouseover = function () {
    silder2.style.display = "block";
};
user.onmouseout = silder2.onmouseout = function () {
    silder2.style.display = "none";
};
//选择框
let input = document.getElementById('labelInput');
let label = document.getElementById('label-silder')
let shadow = document.getElementById('label-silder-shadow')
input.addEventListener('click', function () {
    if (label.style.display == 'block') {
        label.style.display = "none";
    } else if (label.style.display = "none") {
        label.style.display = "block";
        shadow.style.display = "block";
    }
})
var close = document.getElementById('close-label-silder');
var label_li = document.getElementById('label-silder').getElementsByTagName('li');
close.onclick = function () {
    label.style.display = "none";
    shadow.style.display = "none";
}
for (let i = 0; i < label_li.length; i++) {
    label_li[i].onclick = function () {
        input.value = label_li[i].innerText;
        label.style.display = "none";
        shadow.style.display = "none";
    }
}


//li变色
var li = document.getElementsByTagName('li');
for (let i = 0; i < li.length; i++) {
    li[i].onmouseover = function () {
        li[i].style.backgroundColor = '#e3e4e5'
    }
    li[i].onmouseout = function () {
        li[i].style.backgroundColor = ''
    }
}

var li1 = document.getElementById('silder-user').getElementsByTagName('li');
for (let i = 1; i < li1.length; i++) {
    li1[i].onmouseover = function () {
        li1[i].style.backgroundColor = '#e3e4e5'
    }
    li1[i].onmouseout = function () {
        li1[i].style.backgroundColor = ''
    }
}


var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}
$("#titleInput").on('input propertychange', function () {
    //获取输入内容
    var userDesc = $(this).val();
    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 100);
    } else {
        len = 0
    }
    //显示字数
    $("#wordsLength").html('还能输入' + (100 - len) + '个字');
});


function today(){
    //创建时间
    var today=new Date();
    var h=today.getFullYear();
    var m=today.getMonth()+1;
    var d=today.getDate();
    var H = today.getHours();
    var M = today.getMinutes();
    var S = today.getSeconds();
    return h+"-"+m+"-"+d+" "+H+":"+M+":"+S;
}
// 修改时获取文章内容
post();
function post(){
    var titleInput=document.getElementById('titleInput');
    var labelInput=document.getElementById('labelInput');
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByID",
        data: {
            postsID: article_id
        },
        dataType: "json",
        success: function (data) {
            // console.log(data)
            $('.w-e-text').html(data.content);
            titleInput.value=data.postsName;
            labelInput.value=data.label
        },
        err: function (result) {
            console.log('出错啦！')
        }
    })
}
// 根据帖子id修改内容
var user_id=localStorage.getItem('user_id');
// let publishBtn_change=document.getElementById("publishBtn_change");
let content2=document.getElementById('text1');
let labelPut2=document.getElementById('labelInput');
let postsName2=document.getElementById('titleInput');
let contentA2=document.getElementById('text2');
let sure = document.getElementById('sure');
let shadow2 = document.getElementById('label-silder-shadow')
let successTip = document.getElementById('successTip')
sure.onclick = function () {
    successTip.style.display = "none";
    shadow2.style.display = "none";
}
function check(radio) {
    var profile_silder=document.getElementById('profile-silder')
    document.getElementById("answer").value = radio
    if(radio=='是'){
        profile_silder.style.display='block'
    }else if(radio=='否'){
        profile_silder.style.display='none'
    }
    window.localStorage.yesNo=radio;
}
var img=document.getElementById("img");
var timeDiv=document.getElementById('timeDiv');
function filePublishChange() {
    var formData = new FormData();
    formData.append('profile1', $('#file')[0].files[0]);
    formData.append('content',content2.value);
    formData.append('contentA',contentA2.value);
    formData.append('label',labelPut2.value);
    formData.append('postsName',postsName2.value);
    formData.append('reside', user_id);
    formData.append('picture', today());
    formData.append('postsID', article_id);
    $.ajax({
        type: "POST",
        url: "../templates/changePostProfile",
        data: formData,
        dataType:"json",
        contentType: false,
        processData: false,
        success: function(date) {
            tip.innerHTML = "修改成功●ω●"
            shadow2.style.display = "block";
            timeDiv.style.display='block'
            successTip.style.display = "block";
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "user_main.html";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
            console.log(date)
        },
        error: function(data) {
            console.log("出错啦");
        }
    })
}
function nofilePublishChange(){
    $.ajax({
        type:"post",
        url:"http://localhost:8080/ToSkyNews_war_exploded/posts/userUpdatePosts",
        data:{
            content:content2.value,
            contentA:contentA2.value,
            label:labelPut2.value,
            postsName:postsName2.value,
            postsID: article_id,
            picture:today()
        },
        dataType:"json",
        success:function(data){
            tip.innerHTML = "修改成功●ω●"
            shadow2.style.display = "block";
            timeDiv.style.display='block'
            successTip.style.display = "block";
            if(data.message=="success"){
                shadow2.style.display = "block";
                successTip.style.display = "block";
            }
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "user_main.html";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
        },
        err:function(result){
            console.log('出错啦!')
        }
    })
}
function publishBtn_change() {
    if (postsName2.value == '') {
        tip.innerHTML = "文章题目不能为空！！"
        shadow2.style.display = "block";
        successTip.style.display = "block";
    } else if (content2.value == '') {
        tip.innerHTML = "内容不能为空！！"
        shadow2.style.display = "block";
        successTip.style.display = "block";
    } else if (labelPut2.value == '') {
        tip.innerHTML = "标签不能为空！！"
        shadow2.style.display = "block";
        successTip.style.display = "block";
    } else {
        if (window.localStorage.yesNo == '是') {
            filePublishChange()
        }
        if (window.localStorage.yesNo == '否') {
            nofilePublishChange()
        }
    }
}
// 获得头像
if(localStorage.getItem('have_land')=="true") {
    var user_name = document.getElementById('user_name')
    var user_id = localStorage.getItem('user_id');
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
        data: {
            userID: user_id
        },
        success: function (date) {
            var user_img=document.querySelector('.user_img');
            localStorage.setItem('user_name', date.username);
            user_name.innerHTML = date.username;
            // user_img.src=date.picture;
            user_img.style.backgroundImage=`url(${date.picture})`;
        }
    })
}
// 退出登录
function signoutland(){
    localStorage.setItem('have_land',"false");
    window.location.assign("../templates/user_main.html");
}