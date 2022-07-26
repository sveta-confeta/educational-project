import React from 'react';
import loader from './../../image/loader.svg';

export const Preloader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={loader} alt={'preloader'}/>
        </div>
    );
};