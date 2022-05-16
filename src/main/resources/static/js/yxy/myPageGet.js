var userName=document.querySelectorAll('.userName');
var briefText=document.querySelector('.briefText');
var myWorksNav=document.querySelector('.myWorksNav');
var collectWorkNav=document.querySelector('.collectWorkNav');
var haveWorks=document.querySelector('.haveWorks');
var empty=document.querySelector('.empty');
var user_id=localStorage.getItem('user_id');
var tip=document.querySelector('.tip');
var deleteText=document.querySelectorAll('.deleteText')
var tipOk=document.querySelector('.tipOk');
var tipNo=document.querySelector('.tipNo');
var successTip=document.querySelector('.successTip');
var successOk=document.querySelector('.successOk');
var workTitle=document.querySelectorAll('.workTitle');
var tipText=document.querySelector('.tipText');
var successText=document.querySelector('.successText');
var account=document.querySelector('.account');
var haveWorks=document.querySelector('.haveWorks');
var userHead=document.querySelector('.userHead');
var workNum=document.querySelector('.workNum');
var collectNum=document.querySelector('.collectNum');
var moreWorks=document.querySelector('.moreWorks');
window.addEventListener('scroll',function(){
    console.log(moreWorks.offsetTop);
})
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
num();
function num(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionByUserID',
        data:{
            userID:user_id
        },
        success:function(suc_1){
             collectNum.innerHTML=suc_1.length;
        },
        error:function(err){
            // console.log(err);
        }
    })
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/allCountPosts',
        data:{
            reside:user_id
        },
        success:function(suc_1){
            //  console.log(suc_1);
             workNum.innerHTML=suc_1;
             
        },
        error:function(err){
            // console.log(err);
        }
    })
}

//用户自己的帖子
function getMyWorks(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByUserID',
        data:{
            userID:user_id
        },
        success:function(res){
            console.log(res);
            if(res.length==0){
                empty.style.display='flex';
                noWork.innerHTML='暂无作品';
            }else{
                empty.style.display='none';
                for(let i=0;i<res.length;i++){
                    var works=`
                    <div class="worksItem">
                        <div class="workTitle" textID=""></div>
                        <div class="footer">
                            <span class="read"><span class="readNum">0</span>阅读</span>
                            <span class="discuss"><span class="discussNum">0</span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                            <span class="textTime"><span class="timeNum">0分钟</span></span>
                            <span class="status">未审核</span>
                            <div class="handle"><span class="deleteText">删除</span><span class="changeText">修改</span><span class="collect">收藏</span></div>
                        </div>
                    </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);
                    setTimeout(function(){
                        var workTitle=document.querySelectorAll('.workTitle');
                        var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                        var status=document.querySelectorAll('.status');
                        var timeNum=document.querySelectorAll('.timeNum');
                        var deleteText=document.querySelectorAll('.deleteText');
                        var worksItem=document.querySelectorAll('.worksItem');
                        var readNum=document.querySelectorAll('.readNum');
                        var collect=document.querySelectorAll('.collect');
                        workTitle[i].innerHTML=res[i].postsName;
                        workTitle[i].textID=res[i].postsID;
                        if(res[i].alike<10000){
                            giveLikeNum[i].innerHTML=res[i].alike; 
                        }else{
                            var x=(res[i].alike/10000).toFixed(2);
                            giveLikeNum[i].innerHTML=`${x}万`;
                        }
                        timeNum[i].innerHTML=res[i].picture;
                        if(res[i].browse<10000){
                            readNum[i].innerHTML=res[i].browse;     
                        }else{
                            var x=(res[i].browse/10000).toFixed(2);
                            readNum[i].innerHTML=`${x}万`;
                        }
                        //评论数量
                        var discussNum=document.querySelectorAll('.discussNum');
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                            data:{
                                postsID:workTitle[i].textID
                            },
                            success:function(suc_1){
                                //  console.log(suc_1);
                                if(suc_1<10000){
                                    discussNum[i].innerHTML=suc_1;       
                                }else{
                                    var x=(suc_1/10000).toFixed(2);
                                    discussNum[i].innerHTML=`${x}万`;
                                }
                            },
                            error:function(err){
                                // console.log(err);
                            }
                        })
                        //  判断是否已经收藏帖子
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                            data:{
                                postsID:workTitle[i].textID,
                                userID:user_id
                            },
                            success:function(suc){
                                // console.log(suc);
                                if(suc.code==-1){
                                    collect[i].innerHTML='取消收藏';
                                }else{
                                    collect[i].innerHTML='收藏';
                                }
                            },
                            error:function(err){
                                // console.log(err);
                            }
                        })
                        if(res[i].status==1){
                            status[i].style.display='none';
                        }else if(res[i].status==-1){
                            status[i].style.display='block';
                            status[i].innerHTML='未过审';
                        }else if(res[i].status==0){
                            status[i].innerHTML='未审核';
                        }
                        
                         //跳转到文章显示页面
                         worksItem[i].addEventListener('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                data:{
                                    postsID:workTitle[i].textID
                                },
                                success:function(suc_1){
                                    // console.log(suc_1);
                                },
                                error:function(err){
                                    // console.log(err);
                                }
                            })
                            localStorage.setItem('article_id',workTitle[i].textID);
                            localStorage.setItem("tolook", '0');
                            window.location.assign("../templates/recomments.html");
                        })
                        //删除帖子(阻止了冒泡)
                        deleteText[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            chooseAppear("确定要删除吗？")
                            tipNo.addEventListener('click',function(){
                                chooseFade();
                            })
                            tipOk.addEventListener('click',function(){
                                chooseFade();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts',
                                    data:{
                                        postsID:workTitle[i].textID
                                    },
                                    success:function(res){
                                        // console.log(res);
                                        sureAppear("确定要删除吗？");
                                        successOk.addEventListener('click',function(){
                                            sureFade();
                                        })
                                        haveWorks.removeChild(worksItem[i]);
                                        num();
                                    },
                                    error:function(err){
                                        // console.log(err);
                                    }
                                })
                            })
                        },false)
                        
                        var collect=document.querySelectorAll('.collect');
                        
                        collect[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            //用户收藏自己的帖子
                            if(res[i].status==0){
                                sureAppear("帖子未审核，无法收藏");
                                successOk.addEventListener('click',function(){
                                    sureFade();
                                })
                            }else if(res[i].status==-1){
                                sureAppear("帖子未通过审核，无法收藏");
                                successOk.addEventListener('click',function(){
                                    sureFade();
                                })
                            }else if(res[i].status==1){
                                if(collect[i].innerHTML=='收藏'){
                                    chooseAppear("确定要收藏吗？");
                                    tipNo.addEventListener('click',function(){
                                        chooseFade();
                                    })
                                    tipOk.addEventListener('click',function(){
                                        chooseFade();
                                        $.ajax({
                                            type:'post',
                                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                            data:{
                                                postsID:workTitle[i].textID,
                                                userID:user_id
                                            },
                                            success:function(res){
                                                // console.log(res);
                                                collect[i].innerHTML='取消收藏';
                                                num();
                                            },
                                            error:function(err){
                                                // console.log(err);
                                            }
                                        })
                                    })
                                }else{
                                    chooseAppear("确定要取消收藏吗?");
                                    tipOk.addEventListener('click',function(){
                                        chooseFade();
                                        $.ajax({
                                            type:'post',
                                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                            data:{
                                                postsID:workTitle[i].textID,
                                                userID:user_id
                                            },
                                            success:function(suc){
                                                // console.log(suc);
                                                collect[i].innerHTML='收藏';
                                                num();
                                                
                                            },
                                            error:function(fal){
                                                // console.log(fal);
                                            }
                                        })
                                    })
                                    tipNo.addEventListener('click',function(){
                                        chooseFade();
                                    })
                                }
        
                            }
                            
                        },false)
                        //跳转到修改页面
                        var changeText=document.querySelectorAll('.changeText');
                        changeText[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            localStorage.setItem('article_id',workTitle[i].textID);
                            localStorage.setItem("tolook", '0');
                            window.location.assign("../templates/publish-change.html");
                        },false)
                    },100)
                    
                }
            }
        },
        error:function(err){
            // console.log(err);
        }
    })
}
//用户收藏的帖子
function getLoveWorks(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionByUserID',
        data:{
            userID:user_id
        },
        success:function(res){
            // console.log(res);
            if(res.length==0){
                empty.style.display='flex';
                noWork.innerHTML='暂无作品';
            }else{
                empty.style.display='none';
                for(let i=0;i<res.length;i++){
                    var works=`
                    <div class="worksItem">
                        <div class="workTitle" textID=""></div>
                        <div class="footer">
                            <span class="read"><span class="readNum"></span>阅读</span>
                            <span class="discuss"><span class="discussNum"></span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum"></span>点赞</span>
                            <span class="textTime"><span class="timeNum"></span></span>
                            <span class="cancelLove">取消收藏</span>
                        </div>
                    </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);
                      //获取帖子内容
                      setTimeout(function(){
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByID',
                            data:{
                                postsID:res[i].postsID
                            },
                            success:function(suc){
                                // console.log(suc);
                                var worksItem=document.querySelectorAll('.worksItem');
                                var workTitle=document.querySelectorAll('.workTitle');
                                var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                                var timeNum=document.querySelectorAll('.timeNum');
                                workTitle[i].innerHTML=suc.postsName;
                                workTitle[i].textID=suc.postsID;
                                var readNum=document.querySelectorAll('.readNum');
                                if(suc.alike<10000){
                                    giveLikeNum[i].innerHTML=suc.alike; 
                                }else{
                                    var x=(suc.alike/10000).toFixed(2);
                                    giveLikeNum[i].innerHTML=`${x}万`;
                                }
                                timeNum[i].innerHTML=suc.picture;
                                if(suc.browse<10000){
                                    readNum[i].innerHTML=suc.browse; 
                                }else{
                                    var x=(suc.browse/10000).toFixed(2);
                                    readNum[i].innerHTML=`${x}万`;
                                }
                                //评论数量
                                var discussNum=document.querySelectorAll('.discussNum');
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                                    data:{
                                        postsID:workTitle[i].textID
                                    },
                                    success:function(suc_2){
                                        // console.log(suc_2);
                                        if(suc_2<10000){
                                            discussNum[i].innerHTML=suc_2;       
                                        }else{
                                            var x=(suc_2/10000).toFixed(2);
                                            discussNum[i].innerHTML=`${x}万`;
                                        }
                                    },
                                    error:function(err){
                                        // console.log(err);
                                    }
                                })
                                //跳转到文章显示页面
                                worksItem[i].addEventListener('click',function(){
                                    $.ajax({
                                        type:'post',
                                        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                        data:{
                                            postsID:workTitle[i].textID
                                        },
                                        success:function(suc_1){
                                            // console.log(suc_1);
                                        },
                                        error:function(err){
                                            // console.log(err);
                                        }
                                    })
                                    localStorage.setItem('article_id',workTitle[i].textID);
                                    localStorage.setItem("tolook", '0');
                                    window.location.assign("../templates/recomments.html");
                                })
                                // 取消收藏
                                var cancelLove=document.querySelectorAll('.cancelLove');
                                cancelLove[i].addEventListener('click',function(e){
                                    e.stopPropagation();
                                    chooseAppear("确定要取消收藏吗?");
                                    tipOk.addEventListener('click',function(){
                                        chooseFade();
                                        $.ajax({
                                            type:'post',
                                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                            data:{
                                                postsID:workTitle[i].textID,
                                                userID:user_id
                                            },
                                            success:function(suc){
                                                // console.log(suc);
                                                sureAppear("取消收藏成功!");
                                                successOk.addEventListener('click',function(){
                                                    sureFade();
                                                })
                                                haveWorks.removeChild(worksItem[i]);
                                                num();
                                            },
                                            error:function(fal){
                                                // console.log(fal);
                                            }
                                        })
                                    })
                                    tipNo.addEventListener('click',function(){
                                        chooseFade();
                                    })
                                },false)
                               
                            },
                            error:function(fal){
                                // console.log(fal);
                            }
                        })
                      },100)
                      
                     
                  
                }
            }
        },
        error:function(err){
            // console.log(err);
        }
    })
}







//展示用户自己的帖子和收藏的帖子
var myWorksNav=document.querySelector('.myWorksNav');
var collectWorkNav=document.querySelector('.collectWorkNav');
var cancel=document.querySelector('.cancel');
var noWork=document.querySelector('.noWork');
var searchNav=document.querySelector('.searchNav');
var workNav=document.querySelector('.workNav');
var find=document.querySelector('#find');
getMyWorks();
myWorksNav.addEventListener('click',function(){
    // noWork.innerHTML='暂未发表作品';
    myWorksNav.style.color='cornflowerblue';
    collectWorkNav.style.color='black';
    haveWorks.innerHTML="";
    getMyWorks();

})
collectWorkNav.addEventListener('click',function(){
    // noWork.innerHTML='暂无收藏';
    collectWorkNav.style.color='cornflowerblue';
    myWorksNav.style.color='black';
    haveWorks.innerHTML="";
    getLoveWorks();
})
find.addEventListener('click',function(){
    // noWork.innerHTML='暂无作品';
    searchNav.style.display='block';
    workNav.style.display='none';
    haveWorks.innerHTML="";
    getMyWorks();
})
cancel.addEventListener('click',function(){
    searchNav.style.display='none';
    workNav.style.display='block';
    // noWork.innerHTML='暂未发表作品';
    haveWorks.innerHTML="";
    myWorksNav.style.color='cornflowerblue';
    collectWorkNav.style.color='black';
    getMyWorks();
})

//模糊搜索自己的作品
var searchBox=document.querySelector('.searchBox');
var searchInput=document.querySelector('.searchInput');
searchBox.addEventListener('click',function(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryPerson',
        data:{
            thing:searchInput.value,
            userID:user_id
        },
        success:function(res){
            haveWorks.innerHTML="";
            // console.log(res);
            if(res.length==0){
                empty.style.display='flex';
                noWork.innerHTML='暂无作品';
            }else{
                empty.style.display='none';
                for(let i=0;i<res.length;i++){
                    var works=`
                    <div class="worksItem">
                        <div class="workTitle" textID=""></div>
                        <div class="footer">
                            <span class="read"><span class="readNum">0</span>阅读</span>
                            <span class="discuss"><span class="discussNum">0</span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                            <span class="textTime"><span class="timeNum">21分钟</span></span>
                            <span class="status">未审核</span>
                            <div class="handle"><span class="deleteText">删除</span><span class="changeText">修改</span><span class="collect">收藏</span></div>
                        </div>
                    </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);
                    var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                    var timeNum=document.querySelectorAll('.timeNum');
                    var status=document.querySelectorAll('.status');
                    var workTitle=document.querySelectorAll('.workTitle');
                    var readNum=document.querySelectorAll('.readNum');
                    var deleteText=document.querySelectorAll('.deleteText');
                    workTitle[i].textID=res[i].postsID;
                    var worksItem=document.querySelectorAll('.worksItem');
                    var collect=document.querySelectorAll('.collect');
                     //评论数量
                     var discussNum=document.querySelectorAll('.discussNum');
                     $.ajax({
                         type:'post',
                         url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                         data:{
                             postsID:workTitle[i].textID
                         },
                         success:function(suc_1){
                            //   console.log(suc_1);
                            if(suc_1<10000){
                                discussNum[i].innerHTML=suc_1;       
                            }else{
                                var x=(suc_1/10000).toFixed(2);
                                discussNum[i].innerHTML=`${x}万`;
                            }
                         },
                         error:function(err){
                            //  console.log(err);
                         }
                     })
                    //  判断是否已经收藏帖子
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                        data:{
                            postsID:workTitle[i].textID,
                            userID:user_id
                        },
                        success:function(suc){
                            // console.log(suc);
                            if(suc.code==-1){
                                collect[i].innerHTML='取消收藏';
                            }else{
                                collect[i].innerHTML='收藏';
                            }
                        },
                        error:function(err){
                            // console.log(err);
                        }
                    })
                    //判断是否已经收藏帖子
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                        data:{
                            postsID:workTitle[i].textID,
                            userID:user_id
                        },
                        success:function(res){
                            // console.log(res);
                            if(res.code==-1){
                                collect[i].innerHTML='取消收藏';
                            }else{
                                collect[i].innerHTML='收藏';
                            }
                        },
                        error:function(err){
                            // console.log(err);
                        }
                    })
                    //跳转到文章显示页面
                    worksItem[i].addEventListener('click',function(){
                        localStorage.setItem('article_id',workTitle[i].textID);
                        localStorage.setItem("tolook", '0');
                        window.location.assign("../templates/recomments.html");
                    })
                    if(res[i].status==1){
                        status[i].style.display='none';
                    }
                    workTitle[i].innerHTML=res[i].postsName;
                    if(res[i].alike<10000){
                        giveLikeNum[i].innerHTML=res[i].alike;       
                    }else{
                        var giveLike=(res[i].alike/10000).toFixed(2);
                        giveLikeNum[i].innerHTML=`${giveLike}万`;
                    }
                    timeNum[i].innerHTML=res[i].picture;
                    if(res[i].browse<10000){
                        readNum[i].innerHTML=res[i].browse;       
                    }else{
                        var x=(res[i].browse/10000).toFixed(2);
                        readNum[i].innerHTML=`${x}万`;
                    }
                    //删除帖子(阻止了冒泡)
                    deleteText[i].addEventListener('click',function(e){
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
                                    postsID:workTitle[i].textID
                                },
                                success:function(res){
                                    // console.log(res);
                                    sureAppear("确认要删除吗?");
                                    successOk.addEventListener('click',function(){
                                        sureFade();
                                    })
                                    num();
                                
                                },
                                error:function(err){
                                    // console.log(err);
                                }
                            })
                        })
                    },false)
                    
                    var collect=document.querySelectorAll('.collect');
                    //用户收藏自己的帖子
                    collect[i].addEventListener('click',function(e){
                        e.stopPropagation();
                        if(collect[i].innerHTML=='收藏'){
                            chooseAppear("确定要收藏吗？");
                            tipNo.addEventListener('click',function(){
                                chooseFade();
                            })
                            tipOk.addEventListener('click',function(){
                                chooseFade();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                    data:{
                                        postsID:workTitle[i].textID,
                                        userID:user_id
                                    },
                                    success:function(res){
                                        // console.log(res);
                                        collect[i].innerHTML='取消收藏';
                                        num();
                                    },
                                    error:function(err){
                                        // console.log(err);
                                    }
                                })
                            })
                        }else{
                            chooseAppear("确定要取消收藏吗?");
                            tipOk.addEventListener('click',function(){
                                chooseFade();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                    data:{
                                        postsID:workTitle[i].textID,
                                        userID:user_id
                                    },
                                    success:function(suc){
                                        // console.log(suc);
                                        collect[i].innerHTML='收藏';
                                        num();
                                        
                                    },
                                    error:function(fal){
                                        // console.log(fal);
                                    }
                                })
                            })
                            tipNo.addEventListener('click',function(){
                                chooseFade();
                            })
                        }

                    },false)
                    //跳转到修改页面
                    var changeText=document.querySelectorAll('.changeText');
                    changeText[i].addEventListener('click',function(e){
                        e.stopPropagation();
                        localStorage.setItem('article_id',workTitle[i].textID);
                        localStorage.setItem("tolook", '0');
                        window.location.assign("../templates/publish-change.html");
                    },false)

                }
            }    
        },
        error:function(err){
            // console.log(err);
        }
    
    })
})


