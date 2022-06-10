import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Review.module.css"
import { dbService } from "../fbase";
import { collection, addDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

function Review({ name, userObj }) {
  const navigate = useNavigate();

  const [spaceValue, setSpaceValue] = useState('1');
  const [coffeeValue, setCoffeeValue] = useState('1');
  const [serviceValue, setServiceValue] = useState('1');

  const [spaceResult, setSpaceResult] = useState('넓어요');
  const [coffeeResult, setCoffeeResult] = useState('고소해요');
  const [serviceResult, setServiceResult] = useState('친절해요');
  const [reviewContent, setReviewContent] = useState('');

  const starArr = [0, 1, 2, 3, 4];
  const [starClicked, setStarClicked] = useState([false, false, false, false, false]);
  const [starValue, setStarValue] = useState(0);

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

  const onClickStar = (idx) => {
    let clickStates = [...starClicked];
    for (let i=0; i<5; i++) {
      clickStates[i] = i <= idx ? true : false;
    }
    setStarClicked(clickStates);
    let score = starClicked.filter(Boolean).length;
    setStarValue(score);
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
      rating: starValue,
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
          <p style={{fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>리뷰를 남겨주세요</p>
          <fieldset className={style.star}>
            <span>별점을 선택해주세요</span> <span>{starValue}</span>
              <div>
                {
                  starArr.map((star, idx) => (
                    <FaStar
                      key={star}
                      className={`${starClicked[star]} && ${style.clickedStar}`}
                      onClick={()=>onClickStar(star)}
                      size={50}
                    />
                  ))
                }
              </div>
          </fieldset>
          <textarea className={style.content} value={reviewContent} placeholder="내용을 입력하세요" onChange={(e) => { setReviewContent(e.target.value) }} />
          <input type="submit" className={style.submitBtn} value="리뷰 작성" />
        </form>
      </div>
    </>
  )
}

export default Review;