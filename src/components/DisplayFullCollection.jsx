import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react';
import axios from 'axios';
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
    let id = "Token " + token.id +": " + token.date.substring(0,10);
    return <Card key ={token.id} tokenID = {id} img = {token.url}/>
}

function DisplayAllTokens() {

    const [images, setImageList] = useState([]);

    axios.get("https://foodchain-coderssb.herokuapp.com/upload")
        .then(response => {
            setImageList(response.data);
        });

    return (
        <body className="body">
            <div className="main">
                    {images.map(createCard).reverse()}
            </div>
        </body>

    )

}

export default DisplayAllTokens;