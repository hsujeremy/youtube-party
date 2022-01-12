import { useEffect } from 'react';
import YouTube from 'react-youtube';
import { socket } from '../services/socket';

let event = null;
function Video(props) {
  const opts = {
    playerVars: {
      autoplay: 1
    }
  };

  useEffect(() => {
    if (event) {
      socket.emit('message', {
        'action': 'playpause',
        'state': event.target.getPlayerState()
      });
    }
  }, [props.playPauseCounter]);

  useEffect(() => {
    if (event) {
      event.target.pauseVideo();
      socket.emit('message', {
        'action': 'sync',
        'timestamp': event.target.getCurrentTime()
      });
    }
  }, [props.syncCounter]);

  useEffect(() => {
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
  });

  const onReady = (e) => {
    event = e;
  };

  const onStateChange = (e) => {
    event = e;
  };

  console.log(props);

  return (
    <YouTube
      videoId={props.videoId}
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
};

export default Video;
