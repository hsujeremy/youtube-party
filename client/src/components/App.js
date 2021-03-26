import React from 'react';
import SearchHead from './SearchHead.js';
import Video from './Video.js';
import UserCount from './UserCount';
import { socket } from '../services/socket';


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

    let videoCode;
    if (videoUrl) {
        try {
            videoCode = videoUrl.split('v=')[1].split('&')[0];
        } catch(TypeError) {
            return (
                <div>
                    <SearchHead videoUrl={videoUrl} onVideoUrlChange={(url) => setVideoUrl(url)} />
                    <UserCount />
                    <p>Please enter a valid URL</p>
                </div>
            );
        }

        return (
            <div>
                <SearchHead videoUrl={videoUrl} onVideoUrlChange={(url) => setVideoUrl(url)} />
                <UserCount />
                <Video
                    videoId={videoCode}
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
            <UserCount />
        </div>
    );
};

export default App;
