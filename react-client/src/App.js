import React from 'react';
import YouTube from 'react-youtube';
import './index.css';
import socketClient from 'socket.io-client';


let event = null;
function Video(props) {
    const opts = {
        playerVars: {
            autoplay: 1
        }
    };

    React.useEffect(() => {
        if (event) {
            // if (props.isPaused) {
            //     event.target.pauseVideo();
            // } else {
            //     event.target.playVideo();
            // }
            console.log(event.target.getPlayerState());
            const payload = {
                'action': 'playpause',
                'state': event.target.getPlayerState()
            };
            props.socket.emit('message', payload);
        }
    }, [props.playPauseCounter]);

    React.useEffect(() => {
        if (event) {
            event.target.pauseVideo();
            const payload = {
                'action': 'sync',
                'timestamp': event.target.getCurrentTime()
            };
            props.socket.emit('message', payload);
        }
    }, [props.syncCounter]);

    React.useEffect(() => {
        console.log('called effect')
        if (event) {
            event.target.playVideo();
        }
    }, [props.playCounter]);

    React.useEffect(() => {
        if (event) {
            event.target.pauseVideo();
        }
    }, [props.pauseCounter]);

    props.socket.on('message', (message) => {
        if (message.action === 'sync' && event) {
            event.target.seekTo(message.timestamp);
            event.target.pauseVideo();
            event.target.playVideo();
        } else if (message.action === 'playpause' && event) {
            if (message.state === 1) {
                event.target.pauseVideo();
            } else {
                event.target.playVideo();
            }
        }
    });

    const _onReady = (e) => {
        event = e;
    };

    const _onStateChange = (e) => {
        event = e;
    };

    return (
        <YouTube
            videoId={'1BfCnjr_Vjg'}
            opts={opts}
            onReady={_onReady}
            onStateChange={_onStateChange}
        />
    );
}

function Content() {
    const [videoUrl, setVideoUrl] = React.useState('');

    const [isPaused, setIsPaused] = React.useState(false);
    const [playPauseCounter, incrementPlayPauseCounter] = React.useState(0);
    const [syncCounter, incrementSyncCounter] = React.useState(0);

    const [playCounter, incrementPlayCounter] = React.useState(0);
    const [pauseCounter, incrementPauseCounter] = React.useState(0);

    const togglePause = () => {
        socket.emit('message', 'From togglePause in client')
        setIsPaused(!isPaused);
        incrementPlayPauseCounter(playPauseCounter + 1);
    };

    const sync = () => {
        socket.emit('message', 'Sync!');
        incrementSyncCounter(syncCounter + 1);
    };

    const playVideo = () => {
        incrementPlayCounter(playCounter + 1);
    };

    const pauseVideo = () => {
        incrementPauseCounter(pauseCounter + 1);
    };

    const socket = socketClient('http://127.0.0.1:8080');
    let videoCode;
    if (videoUrl) {
        console.log(videoUrl);
        videoCode = videoUrl.split('v=')[1].split('&')[0];
    }

    return (
        <div>
            <div>
                <h1>Video</h1>
                <div></div>
            </div>
            <div>
                <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

                <Video socket={socket} isPaused={isPaused} playPauseCounter={playPauseCounter} syncCounter={syncCounter} playCounter={playCounter} pauseCounter={pauseCounter} />
                <button onClick={togglePause}>Play/Pause</button>

                <button onClick={sync}>Sync</button>
            </div>
        </div>
    )
}

export default Content;
