import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './index.css';
import socketClient from 'socket.io-client';


let cElement = null;
function Video(props) {
    const opts = {
        playerVars: {
            autoplay: 1
        }
    };

    useEffect(() => {
        if (cElement) {
            if (props.isPaused) {
                cElement.target.pauseVideo();
            } else {
                cElement.target.playVideo();
            }
        }
    }, [props.socket, props.isPaused]);

    useEffect(() => {
        // Effect only used when the prop value is changed
        if (cElement) {
            const payload = {
                'action': 'sync',
                'timestamp': cElement.target.getCurrentTime()
            };
            props.socket.emit('message', payload);
        }
    }, [props.socket, props.syncCounter]);

    props.socket.on('message', (message) => {
        console.log('from the video class' + message);
        if (message.action === 'sync' && cElement) {
            cElement.target.seekTo(message.timestamp);
        }
    })

    const _onReady = (e) => {
        cElement = e;
    };

    const _onStateChange = (e) => {
        cElement = e;
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

    const [isPaused, setIsPaused] = useState(false);
    const [syncCounter, incrementSyncCounter] = useState(0);

    const togglePause = () => {
        socket.emit('message', 'From togglePause in client')
        setIsPaused(!isPaused);
    };

    const sync = () => {
        socket.emit('message', 'Sync!');
        incrementSyncCounter(syncCounter+1);
    };

    const socket = socketClient('http://127.0.0.1:8080');
    let videoCode;
    if (videoUrl) {
        console.log(videoUrl);
        videoCode = videoUrl.split('v=')[1].split('&')[0];
    }

    socket.on('message', (message) => {
        console.log(message);
    });

    return (
        <div>
            <div>
                <h1>Video</h1>
                <div></div>
            </div>
            <div>
                <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

                <Video socket={socket} isPaused={isPaused} syncCounter={syncCounter} />
                <button onClick={togglePause}>Local Pause</button>

                <button onClick={sync}>Sync</button>
            </div>
        </div>
    )
}

export default Content;
