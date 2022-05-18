var allChoose=document.querySelector('.allChoose');
var check=document.querySelectorAll('.check');
var cancelAll=document.querySelector('.cancelAll');
var massDelete=document.querySelector('.massDelete');
var reset=document.querySelector('.reset');
massDelete.addEventListener('click',function(){
    allChoose.style.display='inline-block';
    cancelAll.style.display='inline-block';
    reset.style.display='inline-block';
})
allChoose.addEventListener('click',function(){
    for(let i=0;i<check.length;i++){
        check[i].setAttribute('checked','checked');
    }
})
cancelAll.addEventListener('click',function(){
    for(let i=0;i<check.length;i++){
        check[i].removeAttribute('checked');
    }
})
reset.addEventListener('click',function(){
    allChoose.style.display='none';
    cancelAll.style.display='none';
    reset.style.display='none';
})