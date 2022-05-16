var focusOther=document.querySelector('.focusOther');
var userName=document.querySelectorAll('.userName');
var briefText=document.querySelector('.briefText');
var myWorksNav=document.querySelector('.myWorksNav');
var collectWorkNav=document.querySelector('.collectWorkNav');
var haveWorks=document.querySelector('.haveWorks');
var empty=document.querySelector('.empty');
var account=document.querySelector('.account');
var otherUser_id=localStorage.getItem('otherUser_id');
var user_id=localStorage.getItem('user_id');
var have_land=localStorage.getItem('have_land');
var nullBox=document.querySelector('.nullBox');
var nullText=document.querySelector('.nullText');
var tip=document.querySelector('.tip');
var tipText=document.querySelector('.tipText');
var tipOk=document.querySelector('.tipOk');
var tipNo=document.querySelector('.tipNo');
var fansNav=document.querySelector('.fansNav');
var focusNav=document.querySelector('.focusNav');
var successTip=document.querySelector('.successTip');
var successOk=document.querySelector('.successOk');
var successText=document.querySelector('.successText');
var workNum=document.querySelector('.workNum');
var collectNum=document.querySelector('.collectNum');
$.ajax({
    type:'post',
    url:'http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean',
    data:{
        fansID:user_id,
        focusID:otherUser_id 
    },
    success:function(res){
        // console.log(res);
        if(res.data=='该用户已经关注过此用户！'){
            focusOther.innerHTML='取消关注';
        }else{
            focusOther.innerHTML='关注TA';
        }
    },
    error:function(err){
        // console.log(err);
    }
})
focusOther.addEventListener('click',function(){
    if(have_land=='false'){
        successText.innerHTML='请先登录';
        successTip.style.height='200px';
        successOk.addEventListener('click',function(){
            successTip.style.height=0;
        })
    }else{
        if(focusOther.innerHTML=='关注TA'){
            $.ajax({
                type:'post',
                url:'http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus',
                data:{
                    fansID:user_id,
                    focusID:otherUser_id
                },
                success:function(res){
                    // console.log(res);
                    focusOther.innerHTML='取消关注';
                },
                error:function(err){
                    // console.log(err);
                }
            })
        }else{
            $.ajax({
                type:'post',
                url:'http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus',
                data:{
                    fansID:user_id,
                    focusID:otherUser_id
                },
                success:function(res){
                    // console.log(res);
                    focusOther.innerHTML='关注TA';
                },
                error:function(err){
                    // console.log(err);
                }
            })
        }
    }
    

})

//收藏和作品数量
num();
function num(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionByUserID',
        data:{
            userID:otherUser_id
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
            reside:otherUser_id
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
            userID:otherUser_id
        },
        success:function(res){
            console.log(res);
            // workTitle.innerHTML=res[0].postsName,
            // giveLikeNum.innerHTML=res[0].alike
            if(res.length==0){
                empty.style.display='flex';
                noWork.innerHTML='暂无作品';
            }else{
                empty.style.display='none';
                for(let i=0;i<res.length;i++){
                    if(res[i].status==1){
                        var works=`
                            <div class="worksItem">
                                <div class="workTitle" textID=""></div>
                                <div class="footer">
                                    <span class="read"><span class="readNum">0</span>阅读</span>
                                    <span class="discuss"><span class="discussNum">0</span>评论</span>
                                    <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                                    <span class="textTime"><span class="timeNum">21分钟</span></span>
                                    <span class="collect">收藏</span>
                                </div>
                            </div>`;
                        haveWorks.insertAdjacentHTML('beforeend',works);
                        setTimeout(function(){
                            var worksItem=document.querySelectorAll('.worksItem');
                            var workTitle=document.querySelectorAll('.workTitle');
                            workTitle[i].textID=res[i].postsID;
                            var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                            var timeNum=document.querySelectorAll('.timeNum');
                            var readNum=document.querySelectorAll('.readNum');
                            workTitle[i].innerHTML=res[i].postsName;
                            if(res[i].alike<10000){
                                giveLikeNum[i].innerHTML=res[i].alike; 
                            }else{
                                var x=(res[i].alike/10000).toFixed(2);
                                giveLikeNum[i].innerHTML=`${x}万`;
                            }
                            if(res[i].browse<10000){
                                readNum[i].innerHTML=res[i].browse;     
                            }else{
                                var x=(res[i].browse/10000).toFixed(2);
                                readNum[i].innerHTML=`${x}万`;
                            }
                            
                            timeNum[i].innerHTML=res[i].picture;
                            //跳转到文章显示页面
                            worksItem[i].addEventListener('click',function(e){
                                e.stopPropagation();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                    data:{
                                        postsID:workTitle[i].textID
                                    },
                                    success:function(suc_1){
                                        // console.log(suc_1);
                                        localStorage.setItem('article_id',workTitle[i].textID);
                                        localStorage.setItem("tolook", '0');
                                        window.location.assign("../templates/recomments.html");
                                    },
                                    error:function(err){
                                        // console.log(err);
                                    }
                                })
                                
                               
                            })
                           
                             //评论数量
                            var discussNum=document.querySelectorAll('.discussNum');
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                                data:{
                                    postsID:workTitle[i].textID
                                },
                                success:function(suc_1){
                                    // console.log(suc_1);
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
                            //用户收藏该用户帖子
                            var collect=document.querySelectorAll('.collect');
                            collect[i].addEventListener('click',function(e){
                                e.stopPropagation();
                                if(have_land=='false'){
                                    successText.innerHTML='请先登录';
                                    successTip.style.height='200px'
                                    successOk.addEventListener('click',function(){
                                        successTip.style.height=0;
                                    })
                                }else{
                                    if(collect[i].innerHTML=='收藏'){
                                        tipText.innerHTML='确定要收藏吗？';
                                        tip.style.height='200px';
                                        tipNo.addEventListener('click',function(){
                                            tip.style.height='0';
                                        })
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height='0';
                                            $.ajax({
                                                type:'post',
                                                url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                                data:{
                                                    postsID:workTitle[i].textID,
                                                    userID:user_id
                                                },
                                                success:function(res){
                                                    // console.log(res);
                                                    collect[i].innerHTML='取消收藏'
                                                },
                                                error:function(err){
                                                    // console.log(err);
                                                }
                                            })
                                        })
                                    }else{
                                        tipText.innerHTML='确定要取消收藏吗?';
                                        tip.style.height='200px';
                                        tipNo.addEventListener('click',function(){
                                            tip.style.height='0px';
                                        })
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height='0px';
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
                                                },
                                                error:function(fal){
                                                    // console.log(fal);
                                                }
                                            })
                                        })
                                    }
                                }
                            },false)
                        },100)
                    }
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
            userID:otherUser_id
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
                            <span class="read"><span class="readNum">0</span>阅读</span>
                            <span class="discuss"><span class="discussNum"></span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum"></span>点赞</span>
                            <span class="textTime"><span class="timeNum"></span></span>
                            <span class="collect">收藏</span>
                        </div>
                    </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);        
                    //获取帖子内容
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
                            var readNum=document.querySelectorAll('.readNum');
                            var timeNum=document.querySelectorAll('.timeNum');
                            workTitle[i].innerHTML=suc.postsName;
                            if(suc.alike<10000){
                                giveLikeNum[i].innerHTML=suc.alike; 
                            }else{
                                var x=(suc.alike/10000).toFixed(2);
                                giveLikeNum[i].innerHTML=`${x}万`;
                            }
                            timeNum[i].innerHTML=suc.picture;
                            workTitle[i].textID=suc.postsID;
                            if(suc.browse<10000){
                                readNum[i].innerHTML=suc.browse; 
                            }else{
                                var x=(suc.browse/10000).toFixed(2);
                                readNum[i].innerHTML=`${x}万`;
                            }
                            var collect=document.querySelectorAll('.collect');
                            worksItem[i].addEventListener('click',function(e){
                                e.stopPropagation();
                                $.ajax({
                                   type:'post',
                                   url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                   data:{
                                       postsID:workTitle[i].textID
                                   },
                                   success:function(suc_1){
                                    //    console.log(suc_1);
                                   },
                                   error:function(err){
                                    //    console.log(err);
                                   }
                               })
                                localStorage.setItem('article_id',workTitle[i].textID);
                                localStorage.setItem("tolook", '0');
                                window.location.assign("../templates/recomments.html");
                            })
                           
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
                           //判断是否已经收藏帖子
                           $.ajax({
                               type:'post',
                               url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                               data:{
                                   postsID:workTitle[i].textID,
                                   userID:user_id
                               },
                               success:function(res){
                                //    console.log(res);
                                   if(res.code==-1){
                                       collect[i].innerHTML='取消收藏';
                                   }else{
                                       collect[i].innerHTML='收藏';
                                   }
                               },
                               error:function(err){
                                //    console.log(err);
                               }
                           })
                           
                           var collect=document.querySelectorAll('.collect');
                           collect[i].addEventListener('click',function(e){
                               e.stopPropagation();
                               if(have_land=='false'){
                                   successText.innerHTML='请先登录'
                                   successTip.style.height='200px'
                                   successOk.addEventListener('click',function(){
                                       successTip.style.height=0;
                                   })
                               }else{
                                     //用户收藏自己的帖子
                                    if(collect[i].innerHTML=='收藏'){
                                        tipText.innerHTML='确定要收藏吗？';
                                        tip.style.height='200px';
                                        tipNo.addEventListener('click',function(){
                                            tip.style.height='0';
                                        })
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height='0';
                                            $.ajax({
                                                type:'post',
                                                url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                                data:{
                                                    postsID:workTitle[i].textID,
                                                    userID:user_id
                                                },
                                                success:function(res){
                                                    // console.log(res);
                                                    collect[i].innerHTML='取消收藏'
                                                },
                                                error:function(err){
                                                    // console.log(err);
                                                }
                                            })
                                        })
                                    }else{
                                        tipText.innerHTML='确定要取消收藏吗?';
                                        tip.style.height='200px';
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height='0px';
                                            $.ajax({
                                                type:'post',
                                                url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                                data:{
                                                    postsID:workTitle[i].textID,
                                                    userID:user_id
                                                },
                                                success:function(suc){
                                                    // console.log(suc);
                                                    successText.innerHTML='取消收藏成功!';
                                                    successTip.style.height='200px';
                                                    successOk.addEventListener('click',function(){
                                                        successTip.style.height='0px';
                                                        collect[i].innerHTML='收藏';
                                                    })
                                                },
                                                error:function(fal){
                                                    // console.log(fal);
                                                }
                                            })
                                        })
                                    }
                               }
                           },false)
                        },
                        error:function(fal){
                            // console.log(fal);
                        }
                    })
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
var searchInput=document.querySelector('.searchInput');
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
    searchInput.value='';
    getMyWorks();
})

//模糊搜索自己的作品
var searchBox=document.querySelector('.searchBox');
searchBox.addEventListener('click',function(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryPerson',
        data:{
            thing:searchInput.value,
            userID:otherUser_id
        },
        success:function(res){
            // console.log(res);
            haveWorks.innerHTML="";
            if(res.code==0){
                haveWorks.style.display='none';
                empty.style.display='flex';
                noWork.innerHTML='暂无作品';
            }else{
                empty.style.display='none';
                for(let i=0;i<res.length;i++){
                    if(res[i].status==1){
                        var works=`
                            <div class="worksItem">
                                <div class="workTitle" textID=""></div>
                                <div class="footer">
                                    <span class="read"><span class="readNum">0</span>阅读</span>
                                    <span class="discuss"><span class="discussNum">0</span>评论</span>
                                    <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                                    <span class="textTime"><span class="timeNum">21分钟</span></span>
                                    <span class="collect">收藏</span>
                                </div>
                            </div>`;
                        haveWorks.insertAdjacentHTML('beforeend',works);
                        var workTitle=document.querySelectorAll('.workTitle');
                        workTitle[i].textID=res[i].postsID;
                        var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                        var timeNum=document.querySelectorAll('.timeNum');
                        var readNum=document.querySelectorAll('.readNum');
                        if(res[i].browse<10000){
                            readNum[i].innerHTML=res[i].browse;       
                        }else{
                            var x=(res[i].browse/10000).toFixed(2);
                            readNum[i].innerHTML=`${x}万`;
                        }
                        workTitle[i].innerHTML=res[i].postsName;
                        if(res[i].alike<10000){
                            giveLikeNum[i].innerHTML=res[i].alike;       
                        }else{
                            var giveLike=(res[i].alike/10000).toFixed(2);
                            giveLikeNum[i].innerHTML=`${giveLike}万`;
                        }
                        timeNum[i].innerHTML=res[i].picture;
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
                                // console.log(suc_1);
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
                        collect[i].addEventListener('click',function(e){
                        e.stopPropagation();
                        if(have_land=='false'){
                            successText.innerHTML='请先登录';
                            successTip.style.height='200px';
                            successOk.addEventListener('click',function(){
                                successTip.style.height=0;
                            })
                        }else{
                            //用户收藏自己的帖子
                            if(collect[i].innerHTML=='收藏'){
                                tipText.innerHTML='确定要收藏吗？';
                                tip.style.height='200px';
                                tipNo.addEventListener('click',function(){
                                    tip.style.height='0';
                                })
                                tipOk.addEventListener('click',function(){
                                    tip.style.height='0';
                                    $.ajax({
                                        type:'post',
                                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                        data:{
                                            postsID:workTitle[i].textID,
                                            userID:user_id
                                        },
                                        success:function(res){
                                            // console.log(res);
                                            collect[i].innerHTML='取消收藏'
                                        },
                                        error:function(err){
                                            // console.log(err);
                                        }
                                    })
                                })
                            }else{
                                tipText.innerHTML='确定要取消收藏吗?';
                                tip.style.height='200px';
                                tipOk.addEventListener('click',function(){
                                    tip.style.height='0px';
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
                                            
                                        },
                                        error:function(fal){
                                            // console.log(fal);
                                        }
                                    })
                                })
                            }
                        }
                    },false)
                    }
                }
            }
            
        },
        error:function(err){
            // console.log(err);
        }
    })
})
