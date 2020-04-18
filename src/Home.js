import React, {useState, useEffect} from 'react';


const Home = (props) => {
    const [genres, setGenres] = useState([]);

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
            setGenres(json.genres);
        });
    }, [props.token]);

    return (
        <div>placeholder</div>
    );
}

export default Home;
