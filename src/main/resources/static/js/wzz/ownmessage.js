var food_find_input = document.getElementsByClassName("food_find_input")[0];
var food_find_bon = document.getElementsByClassName("food_find_bon")[0];
var user_id = localStorage.getItem('user_id');
var main = document.getElementById("main-right");
var red = document.getElementsByClassName("red");
var feedback_sort = document.getElementsByClassName("feedback-sort");
//重新newalert（）方法
var alertbox = document.getElementById("alert");
var alertfade = document.getElementById("alertfade");
var feedbackfade = document.getElementById("feedbackfade");
var alerttext = document.getElementById("alerttext");

alertfade.onclick = function () {
    feedbackfade.style.display = 'none';
    feedbackfade.style.opacity = '0';
    feedbackfade.classList.remove("fade");
    alertbox.style.top = '-250px';
}
function newalert(text) {
    feedbackfade.style.display = 'block';
    feedbackfade.style.opacity = '1';
    feedbackfade.classList.add("fade");
    alerttext.innerHTML = text;
    alertbox.style.top = '50px';
}
//重新newalert（）方法
// 获取个人信息
document.getElementById('top_name').onclick = function () {
    window.location.assign("../templates/myPage.html");
}
$.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', { "userID": user_id },
    function (date) {
        document.getElementById('top_name').innerHTML = date.username;
        let img = date.picture;
        document.getElementById('top_img_header').src = img;
    })
// 获取个人信息
// 搜索遍历
food_find_bon.onclick = function () {
    let text = food_find_input.value;
    localStorage.setItem('search_input', text);
    window.location.assign("../templates/search.html");
}
// 搜索遍历
// 遍历反馈数据
function changepage1() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryUserFeedback',
        { "userID": user_id },
        function (date) {
            main.innerHTML = null;
            for (let n = 0; n < date.length; n++) {
                main.innerHTML += `
                <a class="feedback-a" href="javascript:;">
                    <div class="red"></div>
                    <button class="feedback-delete"><i class="fa fa-trash-o" aria-hidden="true"></i>删除</button>
                    <div class="feedback-a-text">${date[n].opinion}</div>
                    <div class="feedback-a-message">
                    <span class="mfeedbackid" style="display: none;">${date[n].feedbackID}</span>
                    <span class="mfeedbackt" style="display: none;">${date[n].managerContent}</span>
                        <span >${date[n].times}</span>
                        类型：<span >${date[n].kind}</span>
                        状态：<span class="status">${date[n].userOr}</span>
                    </div>
                </a>
                `;
            }
            let status = document.getElementsByClassName("status");
            let feedback = document.getElementsByClassName("feedback-a");
            let feedbackdelete= document.getElementsByClassName("feedback-delete");
            let fid = document.getElementsByClassName("mfeedbackid");
            let mft = document.getElementsByClassName("mfeedbackt");
            let fat = document.getElementsByClassName("feedback-a-text");
            for (let i = 0; i < status.length; i++) {
                let n = status[i].innerHTML;
                if (n == 0) {
                    status[i].innerHTML = "待反馈"
                } else if (n == -1) {
                    status[i].innerHTML = "已反馈";
                    red[i].style.display = 'block';
                } else {
                    status[i].innerHTML = "已反馈";
                    status[i].style.color='#0771f3';
                }
                feedback[i].onclick = function () {
                    let id = fid[i].innerHTML;
                    let ft = mft[i].innerHTML;
                    let fa = fat[i].innerHTML;
                    if (ft == 'null') {
                        newalert("您暂未收到回复！");
                    }
                    else {
                        $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/updateUserOr',
                            { "feedbackID": id },
                            function (date) {
                                console.log(date);
                                changepage1();
                            })
                        Feedback_show();
                        document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                        document.getElementsByClassName("min_feedback_text")[1].innerHTML = ft;
                    }
                }
                feedbackdelete[i].onmousemove= function () {
                    feedback[i].onclick=null;
                    this.onclick=function(){
                        let id = fid[i].innerHTML;
                        var choose = confirm("你是否确定删除这条信息?");
                        if (choose == true) {
                            $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/deleteFeedback',
                                { "feedbackID": id },
                                function (date) {
                                    newalert(date.data)
                                    changepage1();
                            })
                        }
                    }
                }
                feedbackdelete[i].onmouseout= function () {
                    feedback[i].onclick=function () {
                        let id = fid[i].innerHTML;
                        let ft = mft[i].innerHTML;
                        let fa = fat[i].innerHTML;
                        if (ft == 'null') {
                            newalert("您暂未收到回复！");
                        }
                        else {
                            $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/updateUserOr',
                                { "feedbackID": id },
                                function (date) {
                                    console.log(date);
                                    changepage1();
                                })
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = ft;
                        }
                    };
                }
            }
        })
}
// 遍历反馈数据
// 遍历举报数据
function changepage2() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/showPortsById',
        { "userID": user_id },
        function (date) {
            main.innerHTML = null;
            for (let n = 0; n < date.length; n++) {
                main.innerHTML += `
                <a class="feedback-a" href="javascript:;">
                    <button class="feedback-delete"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</button>
                    <div class="feedback-a-text">${date[n].opinion}</div>
                    <div class="feedback-a-message">
                    <span class="mfeedbackid" style="display: none;">${date[n].reportID}</span>
                        <span >${date[n].times}</span>
                        类型：<span >${date[n].kind}</span>
                        状态：<span class="status">${date[n].status}</span>
                    </div>
                </a>
                `;
            }
            let status = document.getElementsByClassName("status");
            let feedback = document.getElementsByClassName("feedback-a");
            let feedbackdelete= document.getElementsByClassName("feedback-delete");
            let fid = document.getElementsByClassName("mfeedbackid");
            let fat = document.getElementsByClassName("feedback-a-text");
            for (let i = 0; i < status.length; i++) {
                let n = status[i].innerHTML;
                if (n == 0) {
                    status[i].innerHTML = "待回复"
                } else if (n == -1) {
                    status[i].innerHTML = "举报成功";
                    status[i].style.color='#0771f3';
                } else {
                    status[i].innerHTML = "举报失败";
                    status[i].style.color='#0771f3';
                }
                feedback[i].onclick = function () {
                    let id = fid[i].innerHTML;
                    let fa = fat[i].innerHTML;
                    if (status[i].innerHTML == "待回复") {
                        newalert("您暂未收到回复！");
                    }
                    else if (status[i].innerHTML == "举报成功") {
                        Feedback_show();
                        document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                        document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员已经对该文章进行处理！';
                    } else {
                        Feedback_show();
                        document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                        document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员正对该文章进行观察！';
                    }
                }
                feedbackdelete[i].onmousemove= function () {
                    feedback[i].onclick=null;
                    this.onclick=function(){
                        let id = fid[i].innerHTML;
                        var choose = confirm("你是否确定删除这条信息?");
                        if (choose == true) {
                            $.post('http://localhost:8080/ToSkyNews_war_exploded/deleteReports',
                                { "reportID": id },
                                function (date) {
                                    newalert(date.data)
                                    changepage2();
                            })
                        }
                    }
                }
                feedbackdelete[i].onmouseout= function (){
                    feedback[i].onclick = function () {
                        let id = fid[i].innerHTML;
                        let fa = fat[i].innerHTML;
                        if (status[i].innerHTML == "待回复") {
                            newalert("您暂未收到回复！");
                        }
                        else if (status[i].innerHTML == "举报成功") {
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员已经对该文章进行处理！';
                        } else {
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员正对该文章进行观察！';
                        }
                    }
                }
            }
        })
}
function changepage3(){
    alert("sss")
}
// 遍历举报数据
changepage1();
// 反馈展示
var feedback = document.getElementById("feedback");
var feedback_main = document.getElementById("feedback_main");
function Feedback_show() {
    feedback.style.display = "block";
    feedback.style.opacity = "1";
    feedback.classList.add("fade");
}
function Feedback_down() {
    feedback.style.display = "none";
    feedback.style.opacity = "0";
    feedback.classList.remove("fade");
}
feedback.onclick = Feedback_down;
feedback_main.onmousemove = function () {
    feedback.onclick = null;
}
feedback_main.onmouseout = function () {
    feedback.onclick = Feedback_down;
}
function back() {
    window.location.assign("../templates/user_main.html");
}
feedback_sort[0].style.color = "white";
feedback_sort[0].style.backgroundColor = "#7fb0eb";
function changeall(n){
    if(n==0){changepage1();}
    if(n==1){changepage2();}
    if(n==2){changepage3();}
}
var feedback_sortn=0;
for(let i in feedback_sort){
    feedback_sort[i].onclick = function () {
        feedback_sort[i].style.color = "white";
        feedback_sort[i].style.backgroundColor = "#7fb0eb";
        changeall(i);
        if(feedback_sortn!=i){
            feedback_sort[feedback_sortn].style.color = "#888888";
            feedback_sort[feedback_sortn].style.backgroundColor = "rgb(225, 225, 225)";
            feedback_sortn=i;   
        }
    }
}
// feedback_sort[0].onclick = function () {
//     feedback_sort[0].style.color = "white";
//     feedback_sort[0].style.backgroundColor = "#7fb0eb";
//     feedback_sort[1].style.color = "#888888";
//     feedback_sort[1].style.backgroundColor = "rgb(225, 225, 225)";
//     changepage1();
// }
// feedback_sort[1].onclick = function () {
//     feedback_sort[1].style.color = "white";
//     feedback_sort[1].style.backgroundColor = "#7fb0eb";
//     feedback_sort[0].style.color = "#888888";
//     feedback_sort[0].style.backgroundColor = "rgb(225, 225, 225)";
//     changepage2();
// }