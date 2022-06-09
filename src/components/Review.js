import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Review.module.css"
import { dbService } from "../fbase";
import { collection, addDoc } from "firebase/firestore";
import { FiCoffee } from "react-icons/fi";

function Review({ name, userObj }) {
  const navigate = useNavigate();

  const [spaceValue, setSpaceValue] = useState('1');
  const [coffeeValue, setCoffeeValue] = useState('1');
  const [serviceValue, setServiceValue] = useState('1');
  const [starValue, setStarValue] = useState('');
  const [spaceResult, setSpaceResult] = useState('넓어요');
  const [coffeeResult, setCoffeeResult] = useState('고소해요');
  const [serviceResult, setServiceResult] = useState('친절해요');
  const [reviewContent, setReviewContent] = useState('');

  const radioSpace = [
    { name: '넓어요', value: '1' },
    { name: '적당해요', value: '2' },
    { name: '좁아요', value: '3' },
  ];

  const radioCoffee = [
    { name: '고소해요', value: '1' },
    { name: '산미가 강해요', value: '2' },
    { name: '써요', value: '3' },
    { name: '달아요', value: '4' },
  ];

  const radioService = [
    { name: '친절해요', value: '1' },
    { name: '그냥 그래요', value: '2' },
    { name: '불친절해요', value: '3' },
  ]

  const radioStar = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
  ]

  const ClickSpaceRadioBtn = (e) => {
    setSpaceValue(e.target.value);
    setSpaceResult(e.target.name);
  }

  const ClickCoffeeRadioBtn = (e) => {
    setCoffeeValue(e.target.value);
    setCoffeeResult(e.target.name)
  }

  const ClickServiceRadioBtn = (e) => {
    setServiceValue(e.target.value);
    setServiceResult(e.target.name);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const reviewObj = {
      placeName: name,
      content: reviewContent,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      space: spaceResult,
      coffee: coffeeResult,
      service: serviceResult,
      star: serviceValue
    };
    console.log(reviewObj)
    await addDoc(collection(dbService, "reviews"), reviewObj);
    setReviewContent('');
    alert("글이 정상적으로 등록되었습니다.");
    navigate('/');
  }

  return (
    <>
      <h4>{name}, 어떠셨나요 ? 👀</h4>
      <div className={style.form}>
        <form onSubmit={onSubmit}>
          <div className={style.radioForm}>
            <div className={style.space}>
              <span>공간</span>
              {
                radioSpace.map((btn, idx) => (
                  <div className={style.btn} key={idx}>
                    <input
                      type="radio"
                      className="radioInput"
                      id={btn.name}
                      name={btn.name}
                      value={btn.value}
                      checked={spaceValue === btn.value}
                      onChange={ClickSpaceRadioBtn}
                    /><label for={btn.name}>{btn.name}</label>
                  </div>
                ))
              }
            </div>
            <div className={style.coffee}>
              <span>원두</span>
              {
                radioCoffee.map((btn, idx) => (
                  <div className={style.btn} key={idx}>
                    <input
                      type="radio"
                      className="radioInput"
                      id={btn.name}
                      name={btn.name}
                      value={btn.value}
                      checked={coffeeValue === btn.value}
                      onChange={ClickCoffeeRadioBtn}
                    /><label for={btn.name}>{btn.name}</label>
                  </div>
                ))
              }
            </div>
            <div className={style.service}>
              <span>서비스</span>
              {
                radioService.map((btn, idx) => (
                  <div className={style.btn} key={idx}>
                    <input
                      type="radio"
                      className="radioInput"
                      id={btn.name}
                      name={btn.name}
                      value={btn.value}
                      checked={serviceValue === btn.value}
                      onChange={ClickServiceRadioBtn}
                    /><label for={btn.name}>{btn.name}</label>
                  </div>
                ))
              }
            </div>
          </div>
          <h3>리뷰를 남겨주세요</h3>
          <fieldset className={style.star}>
            <span>별점을 선택해주세요</span>
            {
              radioStar.map((star, idx) => (
                <>
                  <input 
                    type="radio" 
                    name="reviewStar" 
                    className={style.reviewStar} 
                    value={starValue} 
                    id={idx} 
                    onChange={() => {setStarValue(star)}}
                  />
                  <label for={idx}>★</label>
                </>
              ))
            }
          </fieldset>
          <textarea className={style.content} value={reviewContent} placeholder="내용을 입력하세요" onChange={(e) => { setReviewContent(e.target.value) }} />
          <input type="submit" className={style.submitBtn} value="리뷰 작성" />
        </form>
      </div>
    </>
  )
}

export default Review;