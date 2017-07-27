window.onload = function () {
    var data = null;
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var vendoUrl = window.URL || window.webkitURL;
    canvas.style.display = "none";
    navigator.getMedia = navigator.getUserMedia||
        navigator.mozGetUserMedia||
        navigator.webkitGetUerMadia||
        navigator.msGetUserMedia;
    navigator.getMedia({
        video: true,
        audio: false
    }, function (stream){
        video.src = vendoUrl.createObjectURL(stream);
        video.play();
    }, function (error){
        alert("Rất tiếc đã có lỗi xảy ra. Có thể do bạn chưa cho phép bật Camera trên site này hoặc chưa mở https.")
    });
    document.getElementById("capture").addEventListener("click", function () {
        canvas.style.display = "block";
        context.drawImage(video, 0, 0, 400, 300);
        // lấy đường dẫn hình ảnh
        data = canvas.toDataURL();
        $.ajax({
            type: "POST",
            url: "saveimg.php",
            data: {
                imgBase64: data
            }
            // Sau khi gửi dữ liệu thành công thì sẽ thêm nút Đi tới link ảnh 
        }).done(function (result) {
            $('#container').append('<a href="' + result + '">Đi tới link ảnh</a>');
        });
    });
}