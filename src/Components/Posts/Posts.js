import React, { useEffect,useContext } from "react";
import { getDocs, collection, } from "firebase/firestore";
import { firestore } from "../../utils/FirebaseConfig";
import Heart from "../../assets/Heart";
import "./Post.css";
import { Link } from "react-router-dom";
import allProducts from "../../utils/AllProducts"

function Posts() {
  const {products,set}=useContext(allProducts)
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const allProducts = querySnapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
        date: product.timestamp,
      }));
      set(allProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
              <Link to={`/View/${product?.id}`} style={{textDecoration:"none",color:"black"}}>
                <div key={product?.id} className="card">
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product?.image} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9;{product?.price}</p>
                    <span className="kilometer">{product?.category}</span>
                    <p className="name">{product?.name}</p>
                  </div>
                  <div className="date">
                    <span>
                      {new Date(product?.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
