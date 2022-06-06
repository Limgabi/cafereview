import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Review from '../components/Review';

function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  return (
    <div style={{margin: "0 auto", width: "80%", textAlign: "center"}}>
      <div className="placeInfo">
        <h1>{data.name}</h1>
        <h3>{data.address}</h3>
        <h3>{data.phone}</h3>
      </div>
      <Review name={data.name}/>
    </div>
  )
}

export default Detail;