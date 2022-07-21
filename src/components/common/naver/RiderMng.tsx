import $ from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import {
  riderInput,
  riderOutput,
  clearRiderInfo,
  clearShopInfo,
  shopInput,
  shopOuput,
  destinyInput,
  arrowInput,
  destinyOutput,
  arrowOutput,
  clearDestinyInfo,
  clearArrowListInfo,
  deleteRiderInfo,
  deleteShopInfos,
  deleteDestinyList,
  deleteArrowList,
} from '../../../control/rider/controller';
import { changeNaverCoords } from '../../../util/common';

import flag from '../../../images/flag.png';
import jara from '../../../images/jara.png';
import gongra from '../../../images/gongra.png';
import shop from '../../../images/shop.png';

const { naver } = window;

function RiderMng(props: any) {
  const { style } = props;
  // 라이더데이터
  const { rData } = props;
  // 가맹점데이터
  const { sData } = props;
  // 라인색상
  const { lineColor } = props;
  // 라인굵기
  const { lineT } = props;
  // 가맹점보기 체크
  const { shopCk } = props;
  // 라이더 전체보기 체크
  const { riderAllCk } = props;
  // 동별 보기 체크
  const { dongViewCk } = props;
  // 선택 라이더
  const { sRider } = props;
  // 선택 동
  const { sDong } = props;
  // 현재 좌표
  const { currentLat } = props;
  const { currentLon } = props;
  const { clickName } = props;
  // 명칭검색 가맹점 선택
  const { shopStr } = props;
  // 가맹점 리스트 선택
  const { shopListStr } = props;
  const { setClickName } = props;
  // 목적지보기
  const { riderDestCk } = props;
  // 네이버 맵객체
  const nmap = useRef<any>(false);
  // 선택 가맹점
  const [tShop, setTShop] = useState<any>(null);
  const [shopData, setShopData] = useState<any[]>([]);

  // 맵 센터이동
  const nMapSetCenter = (lat: number, lon: number, depth: number) => {
    let tempLat: number = lat / 360000;
    let tempLon: number = lon / 360000;
    let centerLatLon = new naver.maps.LatLng(tempLat.toPrecision(12), tempLon.toPrecision(12));
    nmap.current.setCenter(centerLatLon);
    nmap.current.setZoom(depth, false);
    centerLatLon = null;
    tempLon = null;
    tempLat = null;
  };

  // 생성자 맵객체 생성
  useEffect(() => {
    let mapCenter = new naver.maps.LatLng(37.3849483, 127.1229117);
    let map = new naver.maps.Map('map', {
      center: mapCenter,
      zoom: 11,
      scaleControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    });
    nmap.current = map;
    mapCenter = null;
    map = null;
  }, []);

  // 기사현황 / 기사목록 / 명칭검색목록 클릭시
  useEffect(() => {
    if (currentLat !== 0 && currentLon !== 0) {
      // 기사목록 클릭
      if (clickName === 'selRider') {
        let timer: any = null;
        if (riderAllCk === true) {
          riderSetVisible(sRider, 1, riderDestCk);
          timer = setTimeout(() => {
            visibleRiderDataAll(true);
            visibleRiderDestDataAll(riderDestCk);
          }, 3000);
        } else {
          visibleRiderDataAll(false);
          visibleRiderDestDataAll(false);
          riderSetVisible(sRider, 1, riderDestCk);
        }
      }

      // 기사현황 클릭
      if (clickName === 'selDong') {
        if (dongViewCk === true && sDong !== '') {
          riderSetVisible('', 2, riderDestCk);
        }
      }

      // 가맹점 목록 클릭
      if (clickName === 'selShop') {
        if (shopCk === 'on') {
          shopData.forEach((data: any) => {
            data.setVisible(true);
          });
        } else {
          shopData.forEach((data: any) => {
            if (shopListStr === data.getTitle()) {
              data.setVisible(true);
            }
          });
        }
      }
      nMapSetCenter(currentLat, currentLon, nmap.current.getZoom());
      setClickName('');
    }
  }, [currentLat, currentLon, sDong, setClickName]);

  useEffect(() => {
    clearRiderData();

    if (rData && rData.length > 0) {
      rData.forEach((value: any, key: any) => {
        setRider(value);
      });
    }

    if (riderAllCk === false) {
      riderSetVisible(sRider, 1, riderDestCk);
    }

    // 가맹점
    if (sData && sData.length > 0 && shopCk === 'Y') {
      sData.forEach((value: any, key: any) => {
        const coords = changeNaverCoords(value.LAT, value.LON);
        let display: boolean;

        let shopSize = new naver.maps.Size(24, 24);
        let shopAnchor = new naver.maps.Point(12, 24);
        let shopOverlay: any = new naver.maps.Marker({
          position: coords,
          map: nmap.current,
          title: value.SHOP_NAME,
          icon: {
            content: [
              `<div style="position:absolute; text-align:center; background:rgba(255, 255, 255, 0);">`,
              `<img src=${shop} style="width: 24px; height:24px"/>`,
              `<div style="font-weight: bold; font-size:9; white-space:nowrap; background-color:white">${value.SHOP_NAME}</div>`,
              `</div>`,
            ].join(''),
            size: shopSize,
            anchor: shopAnchor,
          },
          animation: shopAnchor,
        });
        shopInput(shopOverlay);
        shopSize = null;
        shopAnchor = null;
        shopOverlay = null;
      });
    }
  }, [rData, shopCk]);

  const setRider = (value: any) => {
    let lat = value.LAT / 360000;
    let lon = value.LON / 360000;

    let coord = new naver.maps.LatLng(lat.toPrecision(12), lon.toPrecision(12));

    // 클릭한 위치에 오버레이를 추가합니다.
    let rider: string;
    let bColor: string;

    // 시작 / 종료 지점표시
    let LATLONArr: string[] = [];
    let LATLONStr: number[] = [];

    // 라이더 종류
    if (value.SHARE_GBN === 'Y') rider = gongra;
    else rider = jara;

    if (value.CNT === 0) bColor = '#adff2f';
    else bColor = '#FF0000';
    // 라이더 오버레이

    let riderSize = new naver.maps.Size(24, 24);
    let riderAnchor = new naver.maps.Point(12, 24);

    const riderName = value.RIDER_NAME;
    const riderNameLength = riderName.length * 2.5;

    let riderOverlay: any = new naver.maps.Marker({
      position: coord,
      map: nmap.current,
      title: `${value.RIDER_CODE}|${value.DONG_NAME}`,
      icon: {
        content: [
          `<div style="text-align:center;background:rgba(255, 255, 255, 0);">`,
          `<img src=${rider} style="width: 24px; height:24px"/>`,
          `<div style="position:absolute; left: -${riderNameLength}px; font-weight: bold; font-size:12; white-space:nowrap;background-color:${bColor}">${value.RIDER_NAME}</div>`,
          `</div>`,
        ].join(''),
        size: riderSize,
        anchor: riderAnchor,
      },
    });

    riderInput(riderOverlay);
    coord = null;
    riderSize = null;
    riderAnchor = null;
    riderOverlay = null;

    if (value.ORDER_LONLAT !== null && riderDestCk === true) {
      let LATLON: string = value.ORDER_LONLAT;
      LATLONArr = LATLON.split('@');
      LATLON = null;
      LATLONArr.forEach((val: any, lKey: any) => {
        if (val !== '') {
          LATLONStr = val.split('^');
          if (LATLONStr[0].toString() !== '' && LATLONStr[1].toString() !== '') {
            let clat = LATLONStr[1] / 360000;
            let clon = LATLONStr[0] / 360000;
            if (clat && clon) {
              let upperP1 = new naver.maps.LatLng(lat.toPrecision(12), lon.toPrecision(12));
              let upperP2 = new naver.maps.LatLng(clat.toPrecision(12), clon.toPrecision(12));

              let pathSize = new naver.maps.Size(24, 24);
              let pathAnchor = new naver.maps.Point(12, 24);

              // 화살표
              let pathFlag: any = new naver.maps.Marker({
                position: upperP2,
                title: `${value.RIDER_CODE}|${value.DONG_NAME}`,
                icon: {
                  content: [
                    `<div style="position: absolute; z-index:9; text-align: center; background: rgba(255, 255, 255, 0); cursor: pointer;">`,
                    `<img src=${flag} style="width: 24px; height:24px"/>`,
                    `</div>`,
                  ].join(''),
                  size: pathSize,
                  anchor: pathAnchor,
                },
              });
              pathFlag.setMap(nmap.current);
              if (riderDestCk === true) {
                pathFlag.setVisible(true);
              } else {
                pathFlag.setVisible(false);
              }
              destinyInput(pathFlag);
              pathFlag = null;
              let iconSize: string;
              let destinyIcon = naver.maps.PointingIcon.OPEN_ARROW;
              if (lineT === '1' || lineT === '2') iconSize = '10';
              else iconSize = '15';
              let pathLine = new naver.maps.Polyline({
                title: `${value.RIDER_CODE}|${value.DONG_NAME}`,
                path: [upperP1, upperP2],
                endIcon: destinyIcon,
                // 아이콘의 크기를 지정합니다. 단위는 픽셀입니다. (화살표의 끝부분)
                endIconSize: iconSize,
                // 라인색상
                strokeColor: lineColor,
                // 라인두께
                strokeWeight: lineT,
                strokeStyle: 'dash',
              });

              pathLine.setMap(nmap.current);
              if (riderDestCk === true) {
                pathLine.setVisible(true);
              } else {
                pathLine.setVisible(false);
              }
              arrowInput(pathLine);
              pathSize = null;
              pathAnchor = null;
              upperP1 = null;
              upperP2 = null;
              destinyIcon = null;
              pathLine = null;
            }
            clat = null;
            clon = null;
          }
        }
      });
    }
    lat = null;
    lon = null;
  };

  // 지도 렌더링 삭제
  const clearRiderData = () => {
    if (riderOutput().length > 0) {
      riderOutput().forEach((data: any) => {
        data.setMap(null);
        deleteRiderInfo(data);
      });
      clearRiderInfo();
    }

    if (shopOuput().length > 0) {
      shopOuput().forEach((data: any) => {
        data.setMap(null);
        deleteShopInfos(data);
      });
      clearShopInfo();
    }

    if (destinyOutput().length > 0) {
      destinyOutput().forEach((data: any) => {
        data.setMap(null);
        deleteDestinyList(data);
      });
      clearDestinyInfo();
    }

    if (arrowOutput().length > 0) {
      arrowOutput().forEach((data: any) => {
        data.setMap(null);
        deleteArrowList(data);
      });
      clearArrowListInfo();
    }
  };

  // 라이더 전체 보이기 / 안보이기
  const visibleRiderDataAll = (visible: boolean) => {
    if (riderOutput().length > 0) {
      riderOutput().forEach((data: any) => {
        data.setVisible(visible);
      });
    }
  };

  // 라이더 전체 보이기 / 안보이기
  const visibleRiderDestDataAll = (visible: boolean) => {
    if (destinyOutput().length > 0) {
      destinyOutput().forEach((data: any) => {
        data.setVisible(visible);
      });
    }

    if (arrowOutput().length > 0) {
      arrowOutput().forEach((data: any) => {
        data.setVisible(visible);
      });
    }
  };

  // 선택 라이더 보이기
  const riderSetVisible = (str: string, type: number, visible: boolean) => {
    riderOutput().forEach((value: any, key: any) => {
      const valStr: string = value.title;
      const strArr: string[] = valStr.split('|');

      if (type === 1) {
        if (strArr[0] === str.toString()) {
          value.setVisible(true);
        } else {
          value.setVisible(false);
        }
      } else if (type === 2) {
        if (strArr[1] === sDong.toString()) {
          value.setVisible(true);
        }
      }
    });

    destinyOutput().forEach((value: any, key: any) => {
      const valStr: string = value.title;
      const strArr: string[] = valStr.split('|');
      if (type === 1) {
        if (strArr[0] === str.toString()) {
          value.setVisible(visible);
        } else {
          value.setVisible(!visible);
        }
      } else if (type === 2) {
        if (strArr[1] === sDong.toString()) {
          value.setVisible(visible);
        } else {
          value.setVisible(!visible);
        }
      }
    });

    arrowOutput().forEach((value: any, key: any) => {
      const valStr: string = value.title;
      const strArr: string[] = valStr.split('|');
      if (type === 1) {
        if (strArr[0] === str.toString()) {
          value.setVisible(visible);
        } else {
          value.setVisible(!visible);
        }
      } else if (type === 2) {
        if (strArr[1] === sDong.toString()) {
          value.setVisible(visible);
        } else {
          value.setVisible(!visible);
        }
      }
    });
  };

  return <div id="map" style={style} />;
}

export default React.memo(RiderMng);
