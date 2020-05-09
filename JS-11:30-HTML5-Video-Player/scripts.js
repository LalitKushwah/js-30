/** Get Dom Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

/** Perform operations */
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateIcon () {
    const icon = this.paused ? '►' : '||'
    toggle.textContent = icon;
}

function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {    
    video[this.name] = this.value;
}

function handleProgressBar() {
    const percentage = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub (e) {
    console.log('=============');
    
    const time = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = time;
}

/** event listener */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', handleProgressBar);
skipButtons.forEach(btn => btn.addEventListener('click', skipVideo));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = false);

  
