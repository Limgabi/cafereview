import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { BsPersonCircle } from "react-icons/bs";
import style from "./Review.module.css";

function ReviewList({ placeName }) {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const dbReviews = collection(dbService, "reviews");
    const q = query(dbReviews, where("placeName", "==", placeName))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const reviewObject = {
        ...doc.data(),
        id: doc.id
      }
      setReviews((prev) => [reviewObject, ...prev]);
      console.log(reviews)
    })
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className={style.container}>
      <p style={{ fontSize: "18px", fontWeight: "bold", margin: "16px", textAlign: "left" }}>
        <span style={{paddingRight: "8px"}}>리뷰</span>
        <span style={{color: "green"}}>{reviews.length}</span>
      </p>
        {
          reviews.map((r, idx) => (
            <div className={style.review} key={idx}>
              <p><span><BsPersonCircle/></span>  {r.creatorName}</p>
              <p style={{color: "red"}}>{"★".repeat(r.rating)}</p>
              <p>{r.content}</p>
              <span className={style.selected}>{`커피가 ${r.coffee}`}</span>
              <span className={style.selected}>{`매장 크기가 ${r.space}`}</span>
              <span className={style.selected}>{`서비스가 ${r.service}`}</span>
            </div>
          ))
        }
    </div>
  );
}

export default ReviewList;