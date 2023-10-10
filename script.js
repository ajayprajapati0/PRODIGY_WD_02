let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];
let timerInterval;

function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    document.querySelector('button').textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1); // Update every millisecond
    document.querySelector('button').textContent = 'Pause';
  }
  isRunning = !isRunning;
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  const formattedTime = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
  document.getElementById('time').textContent = formattedTime;
}

function pad(num, size) {
  return ('000' + num).slice(-size);
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime(elapsedTime);
  isRunning = false;
  document.querySelector('button').textContent = 'Start';
  laps = [];
  document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
      const lapTime = elapsedTime;
      laps.push(lapTime);
      const lapElement = document.createElement('li');
      lapElement.textContent = `Lap ${laps.length} | ${formatMilliseconds(lapTime)}`;
      const lapList = document.getElementById('laps');
      lapList.appendChild(lapElement);
  
      if (lapList.scrollHeight > lapList.clientHeight) {
        const lapElementHeight = lapElement.offsetHeight;
        lapList.scrollTop = lapList.scrollHeight - lapList.clientHeight + lapElementHeight;
      }
    }
  }
  
  
  function formatMilliseconds(milliseconds) {
    const formattedMilliseconds = pad(milliseconds % 1000, 3);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);
  
    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}:${formattedMilliseconds}`;
  }
