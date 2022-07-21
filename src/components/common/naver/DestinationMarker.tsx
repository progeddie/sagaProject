import $ from 'jquery';
import React, { useEffect, useState, useImperativeHandle, SetStateAction } from 'react';
import { IDestInfo } from '../../../api/interface/destination/destination';
import { lonLat } from './interface/Coordinate';

import { getPoligonCenter, nMapSetCenter, changeNaverCoords } from '../../../util/common';

interface Iprops {
  style?: object;
  setOpenI?: React.Dispatch<React.SetStateAction<boolean>>;
  setDestJibunAddr?: React.Dispatch<React.SetStateAction<string>>;
  setDestRoadAddr?: React.Dispatch<React.SetStateAction<string>>;
  setCurLonLat?: React.Dispatch<React.SetStateAction<lonLat>>;
  mapDestName?: string;
  refDestName?: string;
  shopCurrentLat?: Number;
  shopCurrentLon?: Number;
  shopStr?: string | null;
  openI?: boolean;
  data?: IDestInfo[];
  curLonLat: lonLat;
}

export interface IrefDestMarker {
  setDestination: () => void;
  setDestAddr: () => void;
  getDestAddr: () => void;
  cancelDestAddr: () => void;
}

const img = '../../images/shop.png';
const flag = '../../images/flag.png';
const focus = '../../images/focus.png';

const DestinationMarker = React.forwardRef<IrefDestMarker, Iprops>((props: any, ref: any) => {
  const { style } = props;
  const { setOpenI } = props;

  const { setDestJibunAddr } = props;
  const { setDestRoadAddr } = props;

  const { data } = props;
  const { curLonLat } = props;
  const { setCurLonLat } = props;
  const { shopCurrentLat } = props;
  const { shopCurrentLon } = props;
  const { shopStr } = props;
  const [tShop, setTShop] = useState<any>(null);
  const [tFocus, setTFocus] = useState<any>(null);

  const [overLayList, setOverLayList] = useState<any[]>([]);

  const { naver } = window;

  const [tempCoords, setTempCoords] = useState(Object);
  const [nmap, setNMap] = useState(Object);

  useImperativeHandle(ref, () => ({
    setDestination() {
      const point: any = tempCoords;
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

          setCurLonLat(lonlat);
          return result.items[0].address;
        }
      );
    },
    setDestAddr() {
      const latlng = tFocus.getPosition();
      if (latlng._lat === 0 && latlng._lng === 0) {
        tFocus.setPosition(nmap.getCenter());
      }
    },
    getDestAddr() {
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

          setCurLonLat(lonlat);
          return result.items[0].address;
        }
      );
    },
    cancelDestAddr() {
      tFocus.setPosition(new naver.maps.LatLng(0, 0));
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
          `<div style="background:rgba(255, 255, 255, 0);text-align:center;">`,
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
    });

    naver.maps.Event.addListener(map, 'rightclick', function (e: any) {
      setTempCoords(e.coord);
      setOpenI((o: any) => !o);
    });
  }, []);

  useEffect(() => {
    const point: lonLat = curLonLat;
    if (point.lat !== 0 && point.lon !== 0) {
      nMapSetCenter(point.lat!, point.lon!, 15, nmap);
    }
  }, [curLonLat]);

  useEffect(() => {
    if (shopCurrentLat !== 0 && shopCurrentLon !== 0) {
      if (shopStr !== '') {
        if (tShop !== null) {
          tShop.setMap(null);
        }
        const coords = changeNaverCoords(shopCurrentLat, shopCurrentLon);
        let shopOver: any = null;
        const textLength = shopStr.length * 2.5;
        shopOver = new naver.maps.Marker({
          position: coords,
          map: nmap,
          title: shopStr,
          icon: {
            content: [
              `<div style="position: absolute; text-align: center; background: rgba(255, 255, 255, 0);">`,
              `<div><img src=${img} style="width: 24px; height:24px"/></div>`,
              `<div style="position: absolute; left: -${textLength}px; font-weight: bold; color: white; font-size:9; white-space: nowrap; background-color: black">${shopStr}</div>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(24, 24),
            anchor: new naver.maps.Point(12, 24),
          },
          animation: naver.maps.Animation.BOUNCE,
        });
        setTShop(shopOver);
        nMapSetCenter(shopCurrentLat, shopCurrentLon, 11, nmap);
      }
    }
  }, [shopCurrentLat, shopCurrentLon]);

  useEffect(() => {
    if (data && data.length > 0) {
      overLayList.forEach((d: any) => {
        d.setMap(null);
      });
      setOverLayList([]);

      data.map((dest: IDestInfo) => {
        let overlay: any;
        if (dest.LAT !== 0 && dest.LON !== 0) {
          const textLength = dest.DEST_NAME.length * 2.5;
          const lat = dest.LAT / 360000;
          const lon = dest.LON / 360000;
          const coord = new naver.maps.LatLng(lat.toPrecision(12), lon.toPrecision(12));
          overlay = new naver.maps.Marker({
            position: coord,
            map: nmap,
            title: dest.DEST_NAME,
            icon: {
              content: [
                `<div style="position: relative; left: -${textLength}px; text-align: center; background: rgba(255, 255, 255, 0);">`,
                `<img src=${img} style="width: 24px; height:24px"/>`,
                `<div style="font-weight: bold; font-size: 9; white-space: nowrap; background-color: white">${dest.DEST_NAME}</div>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(24, 24),
              anchor: new naver.maps.Point(12, 24),
            },
            animation: naver.maps.Animation.DROP,
          });

          setOverLayList((d: any) => [...d, overlay]);
        }

        return overlay;
      });
    }
  }, [data]);

  return <div id="map" style={style} />;
});

export default DestinationMarker;
