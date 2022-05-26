import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router";
import { base64encode, base64decode } from 'nodejs-base64';
import Moralis from "moralis";
import Web3 from "web3/dist/web3.min.js";
import { contractABI, contractAddress } from "../contract.js";
import axios from 'axios';
import "./minter.css";

const Buffer = require('buffer/').Buffer;

function Minter(){
    const {user, logout, isAuthenticated} = useMoralis();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated])

    async function handleSubmit(e) {
        e.preventDefault();
    try {
      // save image to IPFS
      const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      const file1url = file1.ipfs();

      // generate metadata and save to ipfs
      const metadata = {
        image: file1url,
      };
      const file2 = new Moralis.File(`metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString('base64'),
      });
      await file2.saveIPFS();
      const metadataurl = file2.ipfs();
      console.log(metadataurl);
      // interact with smart contract
      await Moralis.enableWeb3();
      const web3 = new Web3(Moralis.provider);
      //console.log(JSON.stringify(contractABI));
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const response = await contract.methods
        .mint(metadataurl)
        .send({ from: user.get("ethAddress") });
      const tokenId = response.events.Transfer.returnValues.tokenId;

      var date = new Date();
      date.setDate(date.getDate()-1);
      const date_string = date.toISOString().substr(0,10);
      axios.post("https://foodchain-coderssb.herokuapp.com/upload", 
      {
        url : file1url,
        date : date_string
      },{})
        .then(function (response) {
          console.log("response = " + response.data);
          alert("Submitted Successfully!")
        })
        .catch(function (error) {
          console.log(error);
          alert("Something else went wrong.")
        });


      alert(
        `NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    }
    return(
        <div>
            <div className="chooseFile">
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type="file" 
                        className="border-[1px] p-2 text-lg border-black w-full" 
                        onChange = {(e) => setFile(e.target.files[0])}/>
                    <button 
                        type="submit" 
                        className="uploadButton"
                    >
                        Mint
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Minter;