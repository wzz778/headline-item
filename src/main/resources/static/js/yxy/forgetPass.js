var input=document.querySelectorAll('input');
//密码可见
var eyeOpen1=document.querySelector('#eyeOpen_1');
var eyeClose1=document.querySelector('#eyeClose_1');
var eyeOpen2=document.querySelector('#eyeOpen_2');
var eyeClose2=document.querySelector('#eyeClose_2');
var newPass=document.querySelector('.newPass');
var surePass=document.querySelector('.surePass');
var user_id=localStorage.getItem('user_id');
var tipText=document.querySelector('.tipText');
eyeClose1.addEventListener('click',function(){
    eyeClose1.style.display='none';
    eyeOpen1.style.display='block';
    newPass.type='text';
})
eyeOpen1.addEventListener('click',function(){
    eyeOpen1.style.display='none';
    eyeClose1.style.display='block';
    newPass.type='password';
})
eyeClose2.addEventListener('click',function(){
    eyeClose2.style.display='none';
    eyeOpen2.style.display='block';
    surePass.type='text';
})
eyeOpen2.addEventListener('click',function(){
    eyeOpen2.style.display='none';
    eyeClose2.style.display='block';
    surePass.type='password';
})

var newPassBtn=document.querySelector('.newPassBtn');
var fill=document.querySelectorAll('.fill');
var getNum=document.querySelector('.getNum');
var mail=document.querySelector('.mail');
var newPass=document.querySelector('.newPass');
var inputs=document.querySelectorAll('input');
var tip=document.querySelector('.tip');
var tipOk=document.querySelector('.tipOk');
var inputAccount=document.querySelector('.inputAccount');
var newPassTip=document.querySelector('#newPassTip');
var inputNum=document.querySelector('.inputNum');

newPassBtn.addEventListener('click',function(){
    for(let i=0;i<fill.length;i++){
        if(inputs[i].value==''){
            fill[i].style.display='inline';
        }else{
            fill[i].style.display='none';
            if(mail.value==''){
                tipText.innerHTML='请输入邮箱!';
                tip.style.height='200px';
                inputReadOnly();
                tipOk.addEventListener('click',function(){
                    tip.style.height=0;
                    inputChange();
                })
            }else if(mail.value!=''&&inputNum.value==''){
                tipText.innerHTML='请输入验证码!';
                tip.style.height='200px';
                inputReadOnly();
                tipOk.addEventListener('click',function(){
                    tip.style.height=0;
                    inputChange();
                })
            }
            
        }
        
    }
})

        //找回密码
        getNum.addEventListener('click',function(){
            var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            var passJudge=passLimit.test(newPass.value);
            // console.log(passJudge)
            if(mail.value==''){
                tipText.innerHTML='请输入邮箱!';
                tip.style.height='200px';
                inputReadOnly();
                tipOk.addEventListener('click',function(){
                    tip.style.height=0;
                    inputChange();
                })
            }else if(surePass.value!=newPass.value){
                tipText.innerHTML='新密码与确认密码不一致!';
                tip.style.height='200px';
                inputReadOnly();
                tipOk.addEventListener('click',function(){
                    tip.style.height=0;
                    inputChange();
                })
             }else if(passJudge==false){
                newPassTip.style.display='inline';
             }
             else{
                newPassTip.style.display='none';
                var time=30;
                var timer=setInterval(function(){
                if(time==0){
                    clearInterval(timer);
                    getNum.style.backgroundColor='rgb(84, 120, 177)';
                    getNum.value=`获取验证码`;
                    getNum.disabled=false;
                }else{
                    getNum.style.backgroundColor='rgb(101, 131, 179)';
                    getNum.value=`请在${time}秒后点击`;
                    getNum.disabled=true;
                    time--;
                }
            },1000)
                $.ajax({
                    type:'post',
                    url:'http://localhost:8080/ToSkyNews_war_exploded/user/getCode',
                    data:{
                        targetEmail:mail.value
                    },
                    success:function(res){
                        // console.log(res);
                        newPassBtn.addEventListener('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/user/changePassword',
                                data:{
                                    account:inputAccount.value,
                                    authCode1:inputNum.value,
                                    newpassword:newPass.value,
                                    newpassword2:surePass.value,
                                    targetEmail:mail.value
                                },
                                success:function(res){
                                    // console.log(res);
                                    if(surePass.value!=newPass.value){
                                        tipText.innerHTML='新密码与确认密码不一致!';
                                        tip.style.height='200px';
                                        inputReadOnly();
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height=0;
                                            inputChange();
                                        })
                                     }
                                     
                                     if(res.data=='验证码输入错误,请重新输入'){
                                        tipText.innerHTML='验证码错误';
                                        tip.style.height='200px';
                                        inputReadOnly();
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height=0;
                                            inputChange();
                                        })
                                     }
                                     else if(res.data=='验证码输入正确,两次密码输入正确,修改密码成功,请登录'){
                                        tipText.innerHTML='请重新登录';
                                        newPassTip.style.display='none';
                                        tip.style.height='200px';
                                        inputReadOnly();
                                        tipOk.addEventListener('click',function(){
                                            tip.style.height=0;
                                            inputChange();
                                            localStorage.removeItem('user_id');
                                            localStorage.setItem('have_land','false');
                                            localStorage.setItem("tolook", '0');
                                            window.location.replace("../templates/login.html");
                                        })
                                     }
                                    
                                   
                                },
                                error:function(err){
                                    // console.log(err);
                                }
                            })
                        })
                        
                    },
                    error:function(er){
                        // console.log(er);
                    }
                })
            }
            
        })
    
    //所有input框不可修改
    function inputReadOnly(){
        for(let i=0;i<input.length;i++){
            input[i].setAttribute('readonly','readonly');
        }
    }
    //所有input框可修改
    function inputChange(){
        for(let i=0;i<input.length;i++){
            input[i].removeAttribute('readonly');
        }
    }
