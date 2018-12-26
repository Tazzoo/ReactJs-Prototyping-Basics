import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
    flex-grow: 1;
`;

const Info = props => (
    <InfoContainer className='card rl-card col-lg-4 mx-auto'>
        <div className='card-body'>
            <h5 className='card-text'>Musica [Popularidade]</h5>
        </div>
    </InfoContainer>
);

export default Info;
