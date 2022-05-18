var tbody = document.getElementsByClassName("article_main")[0].getElementsByTagName("tbody")[0];
var aaa = document.getElementsByName("article_a");
var article_back_max=document.getElementsByClassName('article_back_max')[0];
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
//全选处理
function aalltrue() {
    let aall = document.getElementsByName("article_all")[0];
    var aaa = document.getElementsByName("article_a");
    if (aall.checked) {
        for (let n of aaa) {
            n.checked = true;
        }
    }
    else if (aall.checked == false) {
        for (let n of aaa) {
            n.checked = false;
        }
    }
}
//全选处理
//获取总页数，总个数
$.get('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsCounts',
    function (date) {
        let pages = date;
        let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
        sessionStorage.setItem('apagen', pagen);
    })
//获取总页数，总个数
//功能遍历
function articleall() {
    let look = document.getElementsByClassName("a_look");
    let reply = document.getElementsByClassName("a_reply");
    let refuse = document.getElementsByClassName("a_refuse");
    for (let n of look) {
        n.onclick = function () {
            let us = n.parentNode.parentNode.children[1].innerHTML;
            let time = n.parentNode.parentNode.children[2].innerHTML;
            let type = n.parentNode.parentNode.children[3].innerHTML;
            let ttt = n.parentNode.parentNode.children[4].innerHTML;
            let title = n.parentNode.parentNode.children[5].innerHTML;
            let content = n.parentNode.parentNode.children[6].innerHTML;
            let id = n.parentNode.parentNode.children[7].innerHTML;
            localStorage.setItem("a_us", us);
            localStorage.setItem("a_time", time);
            localStorage.setItem("a_type", type);
            localStorage.setItem("a_ttt", ttt);
            localStorage.setItem("a_title", title);
            localStorage.setItem("a_content", content);
            localStorage.setItem("a_id", id);
        }
    }
    for (let n of reply) {
        n.onclick = function () {
            let title = n.parentNode.parentNode.children[5].innerHTML;
            let id = n.parentNode.parentNode.children[7].innerHTML;
            let ttt = n.parentNode.parentNode.children[4].innerHTML;
            if (ttt == '批准') {
                newalert("已批准！");
            } else {
                let choose = confirm("你是否确定批准标题为：" + title + " 的文章?");
                if (choose == true) {
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/auditingPosts',
                        { 'postsID': id },
                        function (date) {
                            // console.log(id);
                            // alert("成功批准！");
                            n.parentNode.parentNode.children[4].innerHTML = "批准";
                            allchange1();
                        })
                }
            }
        }
    }
    for (let n of refuse) {
        n.onclick = function () {
            let title = n.parentNode.parentNode.children[5].innerHTML;
            let id = n.parentNode.parentNode.children[7].innerHTML;
            let ttt = n.parentNode.parentNode.children[4].innerHTML;
            if (ttt == '批准') {
                newalert("已批准！");
            } else if (ttt == '拒绝') {
                newalert("已拒绝！");
            } else {
                let choose = confirm("你是否确定拒绝标题为：" + title + " 的文章?");
                if (choose == true) {
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/disAuditing',
                        { 'postsID': id },
                        function (date) {
                            // console.log(id);
                            // alert("成功批准！");
                            n.parentNode.parentNode.children[4].innerHTML = "拒绝";
                            allchange1();
                        })
                }
            }
        }
    }
}
//功能遍历
//改变页数
var article_b = document.getElementsByClassName('article_b')[0];
let aa = article_b.getElementsByTagName("a");
var apages = article_b.getElementsByTagName("input")[0];
aa[2].onclick = () => {
    let n = parseInt(aa[1].innerText);
    if (n > 1) {
        aa[1].innerText = n - 1;
        apages.value = aa[1].innerText;
        allchange1();
    }
}
aa[0].onclick = () => {
    let n = parseInt(aa[1].innerText);
    if (n < sessionStorage.getItem('apagen')) {
        aa[1].innerText = n + 1;
        apages.value = aa[1].innerText;
        allchange1();
    }
}
var apage_number = document.getElementById('apage_number');
//改变页数
//遍历全部数据
function allchange1() {
    let p = apages.value;
    let page = (p - 1) * 10;
    $.get('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsCounts',
        function (date) {
            let pages = date;
            let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
            apage_number.innerHTML = "总共有" + pages + "个文章,总共" + pagen + "页";
            sessionStorage.setItem('apagen', pagen);
        })
    //获取用户数与总页数；
    if (0 < p && p <= parseInt(sessionStorage.getItem('apagen'))) {
        aa[1].innerText = p;
        $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPagingPosts',
            { 'column': page, 'total': "10" },
            function (date) {
                tbody.innerHTML = null;
                for (let n = 0; n < date.length; n++) {
                    let status;
                    if (date[n].status == 1) {
                        status = "批准"
                    } else if (date[n].status == -1) {
                        status = "拒绝"
                    } else {
                        status = "未批准"
                    }
                    tbody.innerHTML += `
                <tr>
                    <td class='ams'><input type='checkbox' name='article_a' value='all'></td>
                    <td class="ams" style="display: none">${date[n].reside}</td>
                    <td class="ams">${date[n].picture}</td>
                    <td class="ams">${date[n].label}</td>
                    <td class="ams">${status}</td>
                    <td class="aml">${date[n].postsName}</td>
                    <td class="aml" style="display: none;">${date[n].content}</td>
                    <td class="aml" style="display: none;">${date[n].postsID}</td>
                    <td class="aml">
                        <a class="a_look" href="users-article.html" target="_blank"><i class="fa fa-book" aria-hidden="true"></i>内容</a>
                        <a class="a_reply" href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i>批准</a>
                        <a class="a_refuse" href="javascript:;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>拒绝</a>
                    </td>
                </tr>
                `;
                    let ms = document.getElementsByClassName("ams");
                    let ml = document.getElementsByClassName("aml");
                    for (let i of ms) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                    for (let i of ml) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                }
                //获取一页的用户信息
                articleall();
            })
    }
    else if (apages.value == ""||sessionStorage.getItem('apagen')==null) { }
    else {
        newalert("请输入合理的页数！");
    }
}
//遍历全部数据
allchange1();
//搜索栏目
var article_bon = document.getElementsByClassName("article_bon")[0];
function articlefind() {
    let name = document.getElementsByClassName("article_input")[0].value;
    if (name == '') {
        newalert('请输入搜索内容！');
    } else {
        $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryAll',
            { 'thing': name, 'column': "0", 'total': "10" },
            function (date) {
                tbody.innerHTML = null;
                for (let n = 0; n < date.length; n++) {
                    let status;
                    if (date[n].status == 1) {
                        status = "批准"
                    } else if (date[n].status == -1) {
                        status = "拒绝"
                    } else {
                        status = "未批准"
                    }
                    tbody.innerHTML += `
                <tr>
                    <td class='ams'><input type='checkbox' name='article_a' value='all'></td>
                    <td class="ams" style="display: none">${date[n].reside}</td>
                    <td class="ams">${date[n].picture}</td>
                    <td class="ams">${date[n].label}</td>
                    <td class="ams">${status}</td>
                    <td class="aml">${date[n].postsName}</td>
                    <td class="aml" style="display: none;">${date[n].content}</td>
                    <td class="aml" style="display: none;">${date[n].postsID}</td>
                    <td class="aml">
                        <a class="a_look" href="users-article.html" target="_blank"><i class="fa fa-book" aria-hidden="true"></i>内容</a>
                        <a class="a_reply" href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i>批准</a>
                        <a class="a_refuse" href="javascript:;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>拒绝</a>
                    </td>
                </tr>
                `;
                    let ms = document.getElementsByClassName("ams");
                    let ml = document.getElementsByClassName("aml");
                    for (let i of ms) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                    for (let i of ml) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                }
                //获取一页的用户信息
                articleall();
            })
        article_back_max.style.display='block';
        article_b.style.display=' none';
    }
}
//搜索栏目
//未处理文章展示
function articlefail() {
    $.get('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPendingPosts',
        function (date) {
            tbody.innerHTML = null;
            for (let n = 0; n < date.length; n++) {
                let status;
                if (date[n].status == 1) {
                    status = "批准"
                } else if (date[n].status == -1) {
                    status = "拒绝"
                } else {
                    status = "未批准"
                }
                tbody.innerHTML += `
            <tr>
                <td class='ams'><input type='checkbox' name='article_a' value='all'></td>
                <td class="ams" style="display: none">${date[n].reside}</td>
                <td class="ams">${date[n].picture}</td>
                <td class="ams">${date[n].label}</td>
                <td class="ams">${status}</td>
                <td class="aml">${date[n].postsName}</td>
                <td class="aml" style="display: none;">${date[n].content}</td>
                <td class="aml" style="display: none;">${date[n].postsID}</td>
                <td class="aml">
                    <a class="a_look" href="users-article.html" target="_blank"><i class="fa fa-book" aria-hidden="true"></i>内容</a>
                    <a class="a_reply" href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i>批准</a>
                    <a class="a_refuse" href="javascript:;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>拒绝</a>
                </td>
            </tr>
            `;
                let ms = document.getElementsByClassName("ams");
                let ml = document.getElementsByClassName("aml");
                for (let i of ms) {
                    if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                        i.innerHTML = " ";
                    }
                }
                for (let i of ml) {
                    if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                        i.innerHTML = " ";
                    }
                }
            }
            articleall();
        })
    article_back_max.style.display='block';
    article_b.style.display=' none';
}
//未处理文章展示
//批量删除
var articldelete = document.getElementById("articl_delete");
var articlall = document.getElementsByName("article_all")[0];
var articla = document.getElementsByName("article_a");
function articledelete() {
    let choose = confirm("你确定删除选中文章的信息?");
    if (choose) {
        for (let i in articla) {
            if (articla[i].checked) {
                var id = articla[i].parentNode.parentNode.children[7].innerHTML;
                console.log(id);
                $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts', { "postsID": id },
                    function (date) {
                        allchange1();
                    })
            }
        }
        newalert("删除成功");
    }
}
articldelete.onmousemove = function () {
    let c = false;
    for (let i of articla) {
        if (i.checked) {
            c = true;
        }
    }
    if (!c) {
        articldelete.style.cursor = "not-allowed";
        articldelete.onclick = () => {
            newalert("请勾选你要删除的对象！");
        };
    } else {
        articldelete.style.cursor = "pointer";
        articldelete.onclick = articledelete;
    }
}
//空选删除处理
function backpagen2(){
    allchange1();
    article_b.style.display=' flex';
    article_back_max.style.display='none';
}
articleall();