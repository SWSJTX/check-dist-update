let g = 1e4, u = 1e3 * 60;
const m = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi);
let i = "last_signature";
const w = localStorage.getItem(i);
let f = w ? JSON.parse(w) : [];
const p = `${location.origin}/index.html`;
let d = "", r, s = !1, h = !1;
const v = async () => {
  try {
    if (!d)
      return s = !0, "";
    const t = await fetch(`${d}?t=${Date.now()}`);
    if (t.status === 200) {
      const e = await t.text();
      return s = !1, e;
    } else
      return s = !0, "";
  } catch {
    return s = !0, "";
  }
}, S = (t) => (t == null ? void 0 : t.match(m)) || [], I = async (t, e, a) => {
  if (!window.navigator.onLine || s)
    return !1;
  const n = t.length, l = Array.from(new Set(t.concat(e)));
  if (n !== l.length) {
    if (f = e, localStorage.setItem(i, JSON.stringify(f)), !n)
      return !1;
    a();
  }
};
let c = () => {
  console.log("The system version has been updated！");
};
const o = async (t) => {
  const e = await v(), a = S(e);
  await I(f, a, t);
}, y = () => {
  r && clearInterval(r);
}, T = ({
  init: t = g,
  loop: e = u,
  cb: a = c,
  url: n = p,
  cacheKey: l = i
}) => {
  d = n, i = l, c = a, g = t, u = e, h = !0, setTimeout(async () => {
    await o(a), y(), r = setInterval(async () => {
      await o(a);
    }, e);
  }, t);
};
document.addEventListener("visibilitychange", b);
const b = (t) => {
  var a, n;
  if (!h)
    return;
  (((a = t.target) == null ? void 0 : a.visibilityState) || ((n = t.target) == null ? void 0 : n.webkitVisibilityState)) !== "hidden" ? setTimeout(async () => {
    await o(c), y(), r = setInterval(async () => {
      await o(c);
    }, u);
  }, g) : y();
};
export {
  T as checkUpdate,
  y as clearTimer
};
