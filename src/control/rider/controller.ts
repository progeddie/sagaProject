let riderInfos: any[] = [];

export const riderInput = (param: any) => {
  riderInfos.push(param);
};

export const riderOutput = () => {
  return riderInfos;
};

export const deleteRiderInfo = (data: any) => {
  try {
    const index = riderInfos.findIndex(data);
    riderInfos.splice(index, 1);
  } catch (e) {
    /* empty */
  }
};

export const clearRiderInfo = () => {
  riderInfos.splice(0, riderInfos.length);
  riderInfos = null;
  riderInfos = [];
};

let shopInfos: any[] = [];

export const shopInput = (param: any) => {
  shopInfos.push(param);
};

export const shopOuput = () => {
  return shopInfos;
};

export const deleteShopInfos = (data: any) => {
  try {
    const index = shopInfos.findIndex(data);
    shopInfos.splice(index, 1);
  } catch (e) {
    /* empty */
  }
};

export const clearShopInfo = () => {
  shopInfos.splice(0, riderInfos.length);
  shopInfos = null;
  shopInfos = [];
};

let destinyList: any[] = [];

export const destinyInput = (param: any) => {
  destinyList.push(param);
};

export const destinyOutput = () => {
  return destinyList;
};

export const deleteDestinyList = (data: any) => {
  try {
    const index = destinyList.findIndex(data);
    destinyList.splice(index, 1);
  } catch (e) {
    /* empty */
  }
};

export const clearDestinyInfo = () => {
  destinyList.splice(0, riderInfos.length);
  destinyList = null;
  destinyList = [];
};

let arrowList: any[] = [];

export const arrowInput = (param: any) => {
  arrowList.push(param);
};

export const arrowOutput = () => {
  return arrowList;
};

export const deleteArrowList = (data: any) => {
  try {
    const index = arrowList.findIndex(data);
    arrowList.splice(index, 1);
  } catch (e) {
    /* empty */
  }
};

export const clearArrowListInfo = () => {
  arrowList.splice(0, riderInfos.length);
  arrowList = null;
  arrowList = [];
};
