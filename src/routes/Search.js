import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useLocation } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { AiFillCloseCircle } from "react-icons/ai"
import style from "../components/KakaoMap.module.css";

const { kakao } = window;

function Search() {
  const location = useLocation();
  const { searchWord } = location.state;

  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표 추가
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            id: data[i].id,
            content: data[i].place_name,
            address: data[i].address_name,
            road_address_name: data[i].road_address_name,
            phone: data[i].phone,
          })
          console.log(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)
      }
    })
  }, [map, searchWord])

  return (
    <>
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <>
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                setInfo(marker);
                setIsOpen(true);
              }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35
                },
              }}
            />
            {info && isOpen && (
              <CustomOverlayMap position={info.position}>
                <div className={style.info}>
                  {info.content}
                  <span
                    className={style.close}
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  ><AiFillCloseCircle/></span>
                </div>
              </CustomOverlayMap>
            )}
          </>
        ))}
      </Map>
      <PlaceList placeInfo={markers} />
    </>
  )
}

export default Search;