import React, { useState } from "react";
import style from "./Review.module.css"

function Review({ name }) {
  const [spaceValue, setSpaceValue] = useState('1');
  const [coffeeValue, setCoffeeValue] = useState('1');
  const [spaceResult, setSpaceResult] = useState('넓어요');
  const [coffeeResult, setCoffeeResult] = useState('강해요');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  const radioSpace = [
    { name: '넓어요', value: '1' },
    { name: '적당해요', value: '2' },
    { name: '좁아요', value: '3' },
  ];
  const radioCoffee = [
    { name: '강해요', value: '1' },
    { name: '괜찮아요', value: '2' },
    { name: '없어요', value: '3' },
  ];

  const ClickSpaceRadioBtn = (e) => {
    setSpaceValue(e.target.value);
    setSpaceResult(e.target.name);
  }

  const ClickCoffeeRadioBtn = (e) => {
    setCoffeeValue(e.target.value);
    setCoffeeResult(e.target.name)
  }

  return (
    <>
      <h4>{name}, 어떠셨나요 ? 👀</h4>
      <div className={style.form}>
        <form>
          <input type="text" className={style.title} value={reviewTitle} placeholder="제목을 입력하세요" onChange={(e) => {setReviewTitle(e.target.value)}}/>
          <textarea className={style.content} value={reviewContent} placeholder="내용을 입력하세요" onChange={(e) => {setReviewContent(e.target.value)}}/>
          <div className={style.space}>
            {
              radioSpace.map((btn, idx) => (
                <div className={style.btn}>
                  <input
                    type="radio"
                    className="radioInput"
                    key={idx}
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
            {
              radioCoffee.map((btn, idx) => (
                <div className={style.btn}>
                  <input
                    type="radio"
                    className="radioInput"
                    key={idx}
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
        </form>
        <div className={style.btnResult}>
          <span style={{ flexGrow: 1, borderRight: "1px solid black" }}>공간</span>
          <span style={{ flexGrow: 2 }}>{spaceResult}</span>
        </div>
        <div className={style.btnResult}>
          <span style={{ flexGrow: 1, borderRight: "1px solid black" }}>산미</span>
          <span style={{ flexGrow: 2 }}>{coffeeResult}</span>
        </div>
      </div>
    </>
  )
}

export default Review;