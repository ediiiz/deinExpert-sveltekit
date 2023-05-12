// @ts-ignore
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// @ts-ignore
async function setCookie({ cname, cvalue, exdays = 0 }) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  if (exdays === 0) {
    document.cookie = `${cname}=${cvalue};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

}

// @ts-ignore
function cookieParser(cookieString) {
  if (cookieString === "")
    return {};
  let pairs = cookieString.split(";");
  // @ts-ignore
  let splittedPairs = pairs.map(cookie => cookie.split("="));
  const cookieObject = {};
  // @ts-ignore
  splittedPairs.forEach(pair => {
    // @ts-ignore
    cookieObject[pair[0]] = pair[1];
  });
  return cookieObject;
}

// @ts-ignore
function parseAllCookies(headersetcookie) {
  const cookieObject = [];
  for (const x in headersetcookie) {
    const setcookie = headersetcookie[x];
    const temp = cookieParser(setcookie);
    const y = getCookieKeyValue(temp);
    cookieObject.push(y);
  }
  return cookieObject;

}

// @ts-ignore
function getCookieKeyValue(cookie) {
  const cookieKey = Object.keys(cookie)[0];
  const cookieValue = Object.values(cookie)[0];
  return { cookieKey, cookieValue };
}

// @ts-ignore
async function generateCookieObject({ CookieObjects, headers }) {
  const newCookieObj = {}
  for (const x in CookieObjects) {
    // @ts-ignore
    newCookieObj[CookieObjects[x].cookieKey] = CookieObjects[x].cookieValue;
  }
  const arr = [];
  for (const x in Object.keys(newCookieObj)) {
    arr.push(`${Object.keys(newCookieObj)[x]}=${Object.values(newCookieObj)[x]}`);
  }
  const cookie = {
    cookie: ``
  }
  for (const x in arr) {
    cookie.cookie += `${arr[x]}; `;
  }
  headers = { ...headers, ...cookie }
  return headers;
}

// @ts-ignore
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


export { getCookie, setCookie, parseAllCookies, generateCookieObject, sleep };


