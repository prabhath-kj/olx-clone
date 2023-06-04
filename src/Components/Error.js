import React from "react";
import { useRouteError } from "react-router-dom";
import errorImg from "../error.jpg";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: "2rem",
    textAlign: "center",
  },
  image: {
    width: "40%",
    height: "auto",
  },
};

export default function Error() {
  const err = useRouteError();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{err.status + " " + err.statusText}</h1>
      <img style={styles.image} src={errorImg} alt="error-page" />
    </div>
  );
}
