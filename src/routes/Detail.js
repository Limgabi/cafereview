import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Review from '../components/Review';
import ReviewList from '../components/ReviewList';
import style from "../components/Review.module.css";

function Detail({ isLoggedIn, userObj }) {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const [clickBtn, setClickBtn] = useState(false);

  const onClick = () => {
    setClickBtn(!clickBtn);
  }
  return (
    <div style={{ margin: "0 auto", width: "80%", textAlign: "center" }}>
      <div className="placeInfo">
        <h1>{data.name}</h1>
        <h3>{data.address}</h3>
        <h3>{data.phone}</h3>
      </div>
      <button className={style.reviewBtn} onClick={onClick}>리뷰 작성</button>
      <div>
        {clickBtn 
          ? (
            isLoggedIn 
            ? <Review name={data.name} userObj={userObj} /> 
            : alert("로그인을 해주세요")
          )
          : null
        }
      </div>
      <ReviewList placeName={data.name}/>
    </div>
  )
}

export default Detail;