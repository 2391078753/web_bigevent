$(function(){
    var form = layui.form;
    var layer = layui.layer;

    // 表单验证
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return "昵称必须在 1 ~ 6 个字之间！"
            }
        }
    })

    // 通过ajax请求获取用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }

                console.dir(res);
                // 为表单赋值
                form.val("formUser-info", res.data)
                
               
            },
    
        })
    }

    // 重置按钮
    $("#btnReset").on("click", function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 重新渲染表单
        initUserInfo();
    })

    // 提交表单事件
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg("修改用户信息失败！")
                }
                layer.msg("修改用户信息成功！");
                // 调用父页面中的方法，重新渲染用户头像的信息
                window.parent.getUserInfo();
            }
        })
    })

})