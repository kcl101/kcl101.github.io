  var canvas = document.querySelector('#canvas');
  var context = canvas.getContext('2d');

var video = document.querySelector('#video');
  var videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

 var pano = document.querySelector('#pano');
  pano.object3D.material.map = videoTexture;

  var artoolkit = new ARToolKit({
    canvasWidth: 640,
    canvasHeight: 480,
    debug: false,
    onSuccess: function() {
      artoolkit.process(context.getImageData(0, 0, 640, 480));
    }
  });


function tick() {
  requestAnimationFrame(tick);

  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  context.drawImage(video, 0, 0, 640, 480);
}

function onResize() {
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize, false);

onResize();
tick();