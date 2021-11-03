// YouTube Player
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var playerVars = {
  rel: 0,
  controls: 0,
  showinfo: 0,
  iv_load_policy: 3,
  playsinline: 1,
  wmode: "transparent",
  mute: 1,
};
var onYouTubeIframeAPIReady = () => {
  bgplayer = new YT.Player("bgplayer", {
    height: "360",
    width: "640",
    videoId: "FYVfMMII71Q", //TyLS4HXfP60
    playerVars: playerVars,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

function onPlayerReady() {
  playVideo();
}

function onPlayerStateChange(event) {
  var status = event.target.getPlayerState();
  switch (status) {
    case YT.PlayerState.ENDED:
      playVideo();
      break;
    case YT.PlayerState.PLAYING:
      break;
  }
}

function getWindowSize() {
  const winw = window.innerWidth;
  const winh = window.innerHeight;
  // console.log("Width:" + winw + " Height: " + winh);

  let vh = winh;
  let vw = Math.floor((vh / 1080) * 1920);
  let offsetx = Math.floor((winw - vw) / 2);
  let offsety = 0;

  if (offsetx > 0) {
    vw = winw;
    vh = Math.floor((vw / 1920) * 1080);
    offsetx = 0;
    offsety = Math.floor((winh - vh) / 2);
  }

  //console.log("vw:" + vw + " vh: " + vh);

  bg.style.height = vh + "px";
  bg.style.width = vw + "px";
  bg.style.left = offsetx + "px";
  bg.style.top = offsety + "px";
}

function playVideo() {
  getWindowSize();
  bgplayer.setPlaybackQuality("hd1080");
  bgplayer.mute();
  bgplayer.playVideo();

}

var resizeFunc = {};
var resizetimer = null;
var resize = function(delay){
  delay = 200;
  clearTimeout(resizetimer);
  resizetimer = setTimeout(function(){
    getWindowSize()
    for(var i in resizeFunc){
      resizeFunc[i]();
      //console.log("resizeFunc:"+i);
    }
  },delay);
}
window.addEventListener("resize",resize);
resize();