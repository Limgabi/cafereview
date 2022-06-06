import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import style from "./KakaoMap.module.css";

function KakaoMap() {
  const [level, setLevel] = useState(3);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      // 현재 접속 위치
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={level}
      >
        {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "현재 위치 ∠( ᐛ 」∠)_"}
            </div>
          </MapMarker>
        )}
      </Map>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button className={style.btn} onClick={() => setLevel(level - 1)}>
          지도 레벨 - 1
        </button>
        <button className={style.btn} onClick={() => setLevel(level + 1)}>
          지도 레벨 + 1
        </button>
      </div>
    </>
  )
}

export default KakaoMap;