
$(function() {
    //调用函数获取用户信息
    getUserInfo();

    var layer = layui.layer;

    // 退出登录
    $("#btnLogout").on("click", function(e) {
        layer.confirm('确定要退出登录?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储
            localStorage.removeItem("token")
            // 2.跳转到登录界面
            location.href = '/login.html';
            // 3.关闭询问框
            layer.close(index);
            });
    })


    
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if(res.status != 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },

    })
}

// 渲染头像
function renderAvatar(res) {
    // 渲染欢迎部分
    var name = res.nickname || res.username;
    $("#welcome").html("欢迎&nbsp;&nbsp"+name);
    // 按需渲染用户头像
    if(res.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img')
        .attr("src", res.user_pic)
        .show();
        //文字头像隐藏
        $(".text-avatar").hide();
    }else {
        // 隐藏图片头像
        $('.layui-nav-img').hide();
        // 渲染文字头像
        $(".text-avatar")
        .html(name.substr(0,1).toUpperCase());
    }

}