import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './DisplayImages.css';
import './DisplayFullCollection.css';

// for formating images 
function Card(props) {
    return (
    <div className="Card">
        <div className="top">
            <h2 className="tokenID">{props.tokenID}</h2> 
        </div>
        <div className="bottom">
            <img className="circle-img" src={props.img}/>
        </div>
            
    </div>
    );
}

function createCard(token) {
    let id = "Token " + token.id;
    return <Card key={token.id} tokenID = {id} img = {token.url}/>
}

function DisplayImages() {

    const [images, setImageList] = useState([]);
    
    axios.get("https://foodchain-coderssb.herokuapp.com/upload")
        .then(response => {
            setImageList( response.data );
        });

    // console.log("imageList = " + imageList);

    var lastSix = [];
    if (images.length >= 6) {
        lastSix = images.slice(images.length-6, images.length);
        lastSix = lastSix.reverse();
    }
    else {
        lastSix = images;
        lastSix = lastSix.reverse();
    }
        
    return (
        <body className="body">
            <h2 className="title">Recently Minted</h2>
                <div className="main">
                    {lastSix.map(createCard)}
                </div>
        </body>
        
    )

}

export default DisplayImages;