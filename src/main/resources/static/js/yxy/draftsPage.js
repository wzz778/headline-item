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

//页数
//总页数
var empty=document.querySelector('.empty');
num();
function num(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/drafts',
        data:{
            reside:user_id
        },
        success:function(res){
            console.log(res.data.length);
            if(res.data.length%6==0){
                allPage.innerHTML=res.data.length/6; 
            }else if(res.data.length==0){
                list.style.display='none';
                empty.style.display='flex';
            }else if(res.data.length%6!=0){
                allPage.innerHTML=Math.ceil(res.data.length/6);
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}

var pageNum=document.querySelector('.pageNum');
var lastPage=document.querySelector('.lastPage');
var nextPage=document.querySelector('.nextPage');
var allPage=document.querySelector('.allPage');
var deleteChoose=document.querySelector('.deleteChoose');
lastPage.addEventListener('click',function(){
    lastPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        lastPage.removeAttribute('disabled');
    },100);
    if(pageNum.innerHTML==1){
        sureAppear("已经是第一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        pageNum.innerHTML=pageNum.innerHTML*1-1;
        draftsContent((pageNum.innerHTML*1-1)*6);
    }
})
nextPage.addEventListener('click',function(){
    nextPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        nextPage.removeAttribute('disabled');
    },100);
    if(pageNum.innerHTML==allPage.innerHTML){
        sureAppear("已经是最后一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        pageNum.innerHTML=pageNum.innerHTML*1+1;
        draftsContent((pageNum.innerHTML*1-1)*6);
    }
})

//渲染草稿箱内容
draftsContent(0);
function draftsContent(num){
    list.innerHTML='';
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/disDrafts',
        data:{
            count:6,
            reside:user_id,
            start:num,
            status:-2
        },
        success:function(res){
            console.log(res);
            for(let i=0;i<res.data.length;i++){
                var li=`
                    <li class="draftItem" textID="">
                        <input type="checkbox" class="chooseBox">
                        <div class="itemContent">
                            <div class="title">${res.data[i].postsName}</div>
                            <div class="lastTime">上次修改的时间：<span class="time">2${res.data[i].picture}</span></div>
                        </div>
                        <div class="itemHandle">
                            <button class="itemChange">修改</button>
                            <button class="itemDelete">删除</button>
                        </div>
                    </li>`
                list.insertAdjacentHTML('beforeend',li);
                var draftItem=document.querySelectorAll('.draftItem');
                var itemDelete=document.querySelectorAll('.itemDelete');
                draftItem[i].textID=res.data[i].postsID;
                // console.log(draftItem[i].textID);
                //获取页数
                num();
                function num(){
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/user/drafts',
                        data:{
                            reside:user_id
                        },
                        success:function(res){
                            console.log(res.data.length);
                            if(res.data.length%6==0){
                                allPage.innerHTML=res.data.length/6; 
                            }else if(res.data.length==0){
                                list.style.display='none';
                                empty.style.display='flex';
                            }else if(res.data.length%6!=0){
                                allPage.innerHTML=Math.ceil(res.data.length/6);
                            }
                        },
                        error:function(err){
                            console.log(err);
                        }
                    })
                }
                //操作
                var chooseBox=document.querySelectorAll('.chooseBox');
                massDelete.addEventListener('click',function(){
                    massDelete.style.display='none';
                    deleteChoose.style.display='block';
                    itemDelete[i].style.display='none';
                    allChoose.style.display='inline-block';
                    cancelAll.style.display='inline-block';
                    reset.style.display='inline-block';
                    for(let i=0;i<chooseBox.length;i++){
                        chooseBox[i].style.display='inline-block';
                    }
                })
                allChoose.addEventListener('click',function(){
                    for(let i=0;i<chooseBox.length;i++){
                        chooseBox[i].setAttribute('checked',true);
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
                    deleteChoose.style.display='none';
                    massDelete.style.display='block';
                    itemDelete[i].style.display='inline-block';
                    for(let i=0;i<chooseBox.length;i++){
                        chooseBox[i].removeAttribute('checked');
                        chooseBox[i].style.display='none';
                    }
                })
                chooseBox[i].addEventListener('click',function(){
                    if(chooseBox[i].hasAttribute('checked')==true){
                        chooseBox[i].removeAttribute('checked');
                    }else{
                        chooseBox[i].setAttribute('checked',true);
                    }
                    
                })
               
                //删除草稿
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
                                postsID:draftItem[i].textID
                            },
                            success:function(suc){
                                console.log(suc);
                                var pageNum=document.querySelector('.pageNum');
                                num();
                                if(allPage.innerHTML*1>=pageNum.innerHTML*1){
                                    draftsContent((pageNum.innerHTML*1-1)*6);
                                }else{
                                    draftsContent((allPage.innerHTML*1-1)*6);
                                }
                                sureAppear("删除成功！");
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
                //修改草稿
                var itemChange=document.querySelectorAll('.itemChange');
                itemChange[i].addEventListener('click',function(e){
                    e.stopPropagation();
                    localStorage.setItem('article_id',draftItem[i].textID);
                    // localStorage.setItem("tolook", '0');
                    window.location.assign("../templates/publish-change.html");
                },false)
            }
        },
        error:function(err){
            console.log(err);
        }
    })    
}

 //批量删除草稿
window.onload=function(){
    // function onclickFun(){
        deleteChoose.addEventListener('click',function(){
                var arr=new Array();
                var  draftItem=document.querySelectorAll('.draftItem') ;
                var chooseBox=document.querySelectorAll('.chooseBox');
                for(let j=0;j<draftItem.length;j++){
                    console.log(chooseBox[j].hasAttribute('checked'));
                    if(chooseBox[j].hasAttribute('checked')==true){
                        arr.push(draftItem[j].textID);
                        // console.log('我被选择')
                    }
                    if(arr[j]==undefined){
                        arr.slice(j);
                    }
                    
                }
            
                sureFade();
                if(arr.length==0){
                    sureAppear('请选择要删除的草稿');
                    successOk.addEventListener('click',function(){
                        sureFade();
                    })
                }else{
                    chooseAppear("确定要删除吗？");
                    tipNo.addEventListener('click',function(){
                        chooseAppear();
                    })
                    tipOk.addEventListener('click',function(){
                        chooseFade();
                        let str='?List<Integer>list=';
                        for(let i=0;i<arr.length;i++){
                            console.log(arr[i]);
                            if(i==arr.length-1){
                                str+=arr[i];
                            }else{
                                str+=arr[i]+'&List<Integer>list=';
                            }
                            console.log(str);
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteBatchPosts'+str,
                                // data:{
                                // },
                                success:function(res_1){
                                    console.log(res_1);
                                    sureAppear("删除成功！");
                                    successOk.addEventListener('click',function(){
                                        sureFade();
                                    })
                                    var pageNum=document.querySelector('.pageNum');
                                    num();
                                    if(allPage.innerHTML*1>=pageNum.innerHTML*1){
                                        draftsContent((pageNum.innerHTML*1-1)*6);
                                    }else{
                                        draftsContent((allPage.innerHTML*1-1)*6);
                                    }
                                    
                                },
                                error:function(err){
                                    console.log(err);
                
                                }
                            })
                            
                        }
                    })
                    
                } 
            
        })
       //搜索页数
       var searchPage=document.querySelector('.searchPage');
       var sure=document.querySelector('.sure');
       sure.addEventListener('click',function(){
           if(searchPage.value==''){
               sureAppear('请输入要查询的页数');
               successOk.addEventListener('click',function(){
                   sureFade();
               })
           }else if(searchPage.value*1>allPage.innerHTML*1||searchPage.value*1<=0){
               sureAppear('请输入有效页数');
               successOk.addEventListener('click',function(){
                   sureFade();
               })
           }else{
               list.innerHTML='';
               pageNum.innerHTML=searchPage.value;
               draftsContent((pageNum.innerHTML*1-1)*6);
           }
       })
     
}
//草稿箱模糊搜索
var findBtn=document.querySelector('.findBox');
var findDraft=document.querySelector('.findDraft');
findBtn.addEventListener('click',function(){
    //  $.ajax({
    //      type:'post',
    //      url:'http://localhost:8080/ToSkyNews_war_exploded/vip/queryVaguePagesYXY',
    //      data:{
    //          num:6,
    //          page:1,
    //          reside:user_id,
    //          thing:findDraft.value
    //      },
    //      success:function(res){
    //          console.log(res.data.总共的页数:[0]);
            //  for(let i=0;i<res.data.length;i++){
            //      var li=`
            //          <li class="draftItem" textID="">
            //              <input type="checkbox" class="chooseBox">
            //              <div class="itemContent">
            //                  <div class="title">${res.data[i].postsName}</div>
            //                  <div class="lastTime">上次修改的时间：<span class="time">2${res.data[i].picture}</span></div>
            //              </div>
            //              <div class="itemHandle">
            //                  <button class="itemChange">修改</button>
            //                  <button class="itemDelete">删除</button>
            //              </div>
            //          </li>`
            //      list.insertAdjacentHTML('beforeend',li);
            //      var draftItem=document.querySelectorAll('.draftItem');
            //      var itemDelete=document.querySelectorAll('.itemDelete');
            //      draftItem[i].textID=res.data[i].postsID;
            //      // console.log(draftItem[i].textID);
            //      //获取页数
            //      num();
            //      function num(){
            //          $.ajax({
            //              type:'post',
            //              url:'http://localhost:8080/ToSkyNews_war_exploded/user/drafts',
            //              data:{
            //                  reside:user_id
            //              },
            //              success:function(res){
            //                  console.log(res.data.length);
            //                  if(res.data.length%6==0){
            //                      allPage.innerHTML=res.data.length/6; 
            //                  }else if(res.data.length==0){
            //                      list.style.display='none';
            //                      empty.style.display='flex';
            //                  }else if(res.data.length%6!=0){
            //                      allPage.innerHTML=Math.ceil(res.data.length/6);
            //                  }
            //              },
            //              error:function(err){
            //                  console.log(err);
            //              }
            //          })
            //      }
            //      //操作
            //      var chooseBox=document.querySelectorAll('.chooseBox');
            //      massDelete.addEventListener('click',function(){
            //          massDelete.style.display='none';
            //          deleteChoose.style.display='block';
            //          itemDelete[i].style.display='none';
            //          allChoose.style.display='inline-block';
            //          cancelAll.style.display='inline-block';
            //          reset.style.display='inline-block';
            //          for(let i=0;i<chooseBox.length;i++){
            //              chooseBox[i].style.display='inline-block';
            //          }
            //      })
            //      allChoose.addEventListener('click',function(){
            //          for(let i=0;i<chooseBox.length;i++){
            //              chooseBox[i].setAttribute('checked',true);
            //          }
            //      })
            //      cancelAll.addEventListener('click',function(){
            //          for(let i=0;i<chooseBox.length;i++){
            //              chooseBox[i].removeAttribute('checked');
            //          }
            //      })
            //      reset.addEventListener('click',function(){
            //          allChoose.style.display='none';
            //          cancelAll.style.display='none';
            //          reset.style.display='none';
            //          deleteChoose.style.display='none';
            //          massDelete.style.display='block';
            //          itemDelete[i].style.display='inline-block';
            //          for(let i=0;i<chooseBox.length;i++){
            //              chooseBox[i].removeAttribute('checked');
            //              chooseBox[i].style.display='none';
            //          }
            //      })
            //      chooseBox[i].addEventListener('click',function(){
            //          if(chooseBox[i].hasAttribute('checked')==true){
            //              chooseBox[i].removeAttribute('checked');
            //          }else{
            //              chooseBox[i].setAttribute('checked',true);
            //          }
                     
            //      })
                
            //      //删除草稿
            //      itemDelete[i].addEventListener('click',function(e){
            //          e.stopPropagation();
            //          chooseAppear("确定要删除吗？");
            //          tipNo.addEventListener('click',function(){
            //              chooseFade();
            //          })
            //          tipOk.addEventListener('click',function(){
            //              chooseFade();
            //              $.ajax({
            //                  type:'post',
            //                  url:'http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts',
            //                  data:{
            //                      postsID:draftItem[i].textID
            //                  },
            //                  success:function(suc){
            //                      console.log(suc);
            //                      var pageNum=document.querySelector('.pageNum');
            //                      num();
            //                      if(allPage.innerHTML*1>=pageNum.innerHTML*1){
            //                          draftsContent((pageNum.innerHTML*1-1)*6);
            //                      }else{
            //                          draftsContent((allPage.innerHTML*1-1)*6);
            //                      }
            //                      sureAppear("删除成功！");
            //                      successOk.addEventListener('click',function(){
            //                          sureFade();
            //                      })
            //                      list.removeChild(draftItem[i]);
            //                  },
            //                  error:function(err){
            //                      console.log(err);
            //                  }
            //              })
            //          })
            //      },false)
            //      //修改草稿
            //      var itemChange=document.querySelectorAll('.itemChange');
            //      itemChange[i].addEventListener('click',function(e){
            //          e.stopPropagation();
            //          localStorage.setItem('article_id',draftItem[i].textID);
            //          // localStorage.setItem("tolook", '0');
            //          window.location.assign("../templates/publish-change.html");
            //      },false)
            //  }
        //  },
    //      error:function(err){
    //          console.log(err);
    //      }
    //  })
})