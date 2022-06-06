import React from 'react';
import { Link } from 'react-router-dom';

function PlaceList({ placeInfo }) {
  console.log(placeInfo)
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      textAlign: "center"
    }}>
      {
        placeInfo.map((place) => (
          <div key={place.id} style={{ width: "30%", border: "1px solid black", margin: "5px" }} >
            <Link to={`/place/${place.id}`} state= {{
              name: place.content,
              address: place.address,
              phone: place.phone
            }} style={{textDecoration: "none", color: "black"}}><h3>{place.content}</h3></Link>
            <p>{place.address}</p>
            <p>{place.road_address_name}</p>
            <p>{place.phone}</p>
          </div>
        ))
      }
    </div>
  )
}

export default PlaceList;