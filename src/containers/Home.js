import React from "react";
import { Link } from "react-router-dom";
import ListNotes from "./ListNotes.js";
import "./Home.css";

export default function Home(props) {
  function renderLander() {
    return (
      <div className="lander">
        <h1>Janelia Serverless Demo</h1>
        <p>A collaborative note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <ListNotes {...props}/>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}