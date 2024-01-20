const f = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi);
let r = "last_signature";
const g = localStorage.getItem(r);
let c = g ? JSON.parse(g) : [];
const w = `${location.origin}/index.html`;
let i = "", l = null, a = !1;
const I = async () => {
  try {
    if (!i)
      return a = !0, "";
    const t = await fetch(`${i}?t=${Date.now()}`);
    if (t.status === 200) {
      const e = await t.text();
      return a = !1, e;
    } else
      return a = !0, "";
  } catch {
    return a = !0, "";
  }
}, p = (t) => (t == null ? void 0 : t.match(f)) || [], y = async (t, e, n) => {
  if (!window.navigator.onLine || a)
    return !1;
  const s = t.length, o = Array.from(new Set(t.concat(e)));
  if (s !== o.length) {
    if (c = e, localStorage.setItem(r, JSON.stringify(c)), !s)
      return !1;
    n();
  }
}, m = () => {
  console.log("The system version has been updated！");
}, u = async (t) => {
  const e = await I(), n = p(e);
  await y(c, n, t);
}, T = () => {
  l && clearInterval(l);
}, d = ({
  init: t = 1e4,
  loop: e = 6e4,
  cb: n = m,
  url: s = w,
  cacheKey: o = r
}) => {
  i = s, r = o, setTimeout(async () => {
    await u(n), T(), l = setInterval(async () => {
      await u(n);
    }, e);
  }, t);
};
export {
  d as checkUpdate,
  T as clearTimer
};
