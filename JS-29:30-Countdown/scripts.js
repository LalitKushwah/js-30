let countdownInterval;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const button = document.querySelectorAll('[data-time]');


button.forEach(btn => {
    btn.addEventListener('click', custTimer)
})

function custTimer() {
    timer(this.dataset.time);
}


function timer (seconds) {
    clearInterval(countdownInterval)
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdownInterval = setInterval(() => {
        const secondLeft = Math.round((then - Date.now())/1000);
        if (secondLeft < 0) {
            clearInterval(countdownInterval)
            return 
        }
        displayTimeLeft(secondLeft);
        
    }, 1000);
}

function displayTimeLeft(seconds) {
    const min = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    const dislplayTime = `${min}:${remainingSec < 10 ? '0': ''}${remainingSec}`;
    timerDisplay.textContent = dislplayTime;
    document.title = dislplayTime;    
}

function displayEndTime (timestamp) {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const mins = date.getMinutes();
    endTime.textContent = `Will be back at ${hour}:${mins < 10 ? '0' : ''}${mins}`
}

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    this.reset();
    timer(mins * 60);
})