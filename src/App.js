import React, { useState, useEffect } from "react";

import {
  Create,
  Login,
  Signup,
  Banner,
  Footer,
  Header,
  Posts,
  View,
  ErrorElement,
} from "./Components";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { firebaseContext, AuthContext } from "./utils/FirebaseStore";
import allProducts from "./utils/AllProducts";
import { auth } from "./utils/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Cleanup the event listener on unmount
    };
  });
  return (
    <>
      <firebaseContext.Provider value={{ auth }}>
        <AuthContext.Provider value={{ name: user, setUser: setUser }}>
          <allProducts.Provider
            value={{ products: products, set: setProducts }}
          >
            <Header />
            <Banner />
            <Outlet />
            <Footer />
          </allProducts.Provider>
        </AuthContext.Provider>
      </firebaseContext.Provider>
    </>
  );
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Create",
        element: <Create />,
      },
      {
        path: "/View/:id",
        element: <View />,
      },
    ],
  },
]);

export default AppRouter;
