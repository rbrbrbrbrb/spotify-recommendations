import React, {useState, useEffect} from 'react';

const initialParamsState = {
    min_valence: 0,
    max_valence: 1,
    min_danceability: 0,
    max_danceability: 1,
    min_energy: 0,
    max_energy: 1,
    min_popularity: 0,
    max_popularity: 100,
    min_instrumentalness: 0,
    max_instrumentalness: 1,
    min_liveness: 0,
    max_liveness: 1
};

const Home = (props) => {
    const [genrepool, setGenrePool] = useState([]);
    const [filter_params, setFilterParams] = useState(initialParamsState);

    useEffect(() => {
        //test spotify api call
        //get genre seeds
        let token = props.token;
        fetch(
            'https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then(json => {
            console.log(json.genres);
            setGenrePool(json.genres);
        });
    }, [props.token]);

    const onChangeParam = (key, val) => {
        setFilterParams({
            ...filter_params,
            [key]: val
        });
    }
    return (
        <div className="container">
            <h2>Get Spotify recommendation based on...</h2>
            <div className="selectors-row">
                <div className="selector valence">
                    <h4>Valence</h4>
                    <p>
                        A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
                    </p>
                    <div>
                        Minimum:
                            <input
                                type="textbox"
                                className="number-input"
                                value={filter_params.min_valence}
                                onChange={(e) => onChangeParam('min_valence', e.target.value)}
                            />
                    </div>
                    <div>
                    Maximum:  <input type="textbox" />
                    </div>
                </div>
                <div className="selector danceablility">
                    Minimum:  <input type="textbox" />
                    Maximum:  <input type="textbox" />
                </div>
            </div>
        </div>
    );
}

export default Home;
