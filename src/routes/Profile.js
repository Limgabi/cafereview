import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from '../fbase';
import style from "./Profile.module.css";
import re_style from "../components/Review.module.css";
import { BsPersonCircle } from "react-icons/bs"
import { collection, getDocs, query, where } from 'firebase/firestore';

function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const [myReviews, setMyReviews] = useState([]);

  const getMyReviews = async () => {
    const dbReviews = collection(dbService, "reviews");
    const q = query(dbReviews, where("creatorId", "==", userObj.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const myReviewObject = {
        ...doc.data(),
        id: doc.id
      }
      setMyReviews((prev) => [myReviewObject, ...prev]);
    })
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.adminWrap}>
        <div className={style.adminInfo}>
          <div className={style.adminBtn}><BsPersonCircle size={60} /></div>
          <div>
            <div className={style.name}>{userObj.displayName}</div>
          </div>
        </div>
        <div className={style.btn}>
          <button onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>
      <div className={style.reviewWrap}>
        {
          myReviews.map((review, idx) => (
            <div className={style.review} key={idx}>
              <div className={style.placeInfo}>
                <p className={style.placeName}>{review.placeName}</p>
                <p className={style.placeAdd}>{review.address}</p>
              </div>
              <p style={{color: "red"}}>{"★".repeat(review.rating)}</p>
              <p>{review.content}</p>
              <span className={re_style.selected}>{`커피가 ${review.coffee}`}</span>
              <span className={re_style.selected}>{`매장 크기가 ${review.space}`}</span>
              <span className={re_style.selected}>{`서비스가 ${review.service}`}</span>
            </div>
          ))  
        }
      </div>
    </div>
  );
}

export default Profile;