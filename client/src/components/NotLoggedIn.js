import React from 'react';

const NotLoggedIn = ({ findEnv }) => (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <a
            href={findEnv()}
            style={{
                width: '300px',
                padding: '10px 20px',
                backgroundColor: '#343A40',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#FFF'
            }}
        >
            Entrar com Spotify
        </a>
    </section>
);

export default NotLoggedIn;
