var allChoose=document.querySelector('.allChoose');
var cancelAll=document.querySelector('.cancelAll');
var massDelete=document.querySelector('.massDelete');
var reset=document.querySelector('.reset');
var user_id=localStorage.getItem('user_id');
var list=document.querySelector('.list');
var tipText=document.querySelector('.tipText');
var tip=document.querySelector('.tip');
var tipOk=document.querySelector('.tipOk');
var tipNo=document.querySelector('.tipNo');
var successOk=document.querySelector('.successOk');
//弹窗
var chooseCover=document.querySelector('.chooseCover');
function chooseAppear(text){
    tipText.innerHTML=text;
    chooseCover.style.display='flex';
    chooseCover.style.opacity=1;
    tip.style.height='200px';
}
function chooseFade(){
    chooseCover.style.display='none';
    chooseCover.style.opacity=0;
    tip.style.height='0px';
}
var sureCover=document.querySelector('.sureCover');
var successText=document.querySelector('.successText');
var successTip=document.querySelector('.successTip');
function sureAppear(text){
    successText.innerHTML=text;
    sureCover.style.display='flex';
    sureCover.style.opacity=1;
    successTip.style.height='200px';
}
function sureFade(){
    sureCover.style.display='none';
    sureCover.style.opacity=0;
    successTip.style.height='0px';
}
//渲染草稿箱内容
$.ajax({
    type:'post',
    url:'http://localhost:8080/ToSkyNews_war_exploded/user/disDrafts',
    data:{
        count:6,
        reside:user_id,
        start:0,
        status:-2
    },
    success:function(res){
        console.log(res);
        for(let i=0;i<res.data.length;i++){
            var li=`
                <li class="draftItem" postsID=${res.data[i].postsID}>
                    <input type="checkbox" class="chooseBox"/>
                    <div class="itemContent">
                        <div class="title">${res.data[i].postsName}</div>
                        <div class="lastTime">上次修改的时间：<span class="time">2${res.data[i].picture}</span></div>
                    </div>
                    <div class="itemHandle">
                        <button class="itemDelete">删除</button>
                        <button class="itemChange">修改</button>
                    </div>
                </li>`
            list.insertAdjacentHTML('beforeend',li);
            var draftItem=document.querySelectorAll('.draftItem');
            //操作
            var chooseBox=document.querySelectorAll('.chooseBox');
            massDelete.addEventListener('click',function(){
                allChoose.style.display='inline-block';
                cancelAll.style.display='inline-block';
                reset.style.display='inline-block';
                for(let i=0;i<chooseBox.length;i++){
                    chooseBox[i].style.display='inline-block';
                }
            })
            allChoose.addEventListener('click',function(){
                for(let i=0;i<chooseBox.length;i++){
                    chooseBox[i].setAttribute('checked','checked');
                }
            })
            cancelAll.addEventListener('click',function(){
                for(let i=0;i<chooseBox.length;i++){
                    chooseBox[i].removeAttribute('checked');
                }
            })
            reset.addEventListener('click',function(){
                allChoose.style.display='none';
                cancelAll.style.display='none';
                reset.style.display='none';
                for(let i=0;i<chooseBox.length;i++){
                    chooseBox[i].style.display='none';
                }
            })
            var itemDelete=document.querySelectorAll('.itemDelete');
            itemDelete[i].addEventListener('click',function(e){
                e.stopPropagation();
                chooseAppear("确定要删除吗？");
                tipNo.addEventListener('click',function(){
                    chooseFade();
                })
                tipOk.addEventListener('click',function(){
                    chooseFade();
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts',
                        data:{
                            postsID:draftItem[i].postsID
                        },
                        success:function(res){
                            // console.log(res);
                            sureAppear("确认要删除吗?");
                            successOk.addEventListener('click',function(){
                                sureFade();
                            })
                            list.removeChild(draftItem[i]);
                        },
                        error:function(err){
                            console.log(err);
                        }
                    })
                })
            },false)
        }
    },
    error:function(err){
        console.log(err);
    }
})

