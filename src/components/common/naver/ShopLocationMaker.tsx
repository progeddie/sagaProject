import $ from 'jquery';
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { searchShopLocList } from '../../../api/interface/shopLocation/shopLocation';
import { shopLonLat, lonLat } from './interface/Coordinate';
import { nMapSetCenter, changeNaverCoords } from '../../../util/common';

interface Iprops {
  check: boolean;
  style?: object;
  setOpenI?: React.Dispatch<React.SetStateAction<boolean>>;
  openI?: boolean;
  setDestJibunAddr?: React.Dispatch<React.SetStateAction<string>>;
  setDestRoadAddr?: React.Dispatch<React.SetStateAction<string>>;
  data: searchShopLocList[];
  curLonLat: shopLonLat;
  setCurFLonLat?: React.Dispatch<React.SetStateAction<lonLat>>;
  shopStr: string;
  shopCurrentLat: number;
  shopCurrentLon: number;
}

export interface IrefShopLocMarker {
  getShopLocation: () => void;
  getShopAddr: () => void;
}

const img = '../../images/shop.png';
const focus = '../../images/focus.png';

const ShopLocationMaker = React.forwardRef<IrefShopLocMarker, Iprops>((props: any, ref: any) => {
  const { check } = props;
  const { style } = props;
  const { setOpenI } = props;
  const { data } = props;
  const { curLonLat } = props;
  const { shopCurrentLat } = props;
  const { shopCurrentLon } = props;
  const { setDestJibunAddr } = props;
  const { setDestRoadAddr } = props;
  const { shopStr } = props;
  const { setCurFLonLat } = props;

  const { naver } = window;

  // 선택 가맹점
  const [tShop, setTShop] = useState<any>(null);
  const [tFocus, setTFocus] = useState<any>(null);

  const [nmap, setNMap] = useState(Object);
  const [overLayList, setOverLayList] = useState<any[]>([]);

  useImperativeHandle(ref, () => ({
    getShopLocation() {
      const point: any = tFocus.getPosition();

      naver.maps.Service.reverseGeocode(
        {
          location: point,
        },
        function (status: any, response: any) {
          if (status !== naver.maps.Service.Status.OK) {
            return console.log('Something wrong!');
          }

          const result = response.result, // 검색 결과의 컨테이너
            items = result.items; // 검색 결과의 배열
          // do Something
          setDestJibunAddr(result.items[0].address);
          setDestRoadAddr(result.items[1].address);

          const lonlat: lonLat = {
            lat: point._lat,
            lon: point._lng,
          };

          setCurFLonLat(lonlat);

          return result.items[0].address;
        }
      );
    },
    getShopAddr() {
      const lat = Number((curLonLat.lat / 360000).toPrecision(12));
      const lon = Number((curLonLat.lon / 360000).toPrecision(12));

      if (lat !== 0 && lon !== 0) {
        naver.maps.Service.reverseGeocode(
          {
            location: new naver.maps.LatLng(lat, lon),
          },
          function (status: any, response: any) {
            if (status !== naver.maps.Service.Status.OK) {
              return console.log('Something wrong!');
            }

            const result = response.result, // 검색 결과의 컨테이너
              items = result.items; // 검색 결과의 배열
            // do Something
            setDestJibunAddr(result.items[0].address);
            setDestRoadAddr(result.items[1].address);

            const lonlat: lonLat = {
              lat,
              lon,
            };

            setCurFLonLat(lonlat);

            return result.items[0].address;
          }
        );
      }
    },
  }));

  // 클래스 형의 생성자 처럼 쓰기 위해서는 []
  useEffect(() => {
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3849483, 127.1229117),
      zoom: 15,
      scaleControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    const targetFocus: any = new naver.maps.Marker({
      position: new naver.maps.LatLng(0, 0),
      map,
      title: '',
      icon: {
        content: [
          `<div style="position:absolute;background:rgba(255, 255, 255, 0);text-align:center;">`,
          `<img src=${focus} style="width: 24px; height:24px"/>`,
          `</div>`,
        ].join(''),
        size: new naver.maps.Size(24, 24),
        anchor: new naver.maps.Point(12, 24),
      },
      animation: naver.maps.Animation.DROP,
    });

    setTFocus(targetFocus);
    setNMap(map);

    naver.maps.Event.addListener(map, 'click', function (e: any) {
      targetFocus.setPosition(e.coord);
      const point = e.coord;
      const lonlat: lonLat = {
        lat: point._lat,
        lon: point._lng,
      };

      setCurFLonLat(lonlat);
      setOpenI((o: any) => !o);
    });
  }, []);

  useEffect(() => {
    const point: shopLonLat = curLonLat;

    if (point.lat !== 0 && point.lon !== 0) {
      nMapSetCenter(point.lat!, point.lon!, 19, nmap);
    }
  }, [curLonLat]);

  useEffect(() => {
    if (shopCurrentLat !== 0 && shopCurrentLon !== 0) {
      if (shopStr !== '') {
        if (tShop !== null) {
          tShop.setMap(null);
        }
        const coords = changeNaverCoords(shopCurrentLat, shopCurrentLon);
        const textLength = shopStr.length * 2.5;

        let shopOver: any = null;
        shopOver = new naver.maps.Marker({
          position: coords,
          map: nmap,
          title: shopStr,
          icon: {
            content: [
              `<div style="position:relative; left: -${textLength}px; text-align: center; background: rgba(255, 255, 255, 0);">`,
              `<img src=${img} style="width: 24px; height:24px"/>`,
              `<div style="font-weight: bold; color:white; font-size:9; white-space:nowrap;background-color:black">${shopStr}</div>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(24, 24),
            anchor: new naver.maps.Point(12, 24),
          },
          animation: naver.maps.Animation.BOUNCE,
        });
        setTShop(shopOver);
        nMapSetCenter(shopCurrentLat, shopCurrentLon, 19, nmap);
      }
    }
  }, [shopCurrentLat, shopCurrentLon]);

  useEffect(() => {
    let overlay: any;
    if (data && data.length > 0) {
      // 지도 초기화
      if (overLayList.length > 0) {
        for (let i = 0; i < overLayList.length; ++i) {
          overLayList[i].setMap(null);
        }
      }
      if (!check) {
        // 전체 가맹점 위치 보기
        data.map((shopLoc: searchShopLocList) => {
          const lat = shopLoc.LAT / 360000;
          const lon = shopLoc.LON / 360000;
          const coord = new naver.maps.LatLng(lat.toPrecision(12), lon.toPrecision(12));

          // 클릭한 위치에 오버레이를 추가합니다.
          const shopName = shopLoc.SHOP_NAME;
          const textLength = shopName.length * 2.5;

          overlay = new naver.maps.Marker({
            position: coord,
            map: nmap,
            title: shopName,
            icon: {
              content: [
                `<div style="position: relative; left: -${textLength}px; text-align: center; background:rgba(255, 255, 255, 0);">`,
                `<img src=${img} style="width: 24px; height:24px"/>`,
                `<div style="font-weight: bold; font-size:9; white-space:nowrap; background-color: white;">${shopName}</div>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(24, 24),
              anchor: new naver.maps.Point(12, 24),
            },
            animation: naver.maps.Animation.DROP,
          });

          overLayList.push(overlay);

          return overlay;
        });
      } else {
        // 선택한 가맹점 위치 보기
        const shop: searchShopLocList[] = data.filter(
          (shopInfo: searchShopLocList) => shopInfo.SHOP_NAME === curLonLat.shopName
        );
        if (shop.length === 1) {
          const lat = shop[0].LAT / 360000;
          const lon = shop[0].LON / 360000;
          const coord = new naver.maps.LatLng(lat, lon);

          const title = shop[0].SHOP_NAME;
          const textLength = title.length * 2.5;

          overlay = new naver.maps.Marker({
            position: coord,
            map: nmap,
            title,
            icon: {
              content: [
                `<div style="position: absolute; left: -${textLength}px; text-align:center; background:rgba(255, 255, 255, 0);">`,
                `<img src=${img} style="width: 24px; height:24px"/>`,
                `<div style="position: absolute; left: -${textLength}px; font-weight: bold; font-size:9; white-space:nowrap; background-color:white;">${title}</div>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(24, 24),
              anchor: new naver.maps.Point(12, 24),
            },
            animation: naver.maps.Animation.DROP,
          });

          overLayList.push(overlay);
          overlay.setMap(nmap);
        }
      }
    }
  }, [data, check, curLonLat]);

  return <div id="map" style={style} />;
});

export default ShopLocationMaker;
