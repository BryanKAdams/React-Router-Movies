import React from 'react';
import {NavLink} from "react-router-dom";

const SavedList = props => (
  <div className="saved-list">
    <h3>Saved Movies:</h3>
    {props.list.map(movie => (
      
      <NavLink exact activeClassName="selected-link" key={movie.id} to ={`/movies/${movie.id}`}>{movie.title}</NavLink>
    ))}
    <NavLink exact activeClassName="selected-link" to="/" className="home-button">Home</NavLink>
    
  </div>
);

export default SavedList;
