import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { getParamValues } from '../../utils/functions';

const CLIENT_ID = '2b81e6dfb88446ee8541d8daf9d1afcc';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'http://localhost:3000/spotify/callback/';

const SpotifyLogin = () => {

    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type,
            } = getParamValues(window.location.hash);

            localStorage.clear();
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('tokenType', token_type)
            localStorage.setItem('expiry_time', new Date().getTime() + expires_in * 1000);

            window.location = 'http://localhost:3000/albums/add/';
        }
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&show_dialog=true`;
    }

    return (
        <div className='container'>
            <p className='form-label'>To add an album login to spotify.</p>
            <Button onClick={handleLogin} className="btn btn-warning">
                Login to Spotify
            </Button>
        </div>
    );
}

export default SpotifyLogin