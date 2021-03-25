import React from 'react';

function Preseason() {

    const today = new Date();
    const firstDay = new Date("04/01/2021");
    const days = Math.ceil((firstDay.getTime() - today.getTime()) / (1000 * 3600 * 24));


    return (
        <div className="preseason">
            <h3>Baseball will be back in:</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ball-tennis mt-4 mb-4" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <path d="M6 5.3a9 9 0 0 1 0 13.4" />
                <path d="M18 5.3a9 9 0 0 0 0 13.4" />
            </svg>
            <h4>{days} days.</h4>
            
        </div>
    )
}

export default Preseason;