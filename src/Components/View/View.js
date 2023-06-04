import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../utils/FirebaseConfig";
import allProducts from "../../utils/AllProducts";
import "./View.css";

function View() {
  const { id } = useParams();
  const { products } = useContext(allProducts);
  const [singleProduct, setSingleProduct] = useState([]);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const specificProduct = products.find((product) => product.id === id);
    setSingleProduct(specificProduct);

    const usersCollection = collection(firestore, "user");
    const userQuery = query(usersCollection, where("userid", "==", "LjQVrkkUGyemhsvHClOnj74veaC2"));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const userDetails = querySnapshot.docs.map((doc) => doc.data());
      setUserDetails(userDetails);
      
    });

    return () => unsubscribe();
  }, [id, products]);

  if (singleProduct.length === 0) {
    return <p>Loading...</p>;
  }

  const { price, name, category, createdDate, image } = singleProduct;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={image} alt="product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {price}</p>
          <span>{name}</span>
          <p>{category}</p>
          <span>{new Date(createdDate).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails &&
            userDetails.map((user) => (
              <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.phoneNumber}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default View;
