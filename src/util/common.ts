// 키값으로 그룹핑
export const groupBy = (list: any, keyGetter: any) => {
  const map = new Map();
  if (list !== null) {
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
  }
  return map;
};

// 도형 중심 좌표획득
export const getPoligonCenter = (list: any, useChange: string) => {
  let minLat: number = 0;
  let maxLat: number = 0;
  let minLon: number = 0;
  let maxLon: number = 0;
  for (let i = 0; i < list.length; i++) {
    let tempLat: number;
    let tempLon: number;

    if (useChange === 'Y') {
      // 다울좌표일경우
      tempLat = list[i].LAT / 360000;
      tempLon = list[i].LON / 360000;
    } else {
      // 네이버좌표일경우
      tempLat = list[i].LAT;
      tempLon = list[i].LON;
    }

    if (tempLat < minLat || i === 0) minLat = tempLat;
    if (tempLat > maxLat || i === 0) maxLat = tempLat;
    if (tempLon < minLon || i === 0) minLon = tempLon;
    if (tempLon > maxLon || i === 0) maxLon = tempLon;
  }

  const LAT = maxLat - (maxLat - minLat) / 2;
  const LON = maxLon - (maxLon - minLon) / 2;
  return { LAT, LON };
};

// 맵 센터이동
export const nMapSetCenter = (lat: number, lon: number, depth: number, map: any) => {
  const tempLat: number = lat / 360000;
  const tempLon: number = lon / 360000;
  const latlng: object = {
    y: tempLat.toPrecision(12),
    _lat: tempLat.toPrecision(12),
    x: tempLon.toPrecision(12),
    _lng: tempLon.toPrecision(12),
  };
  map.setCenter(latlng);
  map.setZoom(depth, true);
};

// 네이버 좌표로 변경
export const changeNaverCoords = (lat: any, lon: any) => {
  const tempLat: number = lat / 360000;
  const tempLon: number = lon / 360000;
  const coords = {
    y: tempLat.toPrecision(12),
    _lat: tempLat.toPrecision(12),
    x: tempLon.toPrecision(12),
    _lng: tempLon.toPrecision(12),
  };
  return coords;
};

// 다울 좌표로 변경
export const changeDawlCoords = (lat: any, lon: any) => {
  let tempLat: number = lat * 360000;
  let tempLon: number = lon * 360000;
  tempLat = Math.ceil(tempLat);
  tempLon = Math.ceil(tempLon);
  return { Lat: tempLat, Lon: tempLon };
};

// 전화번호 - 입력
export const changePhoneNumber = (num: string) => {
  let numStr = num || '';
  numStr = numStr.replace(/[^0-9]/g, '');
  numStr = numStr.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3');
  numStr = numStr.replace('--', '-');
  return numStr;
};

// 돈단위 콤마찍기
export const makeComma = (money: any) => {
  const mn = String(money);
  return mn.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

// 바이트체크 (UTF-8의 경우 한글은 3바이트)
export const byteCheck = (str: string) => {
  const stringLength = str.length;
  let stringByteLength: number = 0;
  for (let i = 0; i < stringLength; i++) {
    if (escape(str.charAt(i)).length >= 4) stringByteLength += 3;
    else if (escape(str.charAt(i)) === '%A7') stringByteLength += 3;
    else if (escape(str.charAt(i)) !== '%0D') stringByteLength++;
  }
  return stringByteLength;
};
