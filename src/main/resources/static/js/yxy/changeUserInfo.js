var userName=document.querySelector('.userName');
var userAge=document.querySelector('.userAge');
var userSex=document.querySelector('.userSex');
var briefText=document.querySelector('.briefText');
var inputName=document.querySelector('.inputName');
var inputAge=document.querySelector('.inputAge');
var inputSex=document.querySelector('.inputSex');
var inputBriefText=document.querySelector('.inputBriefText');
var passBox=document.querySelector('.passBox');
var user_id=localStorage.getItem('user_id');
var successText=document.querySelector('.successText');
var inputMail=document.querySelector('.inputMail');
var userMail=document.querySelector('.userMail');
var judge=document.querySelector('.judge');
var passBefore=document.querySelector('.passBefore');
var passQuit=document.querySelector('.passQuit');
var passNext=document.querySelector('.passNext');
var changeHead=document.querySelector('.changeHead');
var userHead=document.querySelectorAll('.userHead');
var input=document.querySelectorAll('input');
var inputBriefText=document.querySelector('.inputBriefText');
//两个盒子放缩效果
var changed=document.querySelector('.changed');
var changing=document.querySelector('.changing');
changed.addEventListener('click',function(){
    changed.style.transform= ('scale(1)');
    changing.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(.7)');
})
changing.addEventListener('click',function(){
    changing.style.transform= ('scale(1)');
    changed.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(.7)');
})
passBox.addEventListener('click',function(){
    changing.style.transform= ('scale(.7)');
    changed.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(1)');
})



//修改成功弹窗
var keepSuccess=document.querySelector('.keepSuccess');
var keepBefore=document.querySelector('.keepBefore');
var keepBtn=document.querySelector('.keepBtn');
var okBtn=document.querySelector('.okBtn');
var quit=document.querySelector('.quit');
var next=document.querySelector('.next');
var nameFill=document.querySelector('.nameFill');
// var install=document.querySelectorAll('.install');
// for(let i=0;i<install.length;i++){
//     if(install[i].innerHTML==''){
//         install[i].innerHTML='未设置';
//     }
// }

var ageFill=document.querySelector('.ageFill');
var mailFill=document.querySelector('.mailFill');
sameInfo();
keepBtn.addEventListener('click',function(){
    var inputAge=document.querySelector('.inputAge');
    var ageLimit=/^((1[0-1])|[1-9])?\d$/;
    var nameLimit=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
    var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var ageJudge=ageLimit.test(inputAge.value);
    var nameJudge=nameLimit.test(inputName.value);
    var mailJudge=mailLimit.test(inputMail.value);
    // console.log(ageJudge);
    if(inputName.value==''){
        nameFill.style.display='inline';
        nameFill.innerHTML='昵称不能为空';
    }else if(ageJudge==false){
        ageFill.style.display='inline';
    }else if(nameJudge==false){
        nameFill.innerHTML='昵称不合格，请重新设置';
        nameFill.style.display='inline';
    }else if(mailJudge==false){
        mailFill.innerHTML='邮箱不规范，请重新填写'
        mailFill.style.display='inline';
    }
    else{
        ageFill.style.display='none';
        nameFill.style.display='none';
        mailFill.style.display='none';
        keepBefore.style.height='200px';
        inputReadOnly();
        next.addEventListener('click',function(){
            keepSuccess.style.height='200px';
            keepBefore.style.height='0';
            inputReadOnly();
            $.ajax({
                type:'post',
                url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
                data:{
                    userID:user_id
                },
                success:function(res){
                    // console.log(res);
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/user/updateUser',
                        data:{
                            username:inputName.value,
                            age:inputAge.value,
                            sex:inputSex.value,
                            signature:inputBriefText.value,
                            password:res.password,
                            userID:res.userID,
                            account:res.account,
                            telephone:res.telephone
                        },
                        success:function(res){
                            if(res.data=='修改成功'){
                                successText.innerHTML='信息修改成功！';
                                okBtn.addEventListener('click',function(){
                                    keepSuccess.style.height='0';
                                    inputChange();
                                })
                                sameInfo();
                            }else{
                                successText.innerHTML='信息修改失败！';
                                okBtn.addEventListener('click',function(){
                                    keepSuccess.style.height='0';
                                })
                            }
                            
                        },
                        error:function(err){
                            // console.log(err);
                        }
                    })
                },
                error:function(err){
                    // console.log(err);
                }
            })
            
        })
    }
   
})
okBtn.addEventListener('click',function(){
    keepSuccess.style.height='0';
    inputChange();
})
quit.addEventListener('click',function(){
    keepBefore.style.height='0';
    inputChange();
})



//使两个盒子中的信息一致
function sameInfo(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
        data:{
            userID:user_id
        },
        success:function(res){
            // console.log(res);
            inputName.value=res.username;
            inputAge.value=res.age;
            inputSex.value=res.sex;
            inputBriefText.value=res.signature;
            changeHead.style.backgroundImage=`url(${res.picture})`;
            userName.innerHTML=inputName.value;
            userAge.innerHTML=inputAge.value;
            if(inputSex.value==''){
                userSex.innerHTML='未设置';
            }else{
                userSex.innerHTML=inputSex.value;
            }
            briefText.innerHTML=inputBriefText.value;
            inputMail.value=res.telephone;
            userMail.innerHTML=inputMail.value;
            userHead[1].style.backgroundImage=`url(${res.picture})`;
            userHead[0].style.backgroundImage=`url(${res.picture})`;

        },
        error:function(err){
            console.log(err);
        }
    })
    
}
//空值判断
var fill=document.querySelectorAll('.fill');
var fillText=document.querySelectorAll('.fillText');
var changePassBtn=document.querySelector('.changePassBtn');
var newPass=document.querySelector('#newPass');
var passFill=document.querySelector('#passFill');
var surePass=document.querySelector('#surePass');
var oldPass=document.querySelector('#oldPass');
var inputAccount=document.querySelector('#inputAccount');
changePassBtn.addEventListener('click',function(){
    for(let i=0;i<fill.length;i++){
        if(fillText[i].value==''){
            fill[i].style.display='inline';
        }else{
            fill[i].style.display='none';
        }
        
    }
    if(fillText[0].value!=''&&fillText[1].value!=''&&fillText[2].value!=''&&fillText[3].value!=''){
        var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        var passJudge=passLimit.test(newPass.value);
        if(newPass.value!=surePass.value){
            successText.innerHTML='新密码与确认密码不一致！'
            keepSuccess.style.height='200px';
            inputReadOnly();
            okBtn.addEventListener('click',function(){
                keepSuccess.style.height='0';
                inputChange();
            })
        }else if(passJudge==false){
            passFill.innerHTML='新密码不符合规范';
            passFill.style.display='inline';
        }
        else{
            passFill.style.display='none';
            passFill.innerHTML='新密码不能为空';
            passBefore.style.height='200px';
            passNext.addEventListener('click',function(){
                passBefore.style.height=0;
                $.ajax({
                    type:'post',
                    url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
                    data:{
                        userID:user_id
                    },
                    success:function(da){
                        console.log(da);
                        if(da.account!=inputAccount.value){
                            successText.innerHTML='账号输入错误!';
                            keepSuccess.style.height='200px';
                            inputReadOnly();
                        }else if(oldPass.value!=da.password){
                            successText.innerHTML='原密码不正确!';
                            keepSuccess.style.height='200px';
                            inputReadOnly();
                            
                        }else{
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/user/updateUser',
                                data:{
                                    username:da.username,
                                    age:da.age,
                                    sex:da.sex,
                                    signature:da.signature,
                                    password:surePass.value,
                                    userID:user_id,
                                    account:inputAccount.value,
                                    telephone:da.telephone
                                },
                                success:function(suc){
                                    console.log(suc);
                                    successText.innerHTML='修改成功!';
                                    keepSuccess.style.height='200px';
                                    inputReadOnly();
                                    okBtn.addEventListener('click',function(){
                                        keepSuccess.style.height=0;
                                        inputChange();
                                    })
                                    
                                },
                                error:function(er){
                                    console.log(er);
                                }
                
                            })  
                         }
                        
                        
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
            })
            passQuit.addEventListener('click',function(){
                passBefore.style.height=0;
            })
        }
           
            
    }
})

//密码的显示与隐藏
var eyeOpen1=document.querySelector('#eyeOpen_1');
var eyeClose1=document.querySelector('#eyeClose_1');
var eyeOpen2=document.querySelector('#eyeOpen_2');
var eyeClose2=document.querySelector('#eyeClose_2');
var eyeOpen3=document.querySelector('#eyeOpen_3');
var eyeClose3=document.querySelector('#eyeClose_3');
eyeClose1.addEventListener('click',function(){
    eyeClose1.style.display='none';
    eyeOpen1.style.display='block';
    oldPass.type='text';
})
eyeOpen1.addEventListener('click',function(){
    eyeOpen1.style.display='none';
    eyeClose1.style.display='block';
    oldPass.type='password';
})
eyeClose2.addEventListener('click',function(){
    eyeClose2.style.display='none';
    eyeOpen2.style.display='block';
    newPass.type='text';
})
eyeOpen2.addEventListener('click',function(){
    eyeOpen2.style.display='none';
    eyeClose2.style.display='block';
    newPass.type='password';
})
eyeClose3.addEventListener('click',function(){
    eyeClose3.style.display='none';
    eyeOpen3.style.display='block';
    surePass.type='text';
})
eyeOpen3.addEventListener('click',function(){
    eyeOpen3.style.display='none';
    eyeClose3.style.display='block';
    surePass.type='password';
})

//跳转到找回密码
var forgetPass=document.querySelector('.forgetPass');
forgetPass.addEventListener('click',function(){
    localStorage.setItem("tolook", '0');
    window.location.assign("../templates/forgetPass.html");
})
//wzz添加的上传头像
var changeHead=document.querySelector('.changeHead');
function fileChange() {
    var formData = new FormData();
    formData.append('profile1', $('#file')[0].files[0]);
    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
    {"userID":localStorage.getItem('user_id')},
        function(date){
            sessionStorage.setItem("account",date.account);
    })
    formData.append('account',sessionStorage.getItem("account"));
    $.ajax({
        // 类型
        type: "POST",
        url: "http://localhost:8080/ToSkyNews_war_exploded/saveUserProfile",
        data: formData,
        dataType:"json",
        contentType: false,
        processData: false,
        success: function(date) {
            console.log(date);
            if(date.message=="成功并返回数据"){
                successText.innerHTML='上传头像成功！!';
                keepSuccess.style.height='200px';
                inputReadOnly();
                okBtn.addEventListener('click',function(){
                    keepSuccess.style.height=0;
                    inputChange();
                })
            }else{
                successText.innerHTML='上传头像失败，请重试！';
                keepSuccess.style.height='200px';
                inputReadOnly();
                okBtn.addEventListener('click',function(){
                    keepSuccess.style.height=0;
                    inputChange();
                })
            }
            console.log(date.data.file.data);
            changeHead.style.backgroundImage=`url(${date.data.file.data})`;
            for(let i=0;i<userHead.length;i++){
                userHead[i].style.backgroundImage=`url(${date.data.file.data})`;
            }
        },
        error: function(returndata) {
            console.log(returndata);
        }
    })
}
//所有input框不可修改
function inputReadOnly(){
    for(let i=0;i<input.length;i++){
        input[i].setAttribute('readonly','readonly');
        inputBriefText.setAttribute('readonly','readonly');
    }
}
//所有input框可修改
function inputChange(){
    for(let i=0;i<input.length;i++){
        input[i].removeAttribute('readonly');
        inputBriefText.removeAttribute('readonly');
    }
}
if (localStorage.getItem("tolookmy") == '0') {
    setTimeout(function () {
        window.location.reload();
    }, 60);
    localStorage.setItem("tolookmy", '1');
}

