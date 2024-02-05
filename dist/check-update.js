const I = (e) => {
  const s = new Blob(["(" + e.toString() + ")()"]), n = window.URL.createObjectURL(s), t = new Worker(n);
  return window.URL.revokeObjectURL(n), t;
}, U = () => {
  let e = 1e4, s = 1e3 * 60;
  const n = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi);
  let t = `${location.origin}/index.html`, o, r = !1, c = !1;
  const g = async () => {
    try {
      if (!t)
        return r = !0, "";
      const a = await fetch(`${t}?t=${Date.now()}`);
      if (a.status === 200) {
        const u = await a.text();
        return r = !1, u;
      } else
        return r = !0, "";
    } catch {
      return r = !0, "";
    }
  }, y = (a) => (a == null ? void 0 : a.match(n)) || [], p = () => {
    clearInterval(o);
  };
  return self.onmessage = (a) => {
    const { code: u, data: v } = a.data, {
      url: h = t,
      init: S = e,
      loop: k = s
    } = v || {};
    t = h, e = S, s = k, c = !0;
    const w = async () => {
      const L = await g(), R = y(L);
      self.postMessage({
        sign: R,
        noCompare: r
      });
    };
    if (u === "pause")
      p();
    else {
      if (!c)
        return;
      setTimeout(async () => {
        await w(), p(), o = setInterval(async () => {
          await w();
        }, s);
      }, e);
    }
  }, self;
}, x = (e) => {
  e.postMessage({
    code: "pause"
  }), e.terminate();
};
let i = null, l = "last_signature";
const m = localStorage.getItem(l);
let f = m ? JSON.parse(m) : [], b = !1, d = () => {
  console.log("The system version has been updated！");
};
const C = (e, s, n) => {
  if (!window.navigator.onLine || b)
    return !1;
  const t = e.length, o = Array.from(new Set(e.concat(s)));
  if (t !== o.length) {
    if (f = s, localStorage.setItem(l, JSON.stringify(f)), !t)
      return !1;
    n();
  }
}, E = ({
  init: e,
  loop: s,
  cb: n = d,
  url: t,
  cacheKey: o = l
}) => {
  l = o, d = n, i = I(U), i.postMessage({
    code: "start",
    data: {
      init: e,
      loop: s,
      url: t
    }
  }), i.onmessage = (r) => {
    const { sign: c, noCompare: g } = r.data;
    b = g, C(f, c, d);
  };
}, M = (e) => {
  var n, t;
  (((n = e.target) == null ? void 0 : n.visibilityState) || ((t = e.target) == null ? void 0 : t.webkitVisibilityState)) === "visible" ? i.postMessage({
    code: "resume"
  }) : i.postMessage({
    code: "pause"
  });
};
document.addEventListener("visibilitychange", M);
export {
  x as cancelDetect,
  E as checkUpdate
};
