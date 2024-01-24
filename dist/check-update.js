let o = 1e4, g = 1e3 * 60;
const v = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi);
let i = "last_signature";
const w = localStorage.getItem(i);
let u = w ? JSON.parse(w) : [];
const h = `${location.origin}/index.html`;
let f = "", d, s = !1, m = !1;
const p = async () => {
  try {
    if (!f)
      return s = !0, "";
    const t = await fetch(`${f}?t=${Date.now()}`);
    if (t.status === 200) {
      const e = await t.text();
      return s = !1, e;
    } else
      return s = !0, "";
  } catch {
    return s = !0, "";
  }
}, S = (t) => (t == null ? void 0 : t.match(v)) || [], b = async (t, e, a) => {
  if (!window.navigator.onLine || s)
    return !1;
  const n = t.length, l = Array.from(new Set(t.concat(e)));
  if (n !== l.length) {
    if (u = e, localStorage.setItem(i, JSON.stringify(u)), !n)
      return !1;
    a();
  }
};
let r = () => {
  console.log("The system version has been updated！");
};
const c = async (t) => {
  const e = await p(), a = S(e);
  await b(u, a, t);
}, y = () => {
  clearInterval(d);
}, T = ({
  init: t = o,
  loop: e = g,
  cb: a = r,
  url: n = h,
  cacheKey: l = i
}) => {
  f = n, i = l, r = a, o = t, g = e, m = !0, setTimeout(async () => {
    await c(a), y(), d = setInterval(async () => {
      await c(a);
    }, e);
  }, t);
}, I = (t) => {
  var a, n;
  if (!m)
    return;
  (((a = t.target) == null ? void 0 : a.visibilityState) || ((n = t.target) == null ? void 0 : n.webkitVisibilityState)) === "visible" ? setTimeout(async () => {
    await c(r), y(), d = setInterval(async () => {
      await c(r);
    }, g);
  }, o) : y();
};
document.addEventListener("visibilitychange", I);
export {
  T as checkUpdate,
  y as clearTimer
};
