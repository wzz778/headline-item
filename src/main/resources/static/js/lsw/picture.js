var list = document.querySelectorAll('li');
for (let i = 0; i < list.length; i++) {
    list[i].onmouseover = function () {
        list[i].style.backgroundColor = 'black'
    }
    list[i].onmouseout = function () {
        list[i].style.backgroundColor = ''
    }
}

var list1 = document.querySelector('#leftNav_li').querySelectorAll('li')
var items = document.querySelectorAll('.item')
for (var i = 0; i < list1.length; i++) {
    list1[i].onclick = function () {
        for (var i = 0; i < list1.length; i++) {
            list1[i].className = ''
        }
        this.className = 'current';

        var index = this.getAttribute('index');
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none'
        }
        items[index].style.display = 'block';
    }
}
if(localStorage.getItem('have_land')=="true") {
    var user_img=document.querySelector('.user_img');
    var user_name = document.getElementById('user_name');
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
function goUser(){
    location.href = "myPage.html";
}
function goUser1(){
    location.href = "myPage.html";
}
var user_id=localStorage.getItem('user_id');
var userAgent = navigator.userAgent; //用于判断浏览器类型
$(".file").change(function() {
    var docObj = $(this)[0];
    var picDiv = $(this).parents(".picDiv");
    // 得到所有的图片文件
    var fileList = docObj.files;
    //循环遍历
    for (var i = 0; i < fileList.length; i++) {
        //动态添加html元素
        var picHtml = "<div class='imageDiv' nm='"+fileList[i].name+"'> <img id='img" + fileList[i].name + "' /> <div class='cover'><i class='delbtn'>删除</i></div></div>";
        console.log(picHtml);
        picDiv.prepend(picHtml);
        //获取图片imgi的对象
        var imgObjPreview = document.getElementById("img" + fileList[i].name);
        if (fileList && fileList[i]) {
            //图片属性
            imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = '140px';
            imgObjPreview.style.height = '130px';
            if (userAgent.indexOf('MSIE') == -1) {
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径;
                console.log(imgObjPreview.src);
            } else {
                if (docObj.value.indexOf(",") != -1) {
                    var srcArr = docObj.value.split(",");
                    imgObjPreview.src = srcArr[i];
                } else {
                    imgObjPreview.src = docObj.value;
                }
            }
        }
    }
})
// 上传图片
var sure = document.getElementById('sure');
let shadow2 = document.getElementById('label-silder-shadow')
let successTip = document.getElementById('successTip');
var tip=document.getElementById('tip')
sure.onclick=function(){
    shadow2.style.display = "none";
    successTip.style.display = "none";
}
var aa=document.getElementById('aa');
var fileBtn=document.querySelector('#fileBtn');
fileBtn.onclick=function(){
    var formData = new FormData();
    formData.append("profile",$('#file')[0].files[0]);
    formData.append('userID',user_id)
    formData.append('userDepiction','人物')
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/img/getImgProfile',
        dataType:'json',
        data:formData,
        cache: false,
        processData: false,
        contentType: false,
        success:function(data){
            if(data.code==10000){
                shadow2.style.display='block';
                successTip.style.display='block';
            }
            console.log(data)
        }
    })
}
var status_li=document.querySelector('#status').querySelectorAll('li');
var all_sort1 = ["全部","已审核","未审核"];
status_li[0].className = 'statusColor';
for (let i in status_li) {
    status_li[i].onclick = function () {
        let sort1 = status_li[i].innerHTML;
        for (let i = 0; i < status_li.length; i++) {
            status_li[i].className = ''
        }
        this.className = 'statusColor';
        window.localStorage.sort1=sort1;
        page.value=1
        aa.innerText=page.value;
        num();
        passPicture();
        auditingPicture();

    }
}
// 未审核的分页
auditingPicture()
function auditingPicture(){
    if(all_sort1[0]==window.localStorage.sort1){
        pictureAllNum()
    }
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*10;
    if(all_sort1[2]==window.localStorage.sort1) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/statusPicture',
            data: {
                start: pager,
                userID: user_id,
                status: 0
            },
            dataType: 'json',
            success: function (data) {
                rightCenter2.innerHTML = null
                for (let i = 0; i < data.data.length; i++) {
                    rightCenter2.innerHTML += `
                <div class="imgsDiv">
                    <img class="imgs" src='${data.data[i].userImg}' width="140px;height:120px">
                </div>
            `
                }
            },
            err: function (err) {
                console.log(err);
            }
        })
    }
}
// 审核通过的分页
passPicture();
function passPicture(){
    if(all_sort1[0]==window.localStorage.sort1){
        pictureAllNum()
    }
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*10;
    if(all_sort1[1]==window.localStorage.sort1) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/statusPicture',
            data: {
                start: pager,
                userID: user_id,
                status: 1
            },
            dataType: 'json',
            success: function (data) {
                rightCenter2.innerHTML = null
                for (let i = 0; i < data.data.length; i++) {
                    rightCenter2.innerHTML += `
                <div class="imgsDiv">
                    <img class="imgs" src='${data.data[i].userImg}' width="140px;height:120px">
                </div>
            `
                }
            },
            err: function (err) {
                console.log(err);
            }
        })
    }
}
// 全部的分页
pictureAllNum();
function pictureAllNum(){
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*10;
    $.ajax({
        type:'get',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allUserPicture',
        data:{
            start:pager,
            userID:user_id
        },
        dataType: 'json',
        success:function(data){
            rightCenter2.innerHTML=null
            for(let i=0;i<data.data.length;i++){
                rightCenter2.innerHTML +=`
                <div class="imgsDiv">
                    <img class="imgs" src='${data.data[i].userImg}' width="140px;height:120px">
                </div>
            `
            }
        },
        err:function(err){
            console.log(err);
        }
    })
}
// 未审核的数量
auditingPictureNum();
function auditingPictureNum(){
    $.ajax({
        type:'get',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allAuditingPicture',
        data:{
            userID: user_id,
        },
        dataType: 'json',
        success:function(data){
            window.localStorage.totalNum=data.data.length;
            // console.log(data.data.length)
        },
        err:function(err){
            console.log(err);
        }
    })
}
// 审核通过的数量
passPictureNum();
function passPictureNum(){
    $.ajax({
        type:'get',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allPassPicture',
        data:{
            userID: user_id,
        },
        dataType: 'json',
        success:function(data){
            window.localStorage.totalNum=data.data.length;
            // console.log(data.data.length);
        },
        err:function(err){
            console.log(err);
        }
    })
}

// 获取三种状态的数量
function num(){
    if(all_sort1[1]==window.localStorage.sort1){
        passPictureNum();
        paging()
        console.log(Math.ceil(window.localStorage.totalNum/10))
    }
    if(all_sort1[2]==window.localStorage.sort1){
        auditingPictureNum();
        paging()
        console.log(Math.ceil(window.localStorage.totalNum/10))
    }
    if(all_sort1[0]==window.localStorage.sort1){
        window.localStorage.totalNum=34;
        paging()
        console.log(Math.ceil(window.localStorage.totalNum/10))
    }
}
function statusPicture(){
    if(all_sort1[1]==window.localStorage.sort1){
        passPicture();
    }
    if(all_sort1[2]==window.localStorage.sort1){
        auditingPicture()
    }
    if(all_sort1[0]==window.localStorage.sort1){
        pictureAllNum()
    }
}
// 为三种状态绑定下一页，上一页
function paging() {
    var totalPage = Math.ceil(window.localStorage.totalNum / 10)
    ago.onclick = function () {
        var n = parseInt(page.value);
        if (n > 1 && n <= totalPage) {
            page.value -= 1;
            aa.innerText = page.value;
        }
        statusPicture();
    }
    next.onclick = function () {
        var n = parseInt(page.value);
        if (n > 0 && n <= totalPage) {
            page.value++;
            if (page.value > totalPage) {
                page.value = 1
            }
            aa.innerText = page.value;
        }
        statusPicture();
    }
}

