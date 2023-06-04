import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import {firestore} from "../../utils/FirebaseConfig"
import { firebaseContext } from "../../utils/FirebaseStore";
import "./Create.css";

const Create = () => {
  const [fullName, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  // const { name } = useContext(AuthContext);
  const { auth } = useContext(firebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageRef = ref(getStorage(), `image/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(firestore, "products"), {
          name: fullName,
          category: category,
          price: price,
          image:url,
          createdBy: auth.currentUser.uid,
          createdDate: new Date().toISOString(),
        }).then(() => {
          setName("");
          setCategory("");
          setPrice("");
          setImage("");
          navigate("/create");
        });
      });
    }).catch((err)=>{
      alert(err.message)
    })
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={fullName}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={({ target }) => {
              setCategory(target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={({ target }) => {
              setPrice(target.value);
            }}
          />
          <br />
          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              style={{
                marginBottom: "10px",
              }}
              src={image ? URL.createObjectURL(image) : null}
            />
          )}
          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            Upload and Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create;
