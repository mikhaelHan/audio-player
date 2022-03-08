console.log('hello');
//==================================================================================
const singerName = document.querySelector('.player-container__singer');
const trackName = document.querySelector('.player-container__track');
const bgPlayer = document.querySelector('.player-container__non-functional-part');
const audio = document.querySelector('.audio');
const play = document.querySelector('.player-container__box-play');
const pause = document.querySelector('.player-container__box-pause');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
const progress = document.querySelector('.condition-all-progress__progress');
const timeLine = document.querySelector('.condition-all-progress');
const showCurrentTime = document.querySelector('.condition-current-time');
const showAllTime = document.querySelector('.condition-all-time');

let isPlay = false;
let playNum = 0;

//==================================================================================
/* play - pause */
function playAudio() {
	play.classList.add('non-activ');
	pause.classList.remove('non-activ');
	// audio.currentTime = 0;
	audio.play();
	imageUp()
}

function pauseAudio() {
	pause.classList.add('non-activ');
	play.classList.remove('non-activ');
	audio.pause();
	imageDown()
}

function playing() {
	if (!isPlay) {
		playAudio();
		isPlay = true;
	}
	else {
		pauseAudio();
		isPlay = false;
	}
}

/* change image */
function imageUp() {
	bgPlayer.style.backgroundPosition = '40% 20%';
	bgPlayer.style.backgroundSize = '120%';
}
function imageDown() {
	bgPlayer.style.backgroundPosition = '0 0';
	bgPlayer.style.backgroundSize = '100%';
}

play.addEventListener('click', playing);
pause.addEventListener('click', playing);

/* play next - prev */
function playNext() {
	imageDown()
	playNum++;
	if (playNum > 3) { playNum = 0 }
	audio.src = `assets/muz/${playNum}.mp3`;
	bgPlayer.style.backgroundImage = `url('assets/img/muzBg/${playNum}.jpg')`;
	isPlay = false;
	addTrackName()
	playing();
}

function playPrev() {
	imageDown()
	playNum--;
	if (playNum < 0) { playNum = 3 }
	audio.src = `assets/muz/${playNum}.mp3`;
	bgPlayer.style.backgroundImage = `url('assets/img/muzBg/${playNum}.jpg')`;
	isPlay = false;
	addTrackName()
	playing();
}

back.addEventListener('click', playPrev);
forward.addEventListener('click', playNext);

/* add name track */
function addTrackName() {
	if (playNum === 0) {
		singerName.innerHTML = 'Prodigy';
		trackName.innerHTML = 'Roadblox';
	}
	else if (playNum === 1) {
		singerName.innerHTML = 'Prodigy';
		trackName.innerHTML = 'Their Law';
	}
	else if (playNum === 2) {
		singerName.innerHTML = 'Linkin Park';
		trackName.innerHTML = 'Faint';
	}
	else if (playNum === 3) {
		singerName.innerHTML = 'Him';
		trackName.innerHTML = 'Join me';
	}
	else {
		singerName.innerHTML = 'Attention Error';
		trackName.innerHTML = '';
	}
}

/* change progress - bar and show time */
function progressUpdate() {

	showAllTime.textContent = `${Math.floor(audio.duration % 60)}` < 10 ? `0${Math.floor(audio.duration / 60)}:0${Math.floor(audio.duration % 60)}` : `0${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`;

	showCurrentTime.textContent = `${Math.floor(audio.currentTime % 60)}` < 10 ? `0${Math.floor(audio.currentTime / 60)}:0${Math.floor(audio.currentTime % 60)}` : `0${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}`;

	progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;

	if (progress.style.width === `${(audio.duration / audio.duration) * 100}%`) {
		playNext()
	}
}
audio.ontimeupdate = progressUpdate;

timeLine.addEventListener("click", e => {
	if (!isPlay) { playing() }
	const timelineWidth = window.getComputedStyle(timeLine).width;
	audio.currentTime = e.offsetX / parseInt(timelineWidth) * audio.duration;
});



