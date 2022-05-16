//登录注册页面转换
var turn=document.querySelector('.turn');
var rotateBox=document.querySelector('.rotateBox');
var returnLogin=document.querySelector('.returnLogin');
var registerBox=document.querySelector('.registerBox');
var loginBox=document.querySelector('.loginBox');
turn.addEventListener('click',function(){
    rotateBox.style.transform= ('rotateY(180deg)');
    rotateBox.style.height='500px';
    if(rotateBox.style.height=='500px'){
        registerBox.style.display='block';
    }
    loginBox.style.display='none';

})
returnLogin.addEventListener('click',function(){
    rotateBox.style.transform= ('rotateY(0deg)');
    rotateBox.style.height='400px';
    loginBox.style.display='block';
    registerBox.style.display='none';
})

//空值判断
var judge=document.querySelectorAll('.judge');
var registerBtn=document.querySelector('.registerBtn');
var inputAccount=document.querySelector('#inputAccount');
var inputPass=document.querySelector('#inputPass');
var tipOk=document.querySelector('.tipOk');
var tipText=document.querySelector('.tipText');
var loginTip=document.querySelector('.loginTip');
var loginBtn=document.querySelector('.loginBtn');
loginBtn.addEventListener('click',function(){
    for(let i=0;i<2;i++){
        if(judge[i].value==''){
            nothing[i].style.display='inline-block';
        }else{
            nothing[i].style.display='none';
        }
        if(judge[0].value!=''&&judge[1].value!=''){
            $.ajax({
                type:'post',
                url:'http://localhost:8080/ToSkyNews_war_exploded/user/login',
                data:{
                    account :inputAccount.value,
                    password:inputPass.value
                },
                success:function(res){
                    // console.log(res);
                    if(res.code==1){
                        tipText.innerHTML='登录成功';
                        loginTip.style.height='200px';
                        loginTip.style.top='50px';
                        tipOk.addEventListener('click',function(){
                            loginTip.style.height='0';
                            loginTip.style.top='0';
                            localStorage.setItem('user_id',res.data.userID);
                            localStorage.setItem('have_land',"true");
                            localStorage.setItem("tolook", '0');
                            window.location.replace("../templates/user_main.html");
                        })
                        
                    }else if(res.code=='-1'){
                        tipText.innerHTML='账号或密码错误';
                        loginTip.style.height='200px';
                        loginTip.style.top='50px';
                        tipOk.addEventListener('click',function(){
                            loginTip.style.height='0';
                            loginTip.style.top='0';
                        })
                    }

                },
                error:function(err){
                    // console.log(err);

                }
            })
        }
    }
})
//密码可见
var eyeOpen=document.querySelector('#eyeOpen');
var eyeClose=document.querySelector('#eyeClose');
var inputPass=document.querySelector('#inputPass');
eyeClose.addEventListener('click',function(){
    eyeClose.style.display='none';
    eyeOpen.style.display='block';
    inputPass.type='text';
})
eyeOpen.addEventListener('click',function(){
    eyeOpen.style.display='none';
    eyeClose.style.display='block';
    inputPass.type='password';
})

//跳转到找回密码
forgetPass=document.querySelector('.forgetPass');
forgetPass.addEventListener('click',function(){
    localStorage.setItem("tolook", '0');
    window.location.assign("../templates/forgetPass.html");
})