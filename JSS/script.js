// select the unordered list which will contain each song item.
let musicBoxes = document.querySelectorAll(".album__player");

//Because there is multiple elements with the class .album__player, go through every element.

const changeId = (el, nameId) => {
  if (el.nodeName !== "LI") {
    el.parentNode.id = nameId;
  } else {
    el.id = nameId;
  }
};

const changeIconToPause = (el) => {
  let currentImg;
  if (el.nodeName === "IMG") {
    currentImg = el;
  } else if (el.nodeName === "SPAN") {
    currentImg = el.parentNode.querySelector(".play-pause-btn");
  } else {
    currentImg = el.querySelector(".play-pause-btn");
  }
  currentImg.src = "../img/pause.png";
};

const changeIconToPlay = (el) => {
  let currentImg;
  if (el.nodeName === "IMG") {
    currentImg = el;
  } else if (el.nodeName === "SPAN") {
    currentImg = el.parentNode.querySelector(".play-pause-btn");
  } else {
    currentImg = el.querySelector(".play-pause-btn");
  }
  currentImg.src = "../img/play.png";
};

//songSrc is the source of the song that is going to be played.
//audioPlayer is the song that is currently being used.
for (const musicBox of musicBoxes) {
  musicBox.addEventListener("click", function (e) {
    const elementFirstClassName = e.target.className.split(" ")[0];
    if (elementFirstClassName !== "album__player") {
      console.log("estoy acá");
      let songSrc;
      if (e.target.nodeName !== "LI") {
        songSrc = e.target.parentNode.getAttribute("data-src");
      } else {
        songSrc = e.target.getAttribute("data-src");
      }

      let audioPlayer = document.querySelector("#player");
      //checks if there is a song or not.
      if (audioPlayer) {
        //checks if the current song is different from the song clicked by the user.
        if (songSrc === audioPlayer.getAttribute("src")) {
          if (audioPlayer.paused) {
            audioPlayer.play();
            changeId(e.target, "playing");
            changeIconToPause(e.target);
          } else {
            audioPlayer.pause();
            changeId(e.target, "paused");
            changeIconToPlay(e.target);
          }
        } else {
          audioPlayer.src = songSrc;
          audioPlayer.play();
          changeIconToPause(e.target);

          if (document.querySelector("#playing")) {
            changeIconToPlay(document.querySelector("#playing"));
            document.querySelector("#playing").id = "";
          } else if (document.querySelector("#paused")) {
            document.querySelector("#paused").id = "";
          }
          changeId(e.target, "playing");
        }
      } else {
        let audioPlayer = document.createElement("audio");
        audioPlayer.src = songSrc;
        //setting an id of player, help us identifying the current song playing
        audioPlayer.id = "player";
        changeId(e.target, "playing");
        document.body.appendChild(audioPlayer);
        audioPlayer.play();
        changeIconToPause(e.target);
        //event when a multimedia file ended playing
        audioPlayer.addEventListener("ended", function () {
          document.body.removeChild(audioPlayer);
          changeId(e.target, "");
        });
      }
    }
  });
}
