import React from 'react';
import YouTube from 'react-youtube';
import { socket } from '../services/socket';

let event = null;
const Video = (props) => {
    const opts = {
        playerVars: {
            autoplay: 1
        }
    };

    React.useEffect(() => {
        if (event) {
            socket.emit('message', {
                'action': 'playpause',
                'state': event.target.getPlayerState()
            });
        }
    }, [props.playPauseCounter]);

    React.useEffect(() => {
        if (event) {
            event.target.pauseVideo();
            socket.emit('message', {
                'action': 'sync',
                'timestamp': event.target.getCurrentTime()
            });
        }
    }, [props.syncCounter]);

    socket.on('message', (message) => {
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
};

export default Video;
