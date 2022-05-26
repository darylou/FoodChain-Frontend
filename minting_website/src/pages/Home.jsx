import React from 'react';
import UploadImage from '../components/UploadImage';
import Navbar from '../components/Navbar/Navbar';
import DisplayImages from '../components/DisplayImages';
import Minter from '../components/minter';

function Home() {
    return (
      <div>
        <Navbar />
        <h1 className="title">Mint your NFT</h1>
        <Minter />
        <DisplayImages/>
      </div>
    );
}

export default Home;