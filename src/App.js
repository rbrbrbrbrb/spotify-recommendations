import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import { scopes } from './constants';
import Home from './Home';
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000';

const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});

window.location.hash = "";

function App(props) {
    const [token, setToken] = useState(null);
    useEffect(() => {
        let _token = hash.access_token;
        if(_token) {
            setToken(_token);
        }
    }, []);
  return (
    <div className="App">
        <header className="App-header">
            {!token && (
                <a
                    className="btn btn--loginApp-link"
                    href={`${authEndpoint}?client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                    Login to Spotify
                </a>
            )}
            {token && (
                <Home
                    token={token}
                />
            )}
        </header>
    </div>
  );
}

export default App;
