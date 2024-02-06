var M = function(e) {
  var t = new Blob(["(" + e.toString() + ")()"]), a = window.URL.createObjectURL(t), r = new Worker(a);
  return window.URL.revokeObjectURL(a), r;
}, W = function() {
  var e = 1e4, t = 1e3 * 60, a = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi), r = "".concat(location.origin, "/index.html"), l = void 0, i = !1, v = !1, p = function() {
    return new Promise(function(n) {
      if (!r)
        return i = !0, n("");
      fetch("".concat(r, "?t=").concat(Date.now())).then(function(u) {
        if (u.status === 200)
          u.text().then(function(d) {
            return i = !1, n(d);
          }).catch(function(d) {
            return console.log(d), i = !0, n("");
          });
        else
          return i = !0, n("");
      }).catch(function(u) {
        return console.log(u), i = !0, n("");
      });
    });
  }, m = function(n) {
    return (n == null ? void 0 : n.match(a)) || [];
  }, f = function() {
    clearInterval(l);
  };
  return self.onmessage = function(s) {
    var n = s.data, u = n.code, d = n.data, h = d || {}, y = h.url, U = y === void 0 ? r : y, k = h.init, _ = k === void 0 ? e : k, S = h.loop, I = S === void 0 ? t : S;
    r = U, e = _, t = I, v = !0;
    var $ = function() {
      p().then(function(T) {
        var E = m(T);
        self.postMessage({
          sign: E,
          noCompare: i
        });
      });
    };
    if (u === "pause")
      f();
    else {
      if (!v)
        return;
      setTimeout(function() {
        $(), f(), l = setInterval(function() {
          $();
        }, t);
      }, e);
    }
  }, self;
}, x = function(e) {
  e.postMessage({
    code: "pause"
  }), e.terminate(), e = null;
}, c = null, g = "last_signature", L = localStorage.getItem(g), w = L ? JSON.parse(L) : [], R = !1, b = function() {
  console.log("The system version has been updated！");
}, H = function(e, t, a) {
  if (!window.navigator.onLine || R)
    return !1;
  var r = e.length, l = Array.from(new Set(e.concat(t)));
  if (r !== l.length) {
    if (w = t, localStorage.setItem(g, JSON.stringify(w)), !r)
      return !1;
    a();
  }
}, C = function(e) {
  var t, a, r = ((t = e.target) === null || t === void 0 ? void 0 : t.visibilityState) || ((a = e.target) === null || a === void 0 ? void 0 : a.webkitVisibilityState);
  r === "visible" ? c.postMessage({
    code: "resume"
  }) : c.postMessage({
    code: "pause"
  });
}, O = function(e) {
  var t = e.init, a = e.loop, r = e.cb, l = r === void 0 ? b : r, i = e.url, v = e.cacheKey, p = v === void 0 ? g : v;
  g = p, b = l, c = M(W), c.postMessage({
    code: "start",
    data: {
      init: t,
      loop: a,
      url: i
    }
  }), c.onmessage = function(m) {
    var f = m.data, s = f.sign, n = f.noCompare;
    R = n, H(w, s, b);
  }, document.addEventListener("visibilitychange", C);
}, D = function() {
  c && x(c), document.removeEventListener("visibilitychange", C);
};
export {
  D as cancelDetect,
  O as checkUpdate
};
