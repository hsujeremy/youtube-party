// Load IFrame Player API asynchronously
let tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an <iframe> and YouTube player after API downloads
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'Um8ECrrFXfk',
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Play video when ready
function onPlayerReady(event) {
    event.target.playVideo();
}

// // If video is playing, pause after 6 seconds
// let done = false;
// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }

// // Helper functions
// function stopVideo() {
//     player.stopVideo();
// }

function playPauseVideo() {
    state = player.getPlayerState();
    if (state === 1) {
        console.log(`Pause video at ${player.getCurrentTime()}`);
        player.pauseVideo();
    } else if (state === 2 || state === -1) {
        console.log(`Play video at ${player.getCurrentTime()}`);
        player.playVideo();
    }
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

const socket = io('ws://localhost:8080');

socket.on('message', (message) => {
    console.log(message.action);
    if (message.action === 'play') {
        player.playVideo();
        console.log(`Played at ${player.getCurrentTime()}`);
    } else if (message.action === 'pause') {
        player.pauseVideo();
        console.log(`Paused at ${player.getCurrentTime()}`);
    }
});

document.querySelector('#play').onclick = () => {
    socket.emit('message', {'action': 'play'})
};

document.querySelector('#pause').onclick = () => {
    socket.emit('message', {'action': 'pause'})
}
