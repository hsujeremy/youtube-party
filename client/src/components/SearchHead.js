import React from 'react';

function SearchHead(props) {
  return (
    <div>
      <div>
        <h1>YouTube Party</h1>
        <div></div>
      </div>
      <div>
        <label>
          Video URL: <input
                       value={props.videoUrl}
                       onChange={(e) => props.onVideoUrlChange(e.target.value)}
                     />
        </label>
      </div>
    </div>
  );
};

export default SearchHead;
