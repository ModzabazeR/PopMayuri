// References to DOM elements
const popmayuri = document.querySelector(".popmayuri");
const btn = document.querySelector("#btn");
const bg = document.querySelector(".inner");
const body = document.querySelector(".body");
let score = getCookie("0");
document.getElementById("score").innerHTML = score;

// The images of Mayuri
const specialImg = "./images/special.png";
const normalImg = "./images/normal.png";
const blankImg = "./images/blank.png";

// The sound effects
const tutturuSound = new Audio("./sound/tutturu.mp3");
const tutturuSong = new Audio("./sound/tutturu-song-1.mp3");
const testSong = new Audio("./sound/TEST.mp3");

// Event Handlers (Desktops)
btn.addEventListener("click", playTutturu);
tutturuSound.addEventListener("ended", changeImg);
tutturuSong.addEventListener("ended", changeImg);
testSong.addEventListener("ended", changeImg);

// Event Handers (Touch Screens)
btn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  playTutturu();
});

// The functions which will perform the cool stuff
function playTutturu() {
  playVideo();
  score = Number(score) + 1;
  setCookie("0", score);
  document.getElementById("score").innerHTML = score;
  tutturuSound.currentTime = 0;

  if (score % 1000 == 0) {
    popmayuri.src = blankImg;
    document.querySelector(".bg").style.display = "block";
    btn.disabled = true;
    document.getElementById("score").style.color = "gray";
    testSong.play();
  } else if (score % 100 == 0) {
    popmayuri.src = specialImg;
    body.className = "body rainbow";
    popmayuri.className = "popmayuri popmayuri-spin";
    document.querySelector(".bg").style.display = "none";
    tutturuSong.play();
  } else {
    popmayuri.classList.toggle("popmayuri-shake");
    setTimeout(() => {
      popmayuri.classList.toggle("popmayuri-shake");
    }, 500);
    popmayuri.src = specialImg;

    tutturuSound.play();
  }
}

function changeImg() {
  // If testSong is playing
  if (!testSong.paused) {
    popmayuri.src = blankImg;
  }
  // If tutturuSong is playing
  else if (!tutturuSong.paused) {
    popmayuri.src = specialImg;
  }
  // If none of special sound is playing
  else {
    popmayuri.src = normalImg;
    body.className = "body";
    popmayuri.className = "popmayuri";
    btn.disabled = false;
    document.querySelector(".bg").style.display = "none";
    document.getElementById("score").style.color = "white";
  }
}

// Handle cookies
function setCookie(cscore, cvalue) {
  document.cookie = cscore + "=" + cvalue;
}

function getCookie(cscore) {
  let pname = cscore + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(pname) == 0) {
      return c.substring(pname.length, c.length);
    }
  }
  return "0";
}
