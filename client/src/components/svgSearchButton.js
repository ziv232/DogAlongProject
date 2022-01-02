import React from 'react';
import '../css/svgSearchButton.css';



function SvgSearchButton(){
    return(
    <svg className='svgSearchButton' id="Flat" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
        <circle cx="208" cy="224" fill="#3397e8" r="200"/>
        <g fill="#88c791">
            <path d="m104 104a15.979 15.979 0 0 1 16-16h32a16 16 0 1 1 0 32h-32a16 16 0 0 1 -16-16z"/>
            <path d="m200 200a16 16 0 0 1 -16 16h-64v16a16 16 0 0 1 -16 16h-16a16 16 0 0 0 0 32h56a16 16 0 0 1 0 32h-115.65a200.618 200.618 0 0 1 -7-160h114.65a16 16 0 0 1 16 16v16h32a15.979 15.979 0 0 1 16 16z"/>
            <path d="m280 37.35v34.65a16 16 0 0 1 -16 16h-48a16 16 0 1 1 0-32 16 16 0 0 0 16-16v-14.57a198.439 198.439 0 0 1 48 11.92z"/>
            <path d="m296 200v-48h-8a16 16 0 0 1 0-32h90.87a198.693 198.693 0 0 1 27.7 80z"/>
        </g>
            <path d="m431.029 369.775h33.941v124.451h-33.941z" fill="#a82a27" transform="matrix(.707 -.707 .707 .707 -174.254 443.314)"/>
            <path d="m184 360a15.979 15.979 0 0 1 -16 16h-32a16 16 0 1 1 0-32h32a16 16 0 0 1 16 16z" fill="#88c791"/>
            <path d="m328 168a128 128 0 1 0 128 128 128 128 0 0 0 -128-128z" fill="#eb423f"/>
            <circle cx="328" cy="296" fill="#e9eef2" r="96"/>
            <path d="m376 280a48 48 0 1 0 -72 41.562l5.349 25.7a16 16 0 0 0 15.664 12.738h5.974a16 16 0 0 0 15.664-12.74l5.349-25.7a47.967 47.967 0 0 0 24-41.56z" fill="#eb423f"/>
            <circle cx="328" cy="280" fill="#a82a27" r="16"/>
    </svg>)

}

export default SvgSearchButton;