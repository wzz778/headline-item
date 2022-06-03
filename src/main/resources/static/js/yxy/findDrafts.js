






//草稿箱模糊搜索
var lastInfo=document.querySelector('.lastInfo');
var findBtn=document.querySelector('.findBtn');
var page=document.querySelector('.page');
var findPage=document.querySelector('.findPage');
var btn_1=document.querySelector('.btn_1');
var btn_2=document.querySelector('.btn_2');
var find=document.querySelector('.find');
var list=document.querySelector('.list');
var findAllChoose=document.querySelector('.findAllChoose');
var findCancelAll=document.querySelector('.findCancelAll');
var findMassDelete=document.querySelector('.findMassDelete');
var findDeleteChoose=document.querySelector('.findDeleteChoose');
var findReset=document.querySelector('.findReset');

//获取总页数
var findAllPage=document.querySelector('.findAllPage');
var findDraft=document.querySelector('.findDraft');
// findNum(1);
// function findNum(allNums){
//     $.ajax({
//         type:'post',
//          url:'http://localhost:8080/ToSkyNews_war_exploded/vip/queryVaguePagesYXY',
//          data:{
//              num:6,
//              page:allNums,
//              reside:user_id,
//              thing:findDraft.value
//         },
//         success:function(res){
//             console.log(res.data.总共的页数[0]);
//             findAllPage.innerHTML=res.data.总共的页数[0];
//         },
//         error:function(err){
//             console.log(err);
//         }
//     })
// }


//查询
function findVague(nums){
    var findDraft=document.querySelector('.findDraft');
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/vip/queryVaguePagesYXY',
        data:{
            num:6,
            page:nums,
            reside:user_id,
            thing:findDraft.value
        },
        success:function(res){
            find.innerHTML='';
           console.log(res);
            console.log(res.data.分页模糊查询帖子)
            console.log(res.data.总共的页数[0]);
            console.log(res.data.分页模糊查询帖子.length);
            console.log(res.data.总条数[0]);
            findAllPage.innerHTML=res.data.总共的页数[0];
            for(let i=0;i<res.data.分页模糊查询帖子.length;i++){
                var li=`
                    <li class="draftItem" textID="">
                        <input type="checkbox" class="findChooseBox">
                        <div class="itemContent">
                            <div class="title">${res.data.分页模糊查询帖子[i].postsName}</div>
                            <div class="lastTime">上次修改的时间：<span class="time">2${res.data.分页模糊查询帖子[i].picture}</span></div>
                        </div>
                        <div class="itemHandle">
                            <button class="findItemChange">修改</button>
                            <button class="findItemDelete">删除</button>
                        </div>
                    </li>`
                find.insertAdjacentHTML('beforeend',li);
                var draftItem=document.querySelectorAll('.draftItem');
                var findItemDelete=document.querySelectorAll('.findItemDelete');
                draftItem[i].textID=res.data.分页模糊查询帖子[i].postsID;
                var findChooseBox=document.querySelectorAll('.findChooseBox');
                findChooseBox[i].addEventListener('click',function(){
                    if(findChooseBox[i].hasAttribute('checked')==true){
                        findChooseBox[i].removeAttribute('checked');
                        console.log('移除了');
                    }else{
                        findChooseBox[i].setAttribute('checked','checked');
                        console.log('添加了');
                    }
                })
                // console.log(draftItem[i].textID);
                
            //      findDeleteChoose.addEventListener('click',function(){
            //         var brr=new Array();
            //         var  draftItem=document.querySelectorAll('.draftItem') ;
            //         var findChooseBox=document.querySelectorAll('.findChooseBox');
            //         // sureFade();
            //         // if(brr.length==0){
            //         //     sureAppear('请选择要删除的草稿');
            //         //     successOk.addEventListener('click',function(){
            //         //         sureFade();
            //         //     })
            //         // }else{
            //             chooseAppear("确定要删除吗？");
            //             tipNo.addEventListener('click',function(){
            //                 chooseFade();
            //             })
            //             tipOk.addEventListener('click',function(){
            //                 chooseFade();
            //                 for(let j=0;j<draftItem.length;j++){
            //                     console.log(findChooseBox[i].hasAttribute('checked'));
            //                     if(findChooseBox[i].hasAttribute('checked')==true){
            //                         brr.push(draftItem[i].textID);
            //                         // console.log('我被选择')
            //                     }
            //                     if(brr[i]==undefined){
            //                         brr.slice(i);
            //                     }
            //                 }
            //                 let str='?List<Integer>list=';
            //                 for(let i=0;i<brr.length;i++){
            //                     console.log(brr[i]);
            //                     if(i==brr.length-1){
            //                         str+=brr[i];
            //                     }else{
            //                         str+=brr[i]+'&List<Integer>list=';
            //                     }
                                
            //                 }
            //                 console.log(str);
            //                 $.ajax({
            //                     type:'post',
            //                     url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteBatchPosts'+str,
            //                     // data:{
            //                     // },
            //                     success:function(res_1){
            //                         sureAppear("删除成功！");
            //                         successOk.addEventListener('click',function(){
            //                             sureFade();
            //                         })
            //                         console.log(res_1);
            //                         var findPageNum=document.querySelector('.findPageNum');
            //                         num();
            //                         if(findAllPage.innerHTML*1>=findPageNum.innerHTML*1){
            //                             findVague(findPageNum.innerHTML*1);
            //                             findCancelAll.style.display='none';
            //                             findDeleteChoose.style.display='none';
            //                             findReset.style.display='none';
            //                             lastInfo.style.display='inline-block';
            //                             findAllChoose.style.display='none';
            //                             findMassDelete.style.display='inline-block';
                                       
            //                         }else{
            //                             findVague(findAllPage.innerHTML*1);
            //                             findCancelAll.style.display='none';
            //                             findDeleteChoose.style.display='none';
            //                             findReset.style.display='none';
            //                             findAllChoose.style.display='none';
            //                             findMassDelete.style.display='inline-block';
            //                         }
                                    
            //                     },
            //                     error:function(err){
            //                         console.log(err);
                
            //                     }
            //                 })
            //             })
                        
            //         // } 
                
            // })
                //删除草稿
                setTimeout(function(){
                   var findItemDelete=document.querySelectorAll('.findItemDelete');
                   findItemDelete[i].addEventListener('click',function(e){
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
                                   postsID:draftItem[i].textID
                               },
                               success:function(suc){
                                   console.log(suc);
                                   var findPageNum=document.querySelector('.findPageNum');
                                   var findAllPage=document.querySelector('.findAllPage');
                                   num();
                                   if(findAllPage.innerHTML*1>=findPageNum.innerHTML*1){
                                        findVague(findPageNum.innerHTML*1);
                                   }else{
                                        findVague(findAllPage.innerHTML*1);
                                   }
                                   sureAppear("删除成功！");
                                   successOk.addEventListener('click',function(){
                                       sureFade();
                                   })
                                  //  find.removeChild(draftItem[i]);
                               },
                               error:function(err){
                                   console.log(err);
                               }
                           })
                       })
                   },false)
                    //修改草稿
                   var findItemChange=document.querySelectorAll('.findItemChange');
                   findItemChange[i].addEventListener('click',function(e){
                       e.stopPropagation();
                       localStorage.setItem('article_id',draftItem[i].textID);
                       // localStorage.setItem("tolook", '0');
                       window.location.assign(`../templates/publish-change.html?article_id=${draftItem[i].textID}`);
                   },false)
                },60)
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}

findBtn.addEventListener('click',function(){
    list.style.display='none';
    find.style.display='flex';
    page.style.display='none';
    findPage.style.display='flex';
    btn_1.style.display='none';
    btn_2.style.display='inline-block';
    findVague(1);
    findPageNum.innerHTML=1;
})
// window.onload=function(){
   
// }
var findLastPage=document.querySelector('.findLastPage');
var findNextPage=document.querySelector('.findNextPage');
var findPageNum=document.querySelector('.findPageNum');
findLastPage.addEventListener('click',function(){
    findLastPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        findLastPage.removeAttribute('disabled');
    },100);
    if(findPageNum.innerHTML==1){
        sureAppear("已经是第一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        findPageNum.innerHTML=findPageNum.innerHTML*1-1;
        findVague(findPageNum.innerHTML*1);
        findAllChoose.style.display='none';
        findCancelAll.style.display='none';
        findReset.style.display='none';
        lastInfo.style.display='inline-block';
        findDeleteChoose.style.display='none';
        findMassDelete.style.display='inline-block';
    }
})
findNextPage.addEventListener('click',function(){
    findNextPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        findNextPage.removeAttribute('disabled');
    },100);
    if(findPageNum.innerHTML==findAllPage.innerHTML){
        sureAppear("已经是最后一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        findPageNum.innerHTML=findPageNum.innerHTML*1+1;
        findVague(findPageNum.innerHTML*1);
        findAllChoose.style.display='none';
        findCancelAll.style.display='none';
        findReset.style.display='none';
        lastInfo.style.display='inline-block';
        findDeleteChoose.style.display='none';
        findMassDelete.style.display='inline-block';
    }
})
//搜索页数
var findSearchPage=document.querySelector('.findSearchPage');
var findSure=document.querySelector('.findSure');
var findAllPage=document.querySelector('.findAllPage');
var findSearchPage=document.querySelector('.findSearchPage');
findSure.addEventListener('click',function(){
    if(findSearchPage.value==''){
        sureAppear('请输入要查询的页数');
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else if(findSearchPage.value*1>findAllPage.innerHTML*1||findSearchPage.value*1<=0){
        sureAppear('请输入有效页数');
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        findPageNum.innerHTML=findSearchPage.value;
        findVague(findPageNum.innerHTML*1);
        findAllChoose.style.display='none';
        findCancelAll.style.display='none';
        findReset.style.display='none';
        lastInfo.style.display='inline-block';
        findDeleteChoose.style.display='none';
        findMassDelete.style.display='inline-block';                        
    }
})

//返回草稿箱列表
lastInfo.addEventListener('click',function(){
    find.style.display='none';
    list.style.display='flex'
    page.style.display='flex';
    findPage.style.display='none';
    btn_1.style.display='inline-block';
    btn_2.style.display='none';
    cancelAll.style.display='none';
    deleteChoose.style.display='none';
    reset.style.display='none';
    allChoose.style.display='none';
    massDelete.style.display='inline-block';
    var chooseBox=document.querySelectorAll('.chooseBox');
    for(let i=0;i<chooseBox.length;i++){
        chooseBox[i].style.display='none';
        chooseBox[i].removeAttribute('checked');
    }
})
   

    
