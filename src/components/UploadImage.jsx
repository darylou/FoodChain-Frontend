/*
import React from "react";
// import ReactDOM from "react-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useMoralis } from "react-moralis";
import { useMoralisFile } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import axios from 'axios';
import './UploadImage.css'

function UploadImage() {
    const [images, setImages] = React.useState([]);
    const [tempB64, setTempB64] = React.useState();

    const maxNumber = 1;

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const { saveFile } = useMoralisFile();
  
    const onChange = (
      imageList,
      addUpdateIndex,
    ) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
      setTempB64(imageList.at(0)?.dataURL);
    };

    function sendIFPS(params, curr_date) {
      axios.post("http://localhost:8080/upload", 
      {
        url : params,
        date : curr_date
      },{})
        .then(function (response) {
          console.log("response = " + response.data);
          alert("Submitted Successfully!")
        })
        .catch(function (error) {
          console.log(error);
          alert("Something else went wrong.")
        });
    };

    const getIFPS = (callback) => {
      const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431";
      var base64 = tempB64;
      var urlstring;
      var date = new Date();
      const formatYmd = (date) => date.toISOString().slice(0, 10);
      var date_string = formatYmd(date);
      saveFile("myfile.txt", { base64 },
        {
          type: "base64",
          saveIPFS: true,
          onSuccess: (result) => {
            const resultJSON = result.toJSON();
            console.log(resultJSON)
            const ifpsurl = resultJSON.name;
            console.log(ifpsurl.substring(ifpsurl.length - 5, ifpsurl.length));
            if (ifpsurl.substring(ifpsurl.length - 5, ifpsurl.length) === ".jpeg") {
              urlstring = "https://ipfs.moralis.io:2053/ipfs/" + resultJSON.name.substring(0, resultJSON.name.length - 5);
              console.log("urlstring = " + urlstring);
            }
            else if (ifpsurl.substring(ifpsurl.length - 4, ifpsurl.length) === ".jpg" || ifpsurl.substring(ifpsurl.length - 4, ifpsurl.length) === ".png") {
              urlstring = "https://ipfs.moralis.io:2053/ipfs/" + resultJSON.name.substring(0, resultJSON.name.length - 4);
              console.log("urlstring = " + urlstring);
            }
            console.log(date_string);
            callback(urlstring, date_string);
            // window.location.reload();
          },
          onError: (error) => console.log(error),
        });
    }

    const submit = () => {
      if (isAuthenticated === true) {
        getIFPS(sendIFPS);
      }
      else {
        alert("Please login first")
      }
    } 
    return (
      <div className="App">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button className="uploadButton"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Image Here
              </button>
              &nbsp;
              <button className="uploadButton2" onClick={onImageRemoveAll}>Remove All</button>
              <button className="uploadButton" onClick={() => submit()}>Submit</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img className="imageItem" src={image.dataURL} alt="" width="150" />
                  <div className="image-item__btn-wrapper">
                    <button className="uploadButton" onClick={() => onImageUpdate(index)}>Update</button>
                    <button className="uploadButton" onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    );
}

export default UploadImage
*/