import React from 'react';
import socketClient from 'socket.io-client';
import SearchHead from './SearchHead.js';
import Video from './Video.js';


const App = () => {
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
        try {
            videoCode = videoUrl.split('v=')[1].split('&')[0];
        } catch(TypeError) {
            return (
                <div>
                    <SearchHead videoUrl={videoUrl} onVideoUrlChange={(url) => setVideoUrl(url)} />
                    <p>Please enter a valid URL</p>
                </div>
            );
        }

        return (
            <div>
                <SearchHead videoUrl={videoUrl} onVideoUrlChange={(url) => setVideoUrl(url)} />
                    <Video
                        videoId={videoCode}
                        socket={socket}
                        playPauseCounter={playPauseCounter}
                        syncCounter={syncCounter}
                    />

                    <button onClick={togglePause}>Play/Pause</button>
                    <button onClick={sync}>Sync</button>
            </div>
        );
    }
    return (
        <div>
            <SearchHead videoUrl={videoUrl} onVideoUrlChange={(url) => setVideoUrl(url)} />
        </div>
    );
};

export default App;
