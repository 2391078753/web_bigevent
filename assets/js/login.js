
$(function() {

    $("#link-reg").on("click", function(e) {
        // 点击去注册
        $(".login-box").hide();
        $(".reg-box").show();
    })
    
    $("#link-login").on("click", function(e) {
        // 点击去登录
        $(".login-box").show();
        $(".reg-box").hide();
    })

     
    // 从layui中获取form对象
    var form = layui.form;
    // 通过form.verify()来自定义校验规则
    form.verify({
        // 自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格' ],
        //校验两次密码不一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框的内容
            // 好需要拿到密码框的内容
            // 然后做一个判断
            // 如果不等于则return一个错误提示
            var pwd = $(".reg-box [name=password]").val();
            if(pwd !== value) {
                return '两次输入密码不一致!'
            }
        }
    });


    // 获取layui中的layer属性
    var layer = layui.layer;
    // 监听表单的提交事件
    $("#form_reg").on("submit", function(e) {
        //阻止提交表单的默认行为
        e.preventDefault();
        // 发起ajax的Post请求
        $.post('/api/reguser',
                { // 获取账号输入框 和密码输入框的内容 传给服务器
                    username: $(".reg-box [name=username]").val(),
                    password: $(".reg-box [name=password]").val()
                },
                function(res) {
                    //判断是否请求成功
                    if(res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 通过layer弹窗的形式提示用于是否注册成功
                    layer.msg('注册成功，请登录!');
                    // 如果注册成功则自动跳转到登录界面
                    $("#link-login").click();
                }
            );
    });


    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        //阻止默认行为
        e.preventDefault();
        // 使用ajax发起post请求
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log("success 1111111111111");
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功!");
                // 保存接口身份认证
                // console.log(res.token);
                localStorage.setItem("token", res.token)
                //跳转至主页面
                location.href = '/index.html';
            }
        
        })
    })


    
})






