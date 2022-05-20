$(document).ready(function () {
    // 获取所有的a标签
    var aTagArr = [].slice.apply(document.getElementsByClassName('post-content')[0].getElementsByTagName('a'));

    aTagArr.forEach(function (e, i) {
        e.target.length < 1 ? (e.target = '_blank') : console.log(e, 'blank添加失败');
    });
});
