import $ from 'jquery';
import React, { useEffect, useState } from 'react';

import { getPoligonCenter, nMapSetCenter, changeNaverCoords } from '../../../util/common';

interface IPolygon {
  polygonList: any[];
}

const shop = '../../images/shop.png';

function Polygon(props: any) {
  const { style } = props;
  const { areaDataGroup } = props;
  const { currentLat } = props;
  const { currentLon } = props;
  const { shopCurrentLat } = props;
  const { shopCurrentLon } = props;
  const { colorb } = props;
  const { polygonData } = props;
  const { setPolygonData } = props;
  const { shopStr } = props;
  const { type } = props;

  // 선택 가맹점
  const [tShop, setTShop] = useState<any>(null);

  const { naver } = window;

  const [nmap, setNMap] = useState(Object);
  const [mapEvent, setMapEvent] = useState(null);
  const [polygonObj, setPolygonObj] = useState<any[]>([]);
  const [overlayObj, setOverlayObj] = useState<any[]>([]);

  const CustomOverlay = function (options: any) {
    let availableText = '[배송가능구역]';
    if (type === -1) availableText = '[배송불가구역]';
    this.str = `${options.str}: <span style='color:blue;'>${availableText}</span>`;
    this._element = $(
      `<div style="position:absolute;text-align:center;z-index:9999">` +
        `<div style="position: relative; left: -50%; font-weight: bold; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; background-Color:white;">${this.str}</div>` +
        `</div>`
    );
    this.setPosition(options.position);
    this.setMap(options.map || null);
  };

  CustomOverlay.prototype = new naver.maps.OverlayView();
  CustomOverlay.prototype.constructor = CustomOverlay;

  CustomOverlay.prototype.setPosition = function (position: any) {
    this._position = position;
    this.draw();
  };

  CustomOverlay.prototype.getPosition = function () {
    return this._position;
  };

  CustomOverlay.prototype.onAdd = function () {
    const overlayLayer = this.getPanes().overlayLayer;
    this._element.appendTo(overlayLayer);
  };

  CustomOverlay.prototype.draw = function () {
    if (!this.getMap()) {
      return;
    }

    const projection = this.getProjection(),
      position = this.getPosition(),
      pixelPosition = projection.fromCoordToOffset(position);

    this._element.css('left', pixelPosition.x);
    this._element.css('top', pixelPosition.y);
  };

  CustomOverlay.prototype.onRemove = function () {
    const overlayLayer = this.getPanes().overlayLayer;

    this._element.remove();
    this._element.off();
  };

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

    setNMap(map);
  }, []);

  useEffect(() => {
    if (currentLat !== 0 && currentLon !== 0) {
      nMapSetCenter(currentLat, currentLon, 12, nmap);
    }
  }, [currentLat, currentLon]);

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
              `<div style="text-align:center;background:rgba(255, 255, 255, 0);">`,
              `<img src=${shop} style="width: 24px; height:24px"/>`,
              `<div style="position: absolute; left: -${textLength}px; font-weight: bold; color:white; font-size:9; white-space:nowrap;background-color:black">${shopStr}</div>`,
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
    // 구역설정 시작
    if (colorb === '#FF0000') {
      const polygon = new naver.maps.Polygon({
        nmap,
        paths: [[]],
        fillColor: '#ff0000',
        fillOpacity: 0.3,
        strokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        clickable: true,
      });
      const listener = naver.maps.Event.addListener(nmap, 'rightclick', function (e: any) {
        const point = e.coord;
        const path = polygon.getPaths().getAt(0);
        path.push(point);
        polygon.setMap(nmap);
        setPolygonData(polygon);
      });
      setMapEvent(listener);
    } else {
      // 구역설정 완료
      if (polygonData) {
        polygonData.setMap(null);
      }
      naver.maps.Event.removeListener(mapEvent);
      setMapEvent(null);
    }
  }, [colorb]);

  useEffect(() => {
    if (areaDataGroup && areaDataGroup.size > 0) {
      polygonObj.forEach((data: any) => {
        data.setMap(null);
      });
      setPolygonObj([]);

      overlayObj.forEach((data: any) => {
        data.setMap(null);
      });
      setOverlayObj([]);
      // 맵좌표 이동시 계속 호출되어 계속 호출방지코드
      areaDataGroup.forEach((value: any, key: any, mapObject: any) => {
        if (value[0].PAY_AMT === type) {
          const tempArr: any[] = value;
          const path: any[] = [];

          for (let i = 0; i < tempArr.length; i++) {
            const tempLat: number = tempArr[i].LAT / 360000;
            const tempLon: number = tempArr[i].LON / 360000;
            path[i] = new naver.maps.LatLng(tempLat.toPrecision(12), tempLon.toPrecision(12));
          }

          // 도형의 중심좌표 반환
          const res = getPoligonCenter(tempArr, 'Y');

          const coord = { y: res.LAT, _lat: res.LAT, x: res.LON, _lng: res.LON };

          // 클릭한 위치에 오버레이를 추가합니다.
          const overlay: any = new (CustomOverlay as any)({
            position: coord,
            str: value[0].AREA_NAME,
          });
          overlay.setMap(nmap);
          setOverlayObj((data: any) => [...data, overlay]);

          const polygon = new naver.maps.Polygon({
            nmap,
            paths: [path],
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            strokeColor: '#ff0000',
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
          polygon.setMap(nmap);
          setPolygonObj((data: any) => [...data, polygon]);
        }
      });
    }
  }, [areaDataGroup]);

  return <div id="map" style={style} />;
}

export default Polygon;
