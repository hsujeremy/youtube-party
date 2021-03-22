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
            props.socket.emit('message', {
                'action': 'playpause',
                'state': event.target.getPlayerState()
            });
        }
    }, [props.playPauseCounter]);

    React.useEffect(() => {
        if (event) {
            event.target.pauseVideo();
            props.socket.emit('message', {
                'action': 'sync',
                'timestamp': event.target.getCurrentTime()
            });
        }
    }, [props.syncCounter]);

    props.socket.on('message', (message) => {
        if (event) {
            if (message.action === 'sync') {
                event.target.seekTo(message.timestamp);
                event.target.pauseVideo();
                event.target.playVideo();
            } else if (message.action === 'playpause') {
                if (message.state === 1) {
                    event.target.pauseVideo();
                } else {
                    event.target.playVideo();
                }
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
            videoId={props.videoId}
            opts={opts}
            onReady={_onReady}
            onStateChange={_onStateChange}
        />
    );
}

function App() {
    const [videoUrl, setVideoUrl] = React.useState('');

    const [playPauseCounter, incrementPlayPauseCounter] = React.useState(0);
    const [syncCounter, incrementSyncCounter] = React.useState(0);

    const togglePause = () => {
        incrementPlayPauseCounter(playPauseCounter + 1);
    };

    const sync = () => {
        incrementSyncCounter(syncCounter + 1);
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

                <Video
                    videoId={'1BfCnjr_Vjg'}
                    socket={socket}
                    playPauseCounter={playPauseCounter}
                    syncCounter={syncCounter}
                />

                <button onClick={togglePause}>Play/Pause</button>

                <button onClick={sync}>Sync</button>
            </div>
        </div>
    )
}

export default App;
