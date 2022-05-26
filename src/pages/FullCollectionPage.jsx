import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import DisplayFullCollection from '../components/DisplayFullCollection';
import DisplayAllTokens from '../components/DisplayFullCollection';
import DisplayImages from '../components/DisplayImages';

const FullCollectionPage = () => {
    return (
        <div className="Full Collection">
            <Navbar/>
            <h2 className="title">Full Collection</h2>
            <DisplayAllTokens/>
            
        </div>

    );
}

export default FullCollectionPage;