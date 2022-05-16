//获取验证码按钮
var getNum=document.querySelector('.getNum');
var inputMail=document.querySelector('#inputMail');
var newPass=document.querySelector('#newPass');
var newName=document.querySelector('#newName');
var inputNum=document.querySelector('.inputNum')
var registerBtn=document.querySelector('.registerBtn');
var getNum=document.querySelector('.getNum');
var tipOk=document.querySelector('.tipOk');
var tipText=document.querySelector('.tipText');
var loginTip=document.querySelector('.loginTip');
var registerBtn=document.querySelector('.registerBtn');
var nameFill=document.querySelector('#nameFill');
var nothing=document.querySelectorAll('.nothing');
var passFill=document.querySelector('#passFill');
var mailFill=document.querySelector('#mailFill');
registerBtn.addEventListener('click',function(){
    for(let i=2;i<nothing.length;i++){
        if(judge[i].value==''){
            nothing[i].style.display='inline-block';
        }else if(judge[2].value!=''&&judge[3].value!=''&&judge[4].value!=''){
            var nameLimit=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
            var nameJudge=nameLimit.test(newName.value);
            var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            var passJudge=passLimit.test(newPass.value);
            var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var mailJudge=mailLimit.test(inputMail.value);
            if(nameJudge==false){
                nameFill.innerHTML='昵称不规范';
                nameFill.style.display='inline';
            }if(passJudge==false){
                passFill.innerHTML='密码不规范';
                passFill.style.display='inline';
            }if(mailJudge==false){
                mailFill.innerHTML='邮箱格式不规范';
                mailFill.style.display='inline';
            }if(nameJudge==true&&passJudge==true&&mailJudge==true){
                nameFill.style.display='none';
                nameFill.innerHTML='昵称不能为空';
                passFill.style.display='none';
                passFill.innerHTML='密码不规范';
                mailFill.style.display='none';
                mailFill.innerHTML='邮箱不能为空';
                
            }
        }
    }
})
//获取验证码
var judge=document.querySelectorAll('.judge');
getNum.addEventListener('click',function(){
        var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var mailJudge=mailLimit.test(inputMail.value);
        if(inputMail.value==''){
            tipText.innerHTML='请先输入邮箱';
            loginTip.style.height='200px';
            loginTip.style.top='50px';
            tipOk.addEventListener('click',function(){
                loginTip.style.height='0';
                loginTip.style.top='0';
            })
        }else if(mailJudge==false){
            mailFill.style.display='inline';
            mailFill.innerHTML='邮箱格式不规范';
        }
        else{
            mailFill.style.display='none';
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
                    targetEmail:inputMail.value
                },
                success:function(res){
                    // console.log(res);
                    if( res.code==1 ){
                        registerBtn.addEventListener('click',function(){
                            if(judge[2].value!=''&&judge[3].value!=''&&judge[4].value!=''){
                                var nameLimit=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
                                var nameJudge=nameLimit.test(newName.value);
                                var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                                var passJudge=passLimit.test(newPass.value);
                                var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                                var mailJudge=mailLimit.test(inputMail.value);
                                if(nameJudge==false){
                                    nameFill.innerHTML='昵称不规范';
                                    nameFill.style.display='inline';
                                }if(passJudge==false){
                                    passFill.innerHTML='密码不规范';
                                    passFill.style.display='inline';
                                }if(mailJudge==false){
                                    mailFill.innerHTML='邮箱格式不规范';
                                    mailFill.style.display='inline';
                                }if(nameJudge==true&&passJudge==true&&mailJudge==true){
                                    nameFill.style.display='none';
                                    nameFill.innerHTML='昵称不能为空';
                                    passFill.style.display='none';
                                    passFill.innerHTML='密码不规范';
                                    mailFill.style.display='none';
                                    mailFill.innerHTML='邮箱不能为空';
                                    if(inputNum.value==''){
                                        tipText.innerHTML='请输入验证码';
                                        loginTip.style.height='200px';
                                        loginTip.style.top='50px';
                                        tipOk.addEventListener('click',function(){
                                            loginTip.style.height='0';
                                            loginTip.style.top='0';
                                        })
                                    }
                                    //发送用户信息进行注册
                                    $.ajax({
                                        type:'post',
                                        url:'http://localhost:8080/ToSkyNews_war_exploded/user/register',
                                        data:{
                                            username:newName.value,
                                            password:newPass.value,
                                            targetEmail:inputMail.value,
                                            authCode1:inputNum.value
                                        },
                                        success:function(res){
                                            // console.log(res);
                                            if(res.code==1){
                                                
                                                $.ajax({
                                                    type:'post',
                                                    url:'http://localhost:8080/ToSkyNews_war_exploded/user/login',
                                                    data:{
                                                        account :res.data.account,
                                                        password:newPass.value
                                                    },
                                                    success:function(res_1){
                                                        // console.log(res_1);
                                                        tipText.innerHTML='注册成功';
                                                        loginTip.style.height='200px';
                                                        loginTip.style.top='50px';
                                                        tipOk.addEventListener('click',function(){
                                                            loginTip.style.height='0px'
                                                            loginTip.style.top='0';
                                                            localStorage.setItem('user_id',res_1.data.userID);
                                                            localStorage.setItem('have_land',"true");
                                                            localStorage.setItem("tolook", '0');
                                                            window.location.replace("../templates/user_main.html");
                                                        })
                                                        
                                                    },
                                                    error:function(err){
                                                        // console.log(err);
                                    
                                                    }
                                                })
                                            }
                                            else if(res.data=='注册失败！您的用户名已有人使用！'){
                                                tipText.innerHTML='用户名已存在';
                                                loginTip.style.height='200px';
                                                loginTip.style.top='50px';
                                            }else if(res.data=='验证码输入错误'){
                                                tipText.innerHTML='验证码输入错误';
                                                loginTip.style.height='200px';
                                                loginTip.style.top='50px';
                                            }else{
                                                tipText.innerHTML='注册失败！';
                                                loginTip.style.height='200px';
                                                loginTip.style.top='50px';
                                            }
                                            tipOk.addEventListener('click',function(){
                                                loginTip.style.height='0';
                                                loginTip.style.top='0';
                                            })
                                        },
                                        error:function(err){
                                            // console.log(err);
                                        }
                                    })
                                }
                            
                            }
                        })
                    }
                },
                error:function(err){
        
                    // console.log(err);
                }
            })
        }
        
})
//输入密码是的小按钮
var newEyeOpen=document.querySelector('#newEyeOpen');
var newEyeClose=document.querySelector('#newEyeClose');
newEyeClose.addEventListener('click',function(){
    newEyeClose.style.display='none';
    newEyeOpen.style.display='block';
    newPass.type='text';
})
newEyeOpen.addEventListener('click',function(){
    newEyeOpen.style.display='none';
    newEyeClose.style.display='block';
    newPass.type='password';
})




tipOk.addEventListener('click',function(){
    loginTip.style.height='0px'
    loginTip.style.top='0';
})