
function showVideo() {
	var videoBlock = document.getElementById("video-block");
	videoBlock.className = videoBlock.className.replace("hidden", "video-block");
}


//видео поток
function videoStream(){
	// var canvas = document.getElementById("image-block"),
	// 	context = canvas.getContext("2d"),
	var	video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Ошибка видео захвата: ", error.code);
		};
	var constraints = { audio: false, video: { width: 800, height: 600 } };
	navigator.getUserMedia = (navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia);
	// Подключение потока
	// if(navigator.getUserMedia) { // WebKit-prefixed
	// 	navigator.webkitGetUserMedia(videoObj, function(stream){
	// 		video.src = window.webkitURL.createObjectURL(stream);
	// 		video.play();
	// 		video.onloadedmetadata = function(e) {
	// 			video.play();
	// 		};
	// 		document.getElementById('stop').click(function() { // остановка видео захвата
	// 			video.pause(); //пауза
	// 			video.mozSrcObject = null;
	// 			mediaStream.getVideoTracks()[0].stop(); // стоп камеры на устройстве
	// 		});
	// 		document.getElementById('pause').click(function() { // пауза видео захвата
	// 			video.pause(); //пауза
	// 		});
	// 		document.getElementById('play').click(function() {
	// 			video.play();
	// 		});
	// 	}, errBack);
	// } else if (navigator.mediaDevices.getUserMedia ) { // видео поток для Moz
		navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
			video.srcObject = mediaStream;
			console.log(mediaStream);
			document.getElementById('stop').onclick = function () { // остановка видео захвата
				video.pause(); //пауза
				video.mozSrcObject = null;
				mediaStream.getVideoTracks()[0].stop(); // стоп камеры на устройстве
			}
			document.getElementById('pause').onclick = function () { // пауза видео захвата
				video.pause(); //пауза
			}
			document.getElementById('play').onclick = function () {
				video.play();
			}

		});

}