$(function() {
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 用户点击上传按钮，实现选择图片文件的操作
    $("#btnChooseImage").on("click", function(e) {
        $("#file").click();
    })

    // 文件选择框绑定change事件
    $("#file").on("change", function(e) {
        var filelist = e.target.files;
        if(filelist.length === 0) {
            return;
        }
        // 1.拿到用户选择的文件 
        var file = e.target.files[0];
        // 2.根据选择的文件，创建一个URL地址
        var newImgURL = URL.createObjectURL(file);
        // 3.先销毁就的裁剪区域，再设置图片路径，之后再创建新的裁剪区域
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })

    // 点击确定按钮更换头像
    $("#btnUpload").on("click", function(e) {
        var dataURL = $image
                    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                            width: 100,
                            height: 100
                        })
                    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
    
        // 调用ajax将更换的头像上传到服务器上
        $.ajax({
            method:"POST",
            url:"/my/update/avatar",
            data:{
                avatar: dataURL
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg("更换头像失败！");
                }
                layer.msg("更换头像成功！");
                // 重新渲染页面头像
                window.parent.getUserInfo();
            }
        })
    
    })



})
