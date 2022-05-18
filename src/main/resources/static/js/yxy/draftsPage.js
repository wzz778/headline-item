var allChoose=document.querySelector('.allChoose');
var check=document.querySelectorAll('.check');
var cancelAll=document.querySelector('.cancelAll');
var massDelete=document.querySelector('.massDelete');
var reset=document.querySelector('.reset');
var user_id=localStorage.getItem('user_id');
var list=document.querySelector('.list');
massDelete.addEventListener('click',function(){
    allChoose.style.display='inline-block';
    cancelAll.style.display='inline-block';
    reset.style.display='inline-block';
})
allChoose.addEventListener('click',function(){
    for(let i=0;i<check.length;i++){
        check[i].setAttribute('checked','checked');
    }
})
cancelAll.addEventListener('click',function(){
    for(let i=0;i<check.length;i++){
        check[i].removeAttribute('checked');
    }
})
reset.addEventListener('click',function(){
    allChoose.style.display='none';
    cancelAll.style.display='none';
    reset.style.display='none';
})
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
        for(let i=0;i<res.length;i++){
            var li=`
                <li class="draftItem">
                    <input type="checkbox" class="check"/>
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
        }
    }
})