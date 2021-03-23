import React from 'react';
import socketClient from 'socket.io-client';
import Video from './Video.js';
import './index.css';


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
                    <div>
                        <h1>YouTube Party</h1>
                        <div></div>
                    </div>
                    <div>
                        <label>
                            Video URL: <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                        </label>
                    </div>
                    <p>Please enter a valid URL</p>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <h1>YouTube Party</h1>
                    <div></div>
                </div>
                <div>
                    <label>
                        Video URL: <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                    </label>

                    <Video
                        videoId={videoCode}
                        socket={socket}
                        playPauseCounter={playPauseCounter}
                        syncCounter={syncCounter}
                    />

                    <button onClick={togglePause}>Play/Pause</button>

                    <button onClick={sync}>Sync</button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div>
                <h1>YouTube Party</h1>
                <div></div>
            </div>
            <div>
                <label>
                    Video URL: <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                </label>
            </div>
        </div>
    );
};

export default App;
