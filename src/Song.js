import React from 'react';

const Song = (props) => {

    let {name, artists, album, href} = props.track
    return(
        <div className="songbox">
            <h5>
                <a href={href} target="_blank">{name}</a>
            </h5>
            <p>
                {artists.map(a => a.name).join(', ')}
            </p>
            <p>
                {album.name}
            </p>
        </div>
    )
}

export default Song;
