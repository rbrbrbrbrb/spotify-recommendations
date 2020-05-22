import React, {useState, useEffect} from 'react';
import Filter from './Filter'
import Song from './Song'
import Seed from './Seed'

const initialParamsState = {
    valence: 50,
    danceability: 50,
    energy: 50,
    popularity: 50,
    instrumentalness: 50,
    liveness: 50,
};

const initialSeedsState = {
    artist_seed: '',
    genre_seed: '',
    track_seed: ''
}

const Home = (props) => {
    const [genrepool, setGenrePool] = useState([]);
    const [filter_params, setFilterParams] = useState(initialParamsState);
    const [seeds, setSeeds] = useState(initialSeedsState);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        //test spotify api call
        //get genre seeds
        //let token = props.token;

        //fetch(
        //    'https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        //        headers: {
        //            Authorization: `Bearer ${token}`
        //        }
        //    }
        //)
        //.then(res => res.json())
        //.then(json => {
        //    console.log(json.genres);
        //    setGenrePool(json.genres);
        //});
        //fetchSongs();
    }, [props.token]);

    const fetchSongs = () => {
        //create query string
        let {token} = props;
        
        let artist_q = seeds.artist_seed !== '' ? 'seed_artists=' + seeds.artist_seed : ''
        let genre_q = seeds.genre_seed !== '' ? 'seed_genres=' + seeds.genre_seed : ''
        let track_q = seeds.track_seed !== '' ? 'seed_tracks=' + seeds.track_seed : ''
        let qstringseeds = artist_q + genre_q + track_q
        let qstringparams = Object.keys(filter_params).map((k) => {
            let passval = k !== 'popularity' ? filter_params[k]/100 : filter_params[k];
            return `target_${k}=${passval}`;
        }).join('&');
        let qstringdebug = 'seed_artists=5vBSrE1xujD2FXYRarbAXc&target_valence=0.05';
        let full_url = 'https://api.spotify.com/v1/recommendations?' + qstringseeds + '&' + qstringparams;
        console.log(full_url);
        //fetch
        fetch(
            full_url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setSongs(json.tracks);
        })
    }

    const onChangeParam = (key, val) => {
        setFilterParams({
            ...filter_params,
            [key]: val
        });
    }

    const onChangeSeed = (key,val) => {
        setSeeds({
            ...seeds,
            [key]: val
        })
    }
    return (
        <div className="container">
            <h2>Get Spotify recommendation based on...</h2>
            <div className="selectors-row">
                <Filter
                    filter_field={'valence'}
                    val={filter_params.valence}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />

                <Filter
                    filter_field={'danceability'}
                    val={filter_params.danceability}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />

                <Filter
                    filter_field={'energy'}
                    val={filter_params.energy}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />
            </div>
            <div className="selectors-row">
                <Filter
                    filter_field={'popularity'}
                    val={filter_params.popularity}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />
            
                <Filter
                    filter_field={'instrumentalness'}
                    val={filter_params.instrumentalness}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />

                <Filter
                    filter_field={'liveness'}
                    val={filter_params.liveness}
                    onChangeParam={onChangeParam}
                    description={
                        '...'
                    }
                />

            </div>
            <div className="selectors-row">
                <Seed 
                    filter_field={'track_seed'}
                    val={filter_params.track_seed}
                    onChangeSeed={onChangeSeed}
                />
                <Seed 
                    filter_field={'artist_seed'}
                    val={filter_params.artist_seed}
                    onChangeSeed={onChangeSeed}
                />
                <Seed
                    filter_field={'genre_seed'}
                    val={filter_params.genre_seed}
                    onChangeSeed={onChangeSeed}
                />
            </div>
            <div>
                <button onClick={fetchSongs}>
                    Get recommendations
                </button>
            </div>
            <div>
                {songs.map(s => <Song track={s} key={s.id} />)}
            </div>
        </div>
    );
}


export default Home;
