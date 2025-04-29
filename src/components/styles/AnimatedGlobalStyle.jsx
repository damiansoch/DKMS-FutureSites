import React, {useEffect} from 'react';
import animatedHomeBcg from '../../assets/background.png'; // Adjust path

export const AnimatedGlobalStyle = () => {
    useEffect(() => {
        const body = document.body;

        body.style.lineHeight = '1.6';
        body.style.fontWeight = '400';
        body.style.margin = '0';
        body.style.padding = '0';
        body.style.backgroundImage = `url(${animatedHomeBcg})`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
        body.style.color = 'white';

        const style = document.createElement('style');
        style.innerHTML = `
            html, body, * {
                font-family: 'Patrick Hand', cursive !important;
                font-size: 18px;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                line-height: 1.6;
            }

            body, button, a {
                cursor: none;
            }
        `;
        style.setAttribute('data-animated-style', 'true');
        document.head.appendChild(style);

        // Cleanup when unmounted
        return () => {
            document.head.querySelector('[data-animated-style]')?.remove();
            body.removeAttribute('style'); // reset body's inline styles
        };
    }, []);

    return null; // This component doesn't render anything
};

export const ProfessionalGlobalStyle = () => {
    useEffect(() => {
        const body = document.body;

        body.style.lineHeight = '1.6';
        body.style.fontWeight = '400';
        body.style.margin = '0';
        body.style.padding = '0';
        body.style.background = 'white'; // fallback color
        // body.style.background = '#ADA996'; // fallback color
        // body.style.background = '-webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)';
        // body.style.background = 'linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)';
        body.style.color = 'black';


        // Cleanup when unmounted
        return () => {
            document.head.querySelector('[data-animated-style]')?.remove();
            body.removeAttribute('style'); // reset body's inline styles
        };
    }, []);

    return null; // This component doesn't render anything
};


