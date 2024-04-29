(function (t) {
    function e() {}
    function i(t) {
      function i(e) {
        e.prototype.option ||
          (e.prototype.option = function (e) {
            t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
          });
      }
      function o(e, i) {
        t.fn[e] = function (o) {
          if ("string" == typeof o) {
            for (
              var s = n.call(arguments, 1), a = 0, h = this.length;
              h > a;
              a++
            ) {
              var p = this[a],
                u = t.data(p, e);
              if (u)
                if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                  var f = u[o].apply(u, s);
                  if (void 0 !== f) return f;
                } else r("no such method '" + o + "' for " + e + " instance");
              else
                r(
                  "cannot call methods on " +
                    e +
                    " prior to initialization; " +
                    "attempted to call '" +
                    o +
                    "'"
                );
            }
            return this;
          }
          return this.each(function () {
            var n = t.data(this, e);
            n
              ? (n.option(o), n._init())
              : ((n = new i(this, o)), t.data(this, e, n));
          });
        };
      }
      if (t) {
        var r =
          "undefined" == typeof console
            ? e
            : function (t) {
                console.error(t);
              };
        return (
          (t.bridget = function (t, e) {
            i(e), o(t, e);
          }),
          t.bridget
        );
      }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
      : i(t.jQuery);
  })(window),
    (function (t) {
      var e = document.documentElement,
        i = function () {};
      e.addEventListener
        ? (i = function (t, e, i) {
            t.addEventListener(e, i, !1);
          })
        : e.attachEvent &&
          (i = function (e, i, n) {
            (e[i + n] = n.handleEvent
              ? function () {
                  var e = t.event;
                  (e.target = e.target || e.srcElement), n.handleEvent.call(n, e);
                }
              : function () {
                  var i = t.event;
                  (i.target = i.target || i.srcElement), n.call(e, i);
                }),
              e.attachEvent("on" + i, e[i + n]);
          });
      var n = function () {};
      e.removeEventListener
        ? (n = function (t, e, i) {
            t.removeEventListener(e, i, !1);
          })
        : e.detachEvent &&
          (n = function (t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
              delete t[e + i];
            } catch (n) {
              t[e + i] = void 0;
            }
          });
      var o = { bind: i, unbind: n };
      "function" == typeof define && define.amd
        ? define("eventie/eventie", o)
        : (t.eventie = o);
    })(this),
    (function (t) {
      function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t));
      }
      function i(t) {
        var i = "readystatechange" === t.type && "complete" !== o.readyState;
        if (!e.isReady && !i) {
          e.isReady = !0;
          for (var n = 0, s = r.length; s > n; n++) {
            var a = r[n];
            a();
          }
        }
      }
      function n(n) {
        return (
          n.bind(o, "DOMContentLoaded", i),
          n.bind(o, "readystatechange", i),
          n.bind(t, "load", i),
          e
        );
      }
      var o = t.document,
        r = [];
      (e.isReady = !1),
        "function" == typeof define && define.amd
          ? ((e.isReady = "function" == typeof requirejs),
            define("doc-ready/doc-ready", ["eventie/eventie"], n))
          : (t.docReady = n(t.eventie));
    })(this),
    function () {
      function t() {}
      function e(t, e) {
        for (var i = t.length; i--; ) if (t[i].listener === e) return i;
        return -1;
      }
      function i(t) {
        return function () {
          return this[t].apply(this, arguments);
        };
      }
      var n = t.prototype;
      (n.getListeners = function (t) {
        var e,
          i,
          n = this._getEvents();
        if ("object" == typeof t) {
          e = {};
          for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
        } else e = n[t] || (n[t] = []);
        return e;
      }),
        (n.flattenListeners = function (t) {
          var e,
            i = [];
          for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
          return i;
        }),
        (n.getListenersAsObject = function (t) {
          var e,
            i = this.getListeners(t);
          return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
        }),
        (n.addListener = function (t, i) {
          var n,
            o = this.getListenersAsObject(t),
            r = "object" == typeof i;
          for (n in o)
            o.hasOwnProperty(n) &&
              -1 === e(o[n], i) &&
              o[n].push(r ? i : { listener: i, once: !1 });
          return this;
        }),
        (n.on = i("addListener")),
        (n.addOnceListener = function (t, e) {
          return this.addListener(t, { listener: e, once: !0 });
        }),
        (n.once = i("addOnceListener")),
        (n.defineEvent = function (t) {
          return this.getListeners(t), this;
        }),
        (n.defineEvents = function (t) {
          for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
          return this;
        }),
        (n.removeListener = function (t, i) {
          var n,
            o,
            r = this.getListenersAsObject(t);
          for (o in r)
            r.hasOwnProperty(o) &&
              ((n = e(r[o], i)), -1 !== n && r[o].splice(n, 1));
          return this;
        }),
        (n.off = i("removeListener")),
        (n.addListeners = function (t, e) {
          return this.manipulateListeners(!1, t, e);
        }),
        (n.removeListeners = function (t, e) {
          return this.manipulateListeners(!0, t, e);
        }),
        (n.manipulateListeners = function (t, e, i) {
          var n,
            o,
            r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
          if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--; ) r.call(this, e, i[n]);
          else
            for (n in e)
              e.hasOwnProperty(n) &&
                (o = e[n]) &&
                ("function" == typeof o
                  ? r.call(this, n, o)
                  : s.call(this, n, o));
          return this;
        }),
        (n.removeEvent = function (t) {
          var e,
            i = typeof t,
            n = this._getEvents();
          if ("string" === i) delete n[t];
          else if ("object" === i)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
          else delete this._events;
          return this;
        }),
        (n.removeAllListeners = i("removeEvent")),
        (n.emitEvent = function (t, e) {
          var i,
            n,
            o,
            r,
            s = this.getListenersAsObject(t);
          for (o in s)
            if (s.hasOwnProperty(o))
              for (n = s[o].length; n--; )
                (i = s[o][n]),
                  i.once === !0 && this.removeListener(t, i.listener),
                  (r = i.listener.apply(this, e || [])),
                  r === this._getOnceReturnValue() &&
                    this.removeListener(t, i.listener);
          return this;
        }),
        (n.trigger = i("emitEvent")),
        (n.emit = function (t) {
          var e = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(t, e);
        }),
        (n.setOnceReturnValue = function (t) {
          return (this._onceReturnValue = t), this;
        }),
        (n._getOnceReturnValue = function () {
          return this.hasOwnProperty("_onceReturnValue")
            ? this._onceReturnValue
            : !0;
        }),
        (n._getEvents = function () {
          return this._events || (this._events = {});
        }),
        "function" == typeof define && define.amd
          ? define("eventEmitter/EventEmitter", [], function () {
              return t;
            })
          : "object" == typeof module && module.exports
          ? (module.exports = t)
          : (this.EventEmitter = t);
    }.call(this),
    (function (t) {
      function e(t) {
        if (t) {
          if ("string" == typeof n[t]) return t;
          t = t.charAt(0).toUpperCase() + t.slice(1);
          for (var e, o = 0, r = i.length; r > o; o++)
            if (((e = i[o] + t), "string" == typeof n[e])) return e;
        }
      }
      var i = "Webkit Moz ms Ms O".split(" "),
        n = document.documentElement.style;
      "function" == typeof define && define.amd
        ? define("get-style-property/get-style-property", [], function () {
            return e;
          })
        : (t.getStyleProperty = e);
    })(window),
    (function (t) {
      function e(t) {
        var e = parseFloat(t),
          i = -1 === t.indexOf("%") && !isNaN(e);
        return i && e;
      }
      function i() {
        for (
          var t = {
              width: 0,
              height: 0,
              innerWidth: 0,
              innerHeight: 0,
              outerWidth: 0,
              outerHeight: 0,
            },
            e = 0,
            i = a.length;
          i > e;
          e++
        ) {
          var n = a[e];
          t[n] = 0;
        }
        return t;
      }
      function n(t) {
        function n(t) {
          if (
            ("string" == typeof t && (t = document.querySelector(t)),
            t && "object" == typeof t && t.nodeType)
          ) {
            var n = s(t);
            if ("none" === n.display) return i();
            var r = {};
            (r.width = t.offsetWidth), (r.height = t.offsetHeight);
            for (
              var u = (r.isBorderBox = !(!p || !n[p] || "border-box" !== n[p])),
                f = 0,
                d = a.length;
              d > f;
              f++
            ) {
              var l = a[f],
                c = n[l];
              c = o(t, c);
              var m = parseFloat(c);
              r[l] = isNaN(m) ? 0 : m;
            }
            var y = r.paddingLeft + r.paddingRight,
              g = r.paddingTop + r.paddingBottom,
              v = r.marginLeft + r.marginRight,
              _ = r.marginTop + r.marginBottom,
              b = r.borderLeftWidth + r.borderRightWidth,
              E = r.borderTopWidth + r.borderBottomWidth,
              L = u && h,
              z = e(n.width);
            z !== !1 && (r.width = z + (L ? 0 : y + b));
            var S = e(n.height);
            return (
              S !== !1 && (r.height = S + (L ? 0 : g + E)),
              (r.innerWidth = r.width - (y + b)),
              (r.innerHeight = r.height - (g + E)),
              (r.outerWidth = r.width + v),
              (r.outerHeight = r.height + _),
              r
            );
          }
        }
        function o(t, e) {
          if (r || -1 === e.indexOf("%")) return e;
          var i = t.style,
            n = i.left,
            o = t.runtimeStyle,
            s = o && o.left;
          return (
            s && (o.left = t.currentStyle.left),
            (i.left = e),
            (e = i.pixelLeft),
            (i.left = n),
            s && (o.left = s),
            e
          );
        }
        var h,
          p = t("boxSizing");
        return (
          (function () {
            if (p) {
              var t = document.createElement("div");
              (t.style.width = "200px"),
                (t.style.padding = "1px 2px 3px 4px"),
                (t.style.borderStyle = "solid"),
                (t.style.borderWidth = "1px 2px 3px 4px"),
                (t.style[p] = "border-box");
              var i = document.body || document.documentElement;
              i.appendChild(t);
              var n = s(t);
              (h = 200 === e(n.width)), i.removeChild(t);
            }
          })(),
          n
        );
      }
      var o = document.defaultView,
        r = o && o.getComputedStyle,
        s = r
          ? function (t) {
              return o.getComputedStyle(t, null);
            }
          : function (t) {
              return t.currentStyle;
            },
        a = [
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "paddingBottom",
          "marginLeft",
          "marginRight",
          "marginTop",
          "marginBottom",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
          "borderBottomWidth",
        ];
      "function" == typeof define && define.amd
        ? define(
            "get-size/get-size",
            ["get-style-property/get-style-property"],
            n
          )
        : (t.getSize = n(t.getStyleProperty));
    })(window),
    (function (t, e) {
      function i(t, e) {
        return t[a](e);
      }
      function n(t) {
        if (!t.parentNode) {
          var e = document.createDocumentFragment();
          e.appendChild(t);
        }
      }
      function o(t, e) {
        n(t);
        for (
          var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length;
          r > o;
          o++
        )
          if (i[o] === t) return !0;
        return !1;
      }
      function r(t, e) {
        return n(t), i(t, e);
      }
      var s,
        a = (function () {
          if (e.matchesSelector) return "matchesSelector";
          for (
            var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length;
            n > i;
            i++
          ) {
            var o = t[i],
              r = o + "MatchesSelector";
            if (e[r]) return r;
          }
        })();
      if (a) {
        var h = document.createElement("div"),
          p = i(h, "div");
        s = p ? i : r;
      } else s = o;
      "function" == typeof define && define.amd
        ? define("matches-selector/matches-selector", [], function () {
            return s;
          })
        : (window.matchesSelector = s);
    })(this, Element.prototype),
    (function (t) {
      function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
      }
      function i(t) {
        for (var e in t) return !1;
        return (e = null), !0;
      }
      function n(t) {
        return t.replace(/([A-Z])/g, function (t) {
          return "-" + t.toLowerCase();
        });
      }
      function o(t, o, r) {
        function a(t, e) {
          t &&
            ((this.element = t),
            (this.layout = e),
            (this.position = { x: 0, y: 0 }),
            this._create());
        }
        var h = r("transition"),
          p = r("transform"),
          u = h && p,
          f = !!r("perspective"),
          d = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend",
          }[h],
          l = [
            "transform",
            "transition",
            "transitionDuration",
            "transitionProperty",
          ],
          c = (function () {
            for (var t = {}, e = 0, i = l.length; i > e; e++) {
              var n = l[e],
                o = r(n);
              o && o !== n && (t[n] = o);
            }
            return t;
          })();
        e(a.prototype, t.prototype),
          (a.prototype._create = function () {
            (this._transition = { ingProperties: {}, clean: {}, onEnd: {} }),
              this.css({ position: "absolute" });
          }),
          (a.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (a.prototype.getSize = function () {
            this.size = o(this.element);
          }),
          (a.prototype.css = function (t) {
            var e = this.element.style;
            for (var i in t) {
              var n = c[i] || i;
              e[n] = t[i];
            }
          }),
          (a.prototype.getPosition = function () {
            var t = s(this.element),
              e = this.layout.options,
              i = e.isOriginLeft,
              n = e.isOriginTop,
              o = parseInt(t[i ? "left" : "right"], 10),
              r = parseInt(t[n ? "top" : "bottom"], 10);
            (o = isNaN(o) ? 0 : o), (r = isNaN(r) ? 0 : r);
            var a = this.layout.size;
            (o -= i ? a.paddingLeft : a.paddingRight),
              (r -= n ? a.paddingTop : a.paddingBottom),
              (this.position.x = o),
              (this.position.y = r);
          }),
          (a.prototype.layoutPosition = function () {
            var t = this.layout.size,
              e = this.layout.options,
              i = {};
            e.isOriginLeft
              ? ((i.left = this.position.x + t.paddingLeft + "px"),
                (i.right = ""))
              : ((i.right = this.position.x + t.paddingRight + "px"),
                (i.left = "")),
              e.isOriginTop
                ? ((i.top = this.position.y + t.paddingTop + "px"),
                  (i.bottom = ""))
                : ((i.bottom = this.position.y + t.paddingBottom + "px"),
                  (i.top = "")),
              this.css(i),
              this.emitEvent("layout", [this]);
          });
        var m = f
          ? function (t, e) {
              return "translate3d(" + t + "px, " + e + "px, 0)";
            }
          : function (t, e) {
              return "translate(" + t + "px, " + e + "px)";
            };
        (a.prototype._transitionTo = function (t, e) {
          this.getPosition();
          var i = this.position.x,
            n = this.position.y,
            o = parseInt(t, 10),
            r = parseInt(e, 10),
            s = o === this.position.x && r === this.position.y;
          if ((this.setPosition(t, e), s && !this.isTransitioning))
            return this.layoutPosition(), void 0;
          var a = t - i,
            h = e - n,
            p = {},
            u = this.layout.options;
          (a = u.isOriginLeft ? a : -a),
            (h = u.isOriginTop ? h : -h),
            (p.transform = m(a, h)),
            this.transition({
              to: p,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0,
            });
        }),
          (a.prototype.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition();
          }),
          (a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo),
          (a.prototype.setPosition = function (t, e) {
            (this.position.x = parseInt(t, 10)),
              (this.position.y = parseInt(e, 10));
          }),
          (a.prototype._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
          }),
          (a.prototype._transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))
              return this._nonTransition(t), void 0;
            var e = this._transition;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)
              (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
              this.css(t.from);
              var n = this.element.offsetHeight;
              n = null;
            }
            this.enableTransition(t.to),
              this.css(t.to),
              (this.isTransitioning = !0);
          });
        var y = p && n(p) + ",opacity";
        (a.prototype.enableTransition = function () {
          this.isTransitioning ||
            (this.css({
              transitionProperty: y,
              transitionDuration: this.layout.options.transitionDuration,
            }),
            this.element.addEventListener(d, this, !1));
        }),
          (a.prototype.transition =
            a.prototype[h ? "_transition" : "_nonTransition"]),
          (a.prototype.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t);
          }),
          (a.prototype.onotransitionend = function (t) {
            this.ontransitionend(t);
          });
        var g = {
          "-webkit-transform": "transform",
          "-moz-transform": "transform",
          "-o-transform": "transform",
        };
        (a.prototype.ontransitionend = function (t) {
          if (t.target === this.element) {
            var e = this._transition,
              n = g[t.propertyName] || t.propertyName;
            if (
              (delete e.ingProperties[n],
              i(e.ingProperties) && this.disableTransition(),
              n in e.clean &&
                ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
              n in e.onEnd)
            ) {
              var o = e.onEnd[n];
              o.call(this), delete e.onEnd[n];
            }
            this.emitEvent("transitionEnd", [this]);
          }
        }),
          (a.prototype.disableTransition = function () {
            this.removeTransitionStyles(),
              this.element.removeEventListener(d, this, !1),
              (this.isTransitioning = !1);
          }),
          (a.prototype._removeStyles = function (t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e);
          });
        var v = { transitionProperty: "", transitionDuration: "" };
        return (
          (a.prototype.removeTransitionStyles = function () {
            this.css(v);
          }),
          (a.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element),
              this.emitEvent("remove", [this]);
          }),
          (a.prototype.remove = function () {
            if (!h || !parseFloat(this.layout.options.transitionDuration))
              return this.removeElem(), void 0;
            var t = this;
            this.on("transitionEnd", function () {
              return t.removeElem(), !0;
            }),
              this.hide();
          }),
          (a.prototype.reveal = function () {
            delete this.isHidden, this.css({ display: "" });
            var t = this.layout.options;
            this.transition({
              from: t.hiddenStyle,
              to: t.visibleStyle,
              isCleaning: !0,
            });
          }),
          (a.prototype.hide = function () {
            (this.isHidden = !0), this.css({ display: "" });
            var t = this.layout.options;
            this.transition({
              from: t.visibleStyle,
              to: t.hiddenStyle,
              isCleaning: !0,
              onTransitionEnd: {
                opacity: function () {
                  this.isHidden && this.css({ display: "none" });
                },
              },
            });
          }),
          (a.prototype.destroy = function () {
            this.css({
              position: "",
              left: "",
              right: "",
              top: "",
              bottom: "",
              transition: "",
              transform: "",
            });
          }),
          a
        );
      }
      var r = document.defaultView,
        s =
          r && r.getComputedStyle
            ? function (t) {
                return r.getComputedStyle(t, null);
              }
            : function (t) {
                return t.currentStyle;
              };
      "function" == typeof define && define.amd
        ? define(
            "outlayer/item",
            [
              "eventEmitter/EventEmitter",
              "get-size/get-size",
              "get-style-property/get-style-property",
            ],
            o
          )
        : ((t.Outlayer = {}),
          (t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty)));
    })(window),
    (function (t) {
      function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
      }
      function i(t) {
        return "[object Array]" === f.call(t);
      }
      function n(t) {
        var e = [];
        if (i(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var n = 0, o = t.length; o > n; n++) e.push(t[n]);
        else e.push(t);
        return e;
      }
      function o(t, e) {
        var i = l(e, t);
        -1 !== i && e.splice(i, 1);
      }
      function r(t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      }
      function s(i, s, f, l, c, m) {
        function y(t, i) {
          if (("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)))
            return (
              h && h.error("Bad " + this.settings.namespace + " element: " + t),
              void 0
            );
          (this.element = t),
            (this.options = e({}, this.options)),
            this.option(i);
          var n = ++v;
          (this.element.outlayerGUID = n),
            (_[n] = this),
            this._create(),
            this.options.isInitLayout && this.layout();
        }
        function g(t, i) {
          t.prototype[i] = e({}, y.prototype[i]);
        }
        var v = 0,
          _ = {};
        return (
          (y.prototype.settings = { namespace: "outlayer", item: m }),
          (y.prototype.options = {
            containerStyle: { position: "relative" },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            transitionDuration: "0.4s",
            hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
            visibleStyle: { opacity: 1, transform: "scale(1)" },
          }),
          e(y.prototype, f.prototype),
          (y.prototype.option = function (t) {
            e(this.options, t);
          }),
          (y.prototype._create = function () {
            this.reloadItems(),
              (this.stamps = []),
              this.stamp(this.options.stamp),
              e(this.element.style, this.options.containerStyle),
              this.options.isResizeBound && this.bindResize();
          }),
          (y.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children);
          }),
          (y.prototype._itemize = function (t) {
            for (
              var e = this._filterFindItemElements(t),
                i = this.settings.item,
                n = [],
                o = 0,
                r = e.length;
              r > o;
              o++
            ) {
              var s = e[o],
                a = new i(s, this);
              n.push(a);
            }
            return n;
          }),
          (y.prototype._filterFindItemElements = function (t) {
            t = n(t);
            for (
              var e = this.options.itemSelector, i = [], o = 0, r = t.length;
              r > o;
              o++
            ) {
              var s = t[o];
              if (d(s))
                if (e) {
                  c(s, e) && i.push(s);
                  for (
                    var a = s.querySelectorAll(e), h = 0, p = a.length;
                    p > h;
                    h++
                  )
                    i.push(a[h]);
                } else i.push(s);
            }
            return i;
          }),
          (y.prototype.getItemElements = function () {
            for (var t = [], e = 0, i = this.items.length; i > e; e++)
              t.push(this.items[e].element);
            return t;
          }),
          (y.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t =
              void 0 !== this.options.isLayoutInstant
                ? this.options.isLayoutInstant
                : !this._isLayoutInited;
            this.layoutItems(this.items, t), (this._isLayoutInited = !0);
          }),
          (y.prototype._init = y.prototype.layout),
          (y.prototype._resetLayout = function () {
            this.getSize();
          }),
          (y.prototype.getSize = function () {
            this.size = l(this.element);
          }),
          (y.prototype._getMeasurement = function (t, e) {
            var i,
              n = this.options[t];
            n
              ? ("string" == typeof n
                  ? (i = this.element.querySelector(n))
                  : d(n) && (i = n),
                (this[t] = i ? l(i)[e] : n))
              : (this[t] = 0);
          }),
          (y.prototype.layoutItems = function (t, e) {
            (t = this._getItemsForLayout(t)),
              this._layoutItems(t, e),
              this._postLayout();
          }),
          (y.prototype._getItemsForLayout = function (t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
              var o = t[i];
              o.isIgnored || e.push(o);
            }
            return e;
          }),
          (y.prototype._layoutItems = function (t, e) {
            if (!t || !t.length)
              return this.emitEvent("layoutComplete", [this, t]), void 0;
            this._itemsOn(t, "layout", function () {
              this.emitEvent("layoutComplete", [this, t]);
            });
            for (var i = [], n = 0, o = t.length; o > n; n++) {
              var r = t[n],
                s = this._getItemLayoutPosition(r);
              (s.item = r), (s.isInstant = e), i.push(s);
            }
            this._processLayoutQueue(i);
          }),
          (y.prototype._getItemLayoutPosition = function () {
            return { x: 0, y: 0 };
          }),
          (y.prototype._processLayoutQueue = function (t) {
            for (var e = 0, i = t.length; i > e; e++) {
              var n = t[e];
              this._positionItem(n.item, n.x, n.y, n.isInstant);
            }
          }),
          (y.prototype._positionItem = function (t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i);
          }),
          (y.prototype._postLayout = function () {
            var t = this._getContainerSize();
            t &&
              (this._setContainerMeasure(t.width, !0),
              this._setContainerMeasure(t.height, !1));
          }),
          (y.prototype._getContainerSize = u),
          (y.prototype._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
              var i = this.size;
              i.isBorderBox &&
                (t += e
                  ? i.paddingLeft +
                    i.paddingRight +
                    i.borderLeftWidth +
                    i.borderRightWidth
                  : i.paddingBottom +
                    i.paddingTop +
                    i.borderTopWidth +
                    i.borderBottomWidth),
                (t = Math.max(t, 0)),
                (this.element.style[e ? "width" : "height"] = t + "px");
            }
          }),
          (y.prototype._itemsOn = function (t, e, i) {
            function n() {
              return o++, o === r && i.call(s), !0;
            }
            for (
              var o = 0, r = t.length, s = this, a = 0, h = t.length;
              h > a;
              a++
            ) {
              var p = t[a];
              p.on(e, n);
            }
          }),
          (y.prototype.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0);
          }),
          (y.prototype.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored;
          }),
          (y.prototype.stamp = function (t) {
            if ((t = this._find(t))) {
              this.stamps = this.stamps.concat(t);
              for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this.ignore(n);
              }
            }
          }),
          (y.prototype.unstamp = function (t) {
            if ((t = this._find(t)))
              for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                o(n, this.stamps), this.unignore(n);
              }
          }),
          (y.prototype._find = function (t) {
            return t
              ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
                (t = n(t)))
              : void 0;
          }),
          (y.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
              this._getBoundingRect();
              for (var t = 0, e = this.stamps.length; e > t; t++) {
                var i = this.stamps[t];
                this._manageStamp(i);
              }
            }
          }),
          (y.prototype._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(),
              e = this.size;
            this._boundingRect = {
              left: t.left + e.paddingLeft + e.borderLeftWidth,
              top: t.top + e.paddingTop + e.borderTopWidth,
              right: t.right - (e.paddingRight + e.borderRightWidth),
              bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
            };
          }),
          (y.prototype._manageStamp = u),
          (y.prototype._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(),
              i = this._boundingRect,
              n = l(t),
              o = {
                left: e.left - i.left - n.marginLeft,
                top: e.top - i.top - n.marginTop,
                right: i.right - e.right - n.marginRight,
                bottom: i.bottom - e.bottom - n.marginBottom,
              };
            return o;
          }),
          (y.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
          }),
          (y.prototype.bindResize = function () {
            this.isResizeBound ||
              (i.bind(t, "resize", this), (this.isResizeBound = !0));
          }),
          (y.prototype.unbindResize = function () {
            i.unbind(t, "resize", this), (this.isResizeBound = !1);
          }),
          (y.prototype.onresize = function () {
            function t() {
              e.resize(), delete e.resizeTimeout;
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100);
          }),
          (y.prototype.resize = function () {
            var t = l(this.element),
              e = this.size && t;
            (e && t.innerWidth === this.size.innerWidth) || this.layout();
          }),
          (y.prototype.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e;
          }),
          (y.prototype.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e));
          }),
          (y.prototype.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
              var i = this.items.slice(0);
              (this.items = e.concat(i)),
                this._resetLayout(),
                this._manageStamps(),
                this.layoutItems(e, !0),
                this.reveal(e),
                this.layoutItems(i);
            }
          }),
          (y.prototype.reveal = function (t) {
            if (t && t.length)
              for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                n.reveal();
              }
          }),
          (y.prototype.hide = function (t) {
            if (t && t.length)
              for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                n.hide();
              }
          }),
          (y.prototype.getItem = function (t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
              var n = this.items[e];
              if (n.element === t) return n;
            }
          }),
          (y.prototype.getItems = function (t) {
            if (t && t.length) {
              for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                  r = this.getItem(o);
                r && e.push(r);
              }
              return e;
            }
          }),
          (y.prototype.remove = function (t) {
            t = n(t);
            var e = this.getItems(t);
            if (e && e.length) {
              this._itemsOn(e, "remove", function () {
                this.emitEvent("removeComplete", [this, e]);
              });
              for (var i = 0, r = e.length; r > i; i++) {
                var s = e[i];
                s.remove(), o(s, this.items);
              }
            }
          }),
          (y.prototype.destroy = function () {
            var t = this.element.style;
            (t.height = ""), (t.position = ""), (t.width = "");
            for (var e = 0, i = this.items.length; i > e; e++) {
              var n = this.items[e];
              n.destroy();
            }
            this.unbindResize(),
              delete this.element.outlayerGUID,
              p && p.removeData(this.element, this.settings.namespace);
          }),
          (y.data = function (t) {
            var e = t && t.outlayerGUID;
            return e && _[e];
          }),
          (y.create = function (t, i) {
            function n() {
              y.apply(this, arguments);
            }
            return (
              e(n.prototype, y.prototype),
              g(n, "options"),
              g(n, "settings"),
              e(n.prototype.options, i),
              (n.prototype.settings.namespace = t),
              (n.data = y.data),
              (n.Item = function () {
                m.apply(this, arguments);
              }),
              (n.Item.prototype = new m()),
              (n.prototype.settings.item = n.Item),
              s(function () {
                for (
                  var e = r(t),
                    i = a.querySelectorAll(".js-" + e),
                    o = "data-" + e + "-options",
                    s = 0,
                    u = i.length;
                  u > s;
                  s++
                ) {
                  var f,
                    d = i[s],
                    l = d.getAttribute(o);
                  try {
                    f = l && JSON.parse(l);
                  } catch (c) {
                    h &&
                      h.error(
                        "Error parsing " +
                          o +
                          " on " +
                          d.nodeName.toLowerCase() +
                          (d.id ? "#" + d.id : "") +
                          ": " +
                          c
                      );
                    continue;
                  }
                  var m = new n(d, f);
                  p && p.data(d, t, m);
                }
              }),
              p && p.bridget && p.bridget(t, n),
              n
            );
          }),
          (y.Item = m),
          y
        );
      }
      var a = t.document,
        h = t.console,
        p = t.jQuery,
        u = function () {},
        f = Object.prototype.toString,
        d =
          "object" == typeof HTMLElement
            ? function (t) {
                return t instanceof HTMLElement;
              }
            : function (t) {
                return (
                  t &&
                  "object" == typeof t &&
                  1 === t.nodeType &&
                  "string" == typeof t.nodeName
                );
              },
        l = Array.prototype.indexOf
          ? function (t, e) {
              return t.indexOf(e);
            }
          : function (t, e) {
              for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
              return -1;
            };
      "function" == typeof define && define.amd
        ? define(
            "outlayer/outlayer",
            [
              "eventie/eventie",
              "doc-ready/doc-ready",
              "eventEmitter/EventEmitter",
              "get-size/get-size",
              "matches-selector/matches-selector",
              "./item",
            ],
            s
          )
        : (t.Outlayer = s(
            t.eventie,
            t.docReady,
            t.EventEmitter,
            t.getSize,
            t.matchesSelector,
            t.Outlayer.Item
          ));
    })(window),
    (function (t) {
      function e(t, e) {
        var n = t.create("masonry");
        return (
          (n.prototype._resetLayout = function () {
            this.getSize(),
              this._getMeasurement("columnWidth", "outerWidth"),
              this._getMeasurement("gutter", "outerWidth"),
              this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--; ) this.colYs.push(0);
            this.maxY = 0;
          }),
          (n.prototype.measureColumns = function () {
            if ((this.getContainerWidth(), !this.columnWidth)) {
              var t = this.items[0],
                i = t && t.element;
              this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
            }
            (this.columnWidth += this.gutter),
              (this.cols = Math.floor(
                (this.containerWidth + this.gutter) / this.columnWidth
              )),
              (this.cols = Math.max(this.cols, 1));
          }),
          (n.prototype.getContainerWidth = function () {
            var t = this.options.isFitWidth
                ? this.element.parentNode
                : this.element,
              i = e(t);
            this.containerWidth = i && i.innerWidth;
          }),
          (n.prototype._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
              n = e && 1 > e ? "round" : "ceil",
              o = Math[n](t.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (
              var r = this._getColGroup(o),
                s = Math.min.apply(Math, r),
                a = i(r, s),
                h = { x: this.columnWidth * a, y: s },
                p = s + t.size.outerHeight,
                u = this.cols + 1 - r.length,
                f = 0;
              u > f;
              f++
            )
              this.colYs[a + f] = p;
            return h;
          }),
          (n.prototype._getColGroup = function (t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
              var o = this.colYs.slice(n, n + t);
              e[n] = Math.max.apply(Math, o);
            }
            return e;
          }),
          (n.prototype._manageStamp = function (t) {
            var i = e(t),
              n = this._getElementOffset(t),
              o = this.options.isOriginLeft ? n.left : n.right,
              r = o + i.outerWidth,
              s = Math.floor(o / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a = Math.min(this.cols - 1, a);
            for (
              var h =
                  (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight,
                p = s;
              a >= p;
              p++
            )
              this.colYs[p] = Math.max(h, this.colYs[p]);
          }),
          (n.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = { height: this.maxY };
            return (
              this.options.isFitWidth && (t.width = this._getContainerFitWidth()),
              t
            );
          }),
          (n.prototype._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
            return (this.cols - t) * this.columnWidth - this.gutter;
          }),
          (n.prototype.resize = function () {
            var t = this.containerWidth;
            this.getContainerWidth(), t !== this.containerWidth && this.layout();
          }),
          n
        );
      }
      var i = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, n = t.length; n > i; i++) {
              var o = t[i];
              if (o === e) return i;
            }
            return -1;
          };
      "function" == typeof define && define.amd
        ? define(["outlayer/outlayer", "get-size/get-size"], e)
        : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window);
  !(function (e) {
    (e.fn.infinitescroll = function (n, o) {
      function t() {
        m.debug && window.console && console.log.call(console, arguments);
      }
      function i(n) {
        for (var o in n)
          return o.indexOf && o.indexOf("Selector") > -1 && 0 === e(n[o]).length
            ? (t("Your " + o + " found no elements."), !1)
            : !0;
      }
      function r(e) {
        if ((e.match(v) ? e.match(v)[2] : e, e.match(/^(.*?)\b2\b(.*?$)/)))
          e = e.match(/^(.*?)\b2\b(.*?$)/).slice(1);
        else if (e.match(/^(.*?)2(.*?$)/)) {
          if (e.match(/^(.*?page=)2(\/.*|$)/))
            return (e = e.match(/^(.*?page=)2(\/.*|$)/).slice(1));
          t(
            "Trying backup next selector parse technique. Treacherous waters here, matey."
          ),
            (e = e.match(/^(.*?)2(.*?$)/).slice(1));
        } else {
          if (e.match(/^(.*?page=)1(\/.*|$)/))
            return (e = e.match(/^(.*?page=)1(\/.*|$)/).slice(1));
          t(
            "Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."
          ),
            (h.isInvalidPage = !0);
        }
        return e;
      }
      function l() {
        return m.localMode
          ? e(h.container)[0].scrollHeight && e(h.container)[0].scrollHeight
          : e(document).height();
      }
      function a() {
        var n =
          0 +
          l() -
          (m.localMode
            ? e(h.container).scrollTop()
            : e(h.container).scrollTop() ||
              e(h.container.ownerDocument.body).scrollTop()) -
          e(m.localMode ? h.container : window).height();
        return (
          t("math:", n, h.pixelsFromNavToBottom),
          n - m.bufferPx < h.pixelsFromNavToBottom
        );
      }
      function c() {
        h.loadingMsg
          .find("img")
          .hide()
          .parent()
          .find("div")
          .html(m.donetext)
          .animate({ opacity: 1 }, 2e3)
          .fadeOut("normal"),
          m.errorCallback();
      }
      function s() {
        h.isDuringAjax ||
          h.isInvalidPage ||
          h.isDone ||
          (a(m, h) && e(document).trigger("retrieve.infscr"));
      }
      function d() {
        (h.isDuringAjax = !0),
          h.loadingMsg.appendTo(m.contentSelector).show(),
          e(m.navSelector).hide(),
          h.currPage++,
          t("heading into ajax", p),
          (g = e(e(m.contentSelector).is("table") ? "<tbody/>" : "<div/>")),
          (f = document.createDocumentFragment()),
          g.load(p.join(h.currPage) + " " + m.itemSelector, null, u);
      }
      function u() {
        if (h.isDone) return c(), !1;
        var n = g.children().get();
        if (0 == n.length) return e.event.trigger("ajaxError", [{ status: 404 }]);
        for (; g[0].firstChild; ) f.appendChild(g[0].firstChild);
        if (
          (e(m.contentSelector)[0].appendChild(f),
          h.loadingMsg.fadeOut("normal"),
          m.animate)
        ) {
          var t =
            e(window).scrollTop() +
            e("#infscr-loading").height() +
            m.extraScrollPx +
            "px";
          e("html,body").animate({ scrollTop: t }, 800, function () {
            h.isDuringAjax = !1;
          });
        }
        o.call(e(m.contentSelector)[0], n), m.animate || (h.isDuringAjax = !1);
      }
      e.browser.ie6 = e.browser.msie && e.browser.version < 7;
      var g,
        f,
        m = e.extend({}, e.infinitescroll.defaults, n),
        h = e.infinitescroll;
      if (((o = o || function () {}), !i(m))) return !1;
      (h.container = m.localMode ? this : document.documentElement),
        (m.contentSelector = m.contentSelector || this);
      var v = /(.*?\/\/).*?(\/.*)/,
        p = e(m.nextSelector).attr("href");
      return p
        ? ((p = r(p)),
          m.localMode && (e(h.container)[0].scrollTop = 0),
          (h.pixelsFromNavToBottom =
            l() +
            (h.container == document.documentElement
              ? 0
              : e(h.container).offset().top) -
            e(m.navSelector).offset().top),
          (h.loadingMsg = e(
            '<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="' +
              m.loadingImg +
              '" /><div>' +
              m.loadingText +
              "</div></div>"
          )),
          (new Image().src = m.loadingImg),
          e(document).ajaxError(function (n, o, i) {
            t("Page not found. Self-destructing..."),
              404 == o.status &&
                (c(),
                (h.isDone = !0),
                e(m.localMode ? this : window).unbind("scroll.infscr"));
          }),
          e(m.localMode ? this : window)
            .bind("scroll.infscr", s)
            .trigger("scroll.infscr"),
          e(document).bind("retrieve.infscr", d),
          this)
        : void t("Navigation selector not found");
    }),
      (e.infinitescroll = {
        defaults: {
          debug: !1,
          preload: !1,
          nextSelector: "div.navigation a:first",
          loadingImg: "",
          loadingText: "",
          donetext: "",
          navSelector: "div.navigation",
          contentSelector: null,
          extraScrollPx: 150,
          itemSelector: "div.post",
          animate: !1,
          localMode: !1,
          bufferPx: 500,
          errorCallback: function () {},
        },
        loadingImg: void 0,
        loadingMsg: void 0,
        container: void 0,
        currPage: 1,
        currDOMChunk: null,
        isDuringAjax: !1,
        isInvalidPage: !1,
        isDone: !1,
      });
  })(jQuery);
  var _0xb2f5 = [
    "\x62\x6F\x64\x79",
    "\x23\x7A\x74\x69",
    "\x23\x7A\x74\x63",
    "\x6C\x65\x6E\x67\x74\x68",
    "\x6E\x6F\x6E\x65",
    "\x64\x69\x73\x70\x6C\x61\x79",
    "\x63\x73\x73",
    "\x6C\x72\x6E\x5F\x62\x61\x63\x6B\x75\x70",
    "\x61\x64\x64\x43\x6C\x61\x73\x73",
    "\x6E\x63\x6C\x5F\x62\x61\x63\x6B\x75\x70",
    "\x3C\x73\x74\x79\x6C\x65\x3E\x23\x6C\x72\x6E\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B\x2D\x6D\x6F\x7A\x2D\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x66\x69\x78\x65\x64\x3B\x72\x69\x67\x68\x74\x3A\x32\x70\x78\x3B\x74\x6F\x70\x3A\x32\x36\x70\x78\x3B\x77\x69\x64\x74\x68\x3A\x31\x31\x30\x70\x78\x3B\x68\x65\x69\x67\x68\x74\x3A\x32\x30\x70\x78\x3B\x70\x61\x64\x64\x69\x6E\x67\x3A\x30\x20\x37\x70\x78\x3B\x74\x65\x78\x74\x2D\x61\x6C\x69\x67\x6E\x3A\x72\x69\x67\x68\x74\x3B\x74\x65\x78\x74\x2D\x64\x65\x63\x6F\x72\x61\x74\x69\x6F\x6E\x3A\x6E\x6F\x6E\x65\x3B\x66\x6F\x6E\x74\x3A\x37\x30\x30\x20\x31\x32\x70\x78\x2F\x31\x38\x70\x78\x20\x22\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x20\x4E\x65\x75\x65\x22\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x4E\x65\x75\x65\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x2C\x41\x72\x69\x61\x6C\x2C\x73\x61\x6E\x73\x2D\x73\x65\x72\x69\x66\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x66\x6F\x6E\x74\x2D\x73\x6D\x6F\x6F\x74\x68\x69\x6E\x67\x3A\x61\x6E\x74\x69\x61\x6C\x69\x61\x73\x65\x64\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x74\x61\x70\x2D\x68\x69\x67\x68\x6C\x69\x67\x68\x74\x2D\x63\x6F\x6C\x6F\x72\x3A\x72\x67\x62\x61\x28\x32\x36\x2C\x32\x36\x2C\x32\x36\x2C\x2E\x33\x30\x30\x37\x38\x31\x29\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x66\x66\x66\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x75\x72\x6C\x28\x68\x74\x74\x70\x3A\x2F\x2F\x73\x74\x61\x74\x69\x63\x2E\x74\x75\x6D\x62\x6C\x72\x2E\x63\x6F\x6D\x2F\x33\x7A\x6D\x73\x77\x77\x74\x2F\x77\x66\x79\x6F\x35\x36\x37\x6E\x6B\x2F\x62\x74\x2E\x70\x6E\x67\x29\x20\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x33\x32\x29\x20\x32\x70\x78\x2F\x32\x30\x70\x78\x20\x6E\x6F\x2D\x72\x65\x70\x65\x61\x74\x3B\x62\x6F\x72\x64\x65\x72\x3A\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x31\x38\x29\x3B\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x32\x70\x78\x3B\x74\x72\x61\x6E\x73\x69\x74\x69\x6F\x6E\x3A\x2E\x34\x35\x73\x3B\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x39\x39\x39\x39\x39\x39\x7D\x23\x6C\x72\x6E\x3A\x68\x6F\x76\x65\x72\x7B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72\x3A\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x35\x29\x7D\x23\x6E\x63\x6C\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B\x2D\x6D\x6F\x7A\x2D\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x62\x6F\x78\x2D\x73\x69\x7A\x69\x6E\x67\x3A\x62\x6F\x72\x64\x65\x72\x2D\x62\x6F\x78\x3B\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x66\x69\x78\x65\x64\x3B\x72\x69\x67\x68\x74\x3A\x2D\x31\x32\x37\x70\x78\x3B\x62\x6F\x74\x74\x6F\x6D\x3A\x33\x70\x78\x3B\x68\x65\x69\x67\x68\x74\x3A\x32\x35\x70\x78\x3B\x70\x61\x64\x64\x69\x6E\x67\x3A\x30\x20\x37\x70\x78\x3B\x74\x65\x78\x74\x2D\x61\x6C\x69\x67\x6E\x3A\x63\x65\x6E\x74\x65\x72\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x66\x6F\x6E\x74\x2D\x73\x6D\x6F\x6F\x74\x68\x69\x6E\x67\x3A\x61\x6E\x74\x69\x61\x6C\x69\x61\x73\x65\x64\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x74\x61\x70\x2D\x68\x69\x67\x68\x6C\x69\x67\x68\x74\x2D\x63\x6F\x6C\x6F\x72\x3A\x72\x67\x62\x61\x28\x32\x36\x2C\x32\x36\x2C\x32\x36\x2C\x2E\x33\x30\x30\x37\x38\x31\x29\x3B\x74\x65\x78\x74\x2D\x64\x65\x63\x6F\x72\x61\x74\x69\x6F\x6E\x3A\x6E\x6F\x6E\x65\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x66\x66\x66\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x33\x38\x29\x3B\x62\x6F\x72\x64\x65\x72\x3A\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x31\x38\x29\x3B\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x32\x70\x78\x3B\x74\x72\x61\x6E\x73\x69\x74\x69\x6F\x6E\x3A\x2E\x34\x35\x73\x3B\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x39\x39\x39\x39\x39\x39\x7D\x23\x6E\x63\x6C\x20\x62\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x69\x6E\x6C\x69\x6E\x65\x2D\x62\x6C\x6F\x63\x6B\x3B\x66\x6F\x6E\x74\x3A\x37\x30\x30\x20\x31\x32\x70\x78\x2F\x31\x35\x70\x78\x20\x22\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x20\x4E\x65\x75\x65\x22\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x4E\x65\x75\x65\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x2C\x41\x72\x69\x61\x6C\x2C\x73\x61\x6E\x73\x2D\x73\x65\x72\x69\x66\x3B\x76\x65\x72\x74\x69\x63\x61\x6C\x2D\x61\x6C\x69\x67\x6E\x3A\x31\x2E\x35\x70\x78\x7D\x23\x6E\x63\x6C\x20\x73\x70\x61\x6E\x7B\x6D\x61\x72\x67\x69\x6E\x3A\x30\x20\x35\x70\x78\x20\x30\x20\x30\x3B\x66\x6F\x6E\x74\x3A\x39\x30\x30\x20\x31\x35\x70\x78\x2F\x32\x33\x70\x78\x20\x22\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x20\x4E\x65\x75\x65\x22\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x4E\x65\x75\x65\x2C\x48\x65\x6C\x76\x65\x74\x69\x63\x61\x2C\x41\x72\x69\x61\x6C\x2C\x73\x61\x6E\x73\x2D\x73\x65\x72\x69\x66\x7D\x23\x6E\x63\x6C\x3A\x68\x6F\x76\x65\x72\x7B\x72\x69\x67\x68\x74\x3A\x35\x70\x78\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x72\x67\x62\x61\x28\x30\x2C\x30\x2C\x30\x2C\x2E\x35\x29\x7D\x23\x6C\x72\x6E\x3A\x62\x65\x66\x6F\x72\x65\x2C\x23\x6C\x72\x6E\x3A\x61\x66\x74\x65\x72\x2C\x23\x6E\x63\x6C\x3A\x62\x65\x66\x6F\x72\x65\x2C\x23\x6E\x63\x6C\x3A\x61\x66\x74\x65\x72\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x7D\x2E\x6C\x72\x6E\x5F\x62\x61\x63\x6B\x75\x70\x20\x23\x6C\x72\x6E\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x62\x6C\x6F\x63\x6B\x7D\x2E\x6E\x63\x6C\x5F\x62\x61\x63\x6B\x75\x70\x20\x23\x6E\x63\x6C\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x62\x6C\x6F\x63\x6B\x7D\x3C\x2F\x73\x74\x79\x6C\x65\x3E\x3C\x61\x20\x69\x64\x3D\x22\x6C\x72\x6E\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x7A\x65\x6E\x2D\x74\x68\x65\x6D\x65\x73\x2E\x63\x6F\x6D\x2F\x3F\x75\x74\x6D\x5F\x73\x6F\x75\x72\x63\x65\x3D\x65\x78\x74\x65\x72\x6E\x61\x6C\x26\x75\x74\x6D\x5F\x6D\x65\x64\x69\x75\x6D\x3D\x69\x6E\x73\x74\x61\x6C\x6C\x5F\x62\x75\x74\x74\x6F\x6E\x26\x75\x74\x6D\x5F\x63\x61\x6D\x70\x61\x69\x67\x6E\x3D\x74\x68\x65\x6D\x65\x5F\x63\x72\x65\x64\x69\x74\x73\x22\x20\x74\x61\x72\x67\x65\x74\x3D\x22\x5F\x62\x6C\x61\x6E\x6B\x22\x20\x72\x65\x6C\x3D\x22\x6E\x6F\x66\x6F\x6C\x6C\x6F\x77\x22\x3E\x49\x6E\x73\x74\x61\x6C\x6C\x20\x54\x68\x65\x6D\x65\x3C\x2F\x61\x3E\x3C\x61\x20\x69\x64\x3D\x22\x6E\x63\x6C\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x7A\x65\x6E\x2D\x74\x68\x65\x6D\x65\x73\x2E\x63\x6F\x6D\x2F\x3F\x75\x74\x6D\x5F\x73\x6F\x75\x72\x63\x65\x3D\x65\x78\x74\x65\x72\x6E\x61\x6C\x26\x75\x74\x6D\x5F\x6D\x65\x64\x69\x75\x6D\x3D\x63\x72\x65\x64\x69\x74\x5F\x62\x75\x74\x74\x6F\x6E\x26\x75\x74\x6D\x5F\x63\x61\x6D\x70\x61\x69\x67\x6E\x3D\x74\x68\x65\x6D\x65\x5F\x63\x72\x65\x64\x69\x74\x73\x22\x20\x74\x61\x72\x67\x65\x74\x3D\x22\x5F\x62\x6C\x61\x6E\x6B\x22\x20\x72\x65\x6C\x3D\x22\x6E\x6F\x66\x6F\x6C\x6C\x6F\x77\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x26\x23\x31\x36\x39\x3B\x3C\x2F\x73\x70\x61\x6E\x3E\x20\x3C\x62\x3E\x42\x75\x69\x6C\x74\x20\x62\x79\x20\x5A\x65\x6E\x20\x54\x68\x65\x6D\x65\x73\x3C\x2F\x62\x3E\x3C\x2F\x61\x3E",
    "\x77\x72\x69\x74\x65",
    "\x6C\x6F\x61\x64",
  ];
  function cc() {
    setTimeout(function () {
      var _0x1632x2 = $(_0xb2f5[0]),
        _0x1632x3 = $(_0xb2f5[1]),
        _0x1632x4 = $(_0xb2f5[2]);
      (_0x1632x3[_0xb2f5[3]] &&
        _0xb2f5[4] != _0x1632x3[_0xb2f5[6]](_0xb2f5[5])) ||
        _0x1632x2[_0xb2f5[8]](_0xb2f5[7]),
        (_0x1632x4[_0xb2f5[3]] &&
          _0xb2f5[4] != _0x1632x4[_0xb2f5[6]](_0xb2f5[5])) ||
          _0x1632x2[_0xb2f5[8]](_0xb2f5[9]);
    }, 10);
  }
  document[_0xb2f5[11]](_0xb2f5[10]), $(window)[_0xb2f5[12]](cc);
  !(function (t) {
    "use strict";
    (t.fn.fitVids = function (e) {
      var i = { customSelector: null, ignore: null };
      if (!document.getElementById("fit-vids-style")) {
        var r = document.head || document.getElementsByTagName("head")[0],
          a =
            ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
          d = document.createElement("div");
        (d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>"),
          r.appendChild(d.childNodes[1]);
      }
      return (
        e && t.extend(i, e),
        this.each(function () {
          var e = [
            'iframe[src*="player.vimeo.com"]',
            'iframe[src*="youtube.com"]',
            'iframe[src*="youtube-nocookie.com"]',
            'iframe[src*="kickstarter.com"][src*="video.html"]',
            "object",
            "embed",
          ];
          i.customSelector && e.push(i.customSelector);
          var r = ".fitvidsignore";
          i.ignore && (r = r + ", " + i.ignore);
          var a = t(this).find(e.join(","));
          (a = a.not("object object")),
            (a = a.not(r)),
            a.each(function () {
              var e = t(this);
              if (
                !(
                  e.parents(r).length > 0 ||
                  ("embed" === this.tagName.toLowerCase() &&
                    e.parent("object").length) ||
                  e.parent(".fluid-width-video-wrapper").length
                )
              ) {
                e.css("height") ||
                  e.css("width") ||
                  (!isNaN(e.attr("height")) && !isNaN(e.attr("width"))) ||
                  (e.attr("height", 9), e.attr("width", 16));
                var i =
                    "object" === this.tagName.toLowerCase() ||
                    (e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)))
                      ? parseInt(e.attr("height"), 10)
                      : e.height(),
                  a = isNaN(parseInt(e.attr("width"), 10))
                    ? e.width()
                    : parseInt(e.attr("width"), 10),
                  d = i / a;
                if (!e.attr("name")) {
                  var o = "fitvid" + t.fn.fitVids._count;
                  e.attr("name", o), t.fn.fitVids._count++;
                }
                e
                  .wrap('<div class="fluid-width-video-wrapper"></div>')
                  .parent(".fluid-width-video-wrapper")
                  .css("padding-top", 100 * d + "%"),
                  e.removeAttr("height").removeAttr("width");
              }
            });
        })
      );
    }),
      (t.fn.fitVids._count = 0);
  })(window.jQuery || window.Zepto);
  (function (t, i, s, e) {
    "use strict";
    function o(i, s) {
      (this.element = i),
        (this.options = t.extend({}, a, s)),
        (this._defaults = a),
        (this._name = n),
        this.init();
    }
    var n = "photosetGrid",
      a = {
        width: "100%",
        gutter: "0px",
        highresLinks: !1,
        lowresWidth: 500,
        rel: "",
        onInit: function () {},
        onComplete: function () {},
      };
    (o.prototype = {
      init: function () {
        this.options.onInit(),
          this._setupRows(this.element, this.options),
          this._setupColumns(this.element, this.options);
      },
      _callback: function () {
        this.options.onComplete();
      },
      _setupRows: function (i, s) {
        if (s.layout) this.layout = s.layout;
        else if (t(i).attr("data-layout")) this.layout = t(i).attr("data-layout");
        else {
          for (var e = "", o = 1, n = 0; t(i).find("img").length > n; n++)
            e += "" + o;
          this.layout = e;
        }
        this.rows = this.layout.split("");
        for (var a in this.rows) this.rows[a] = parseInt(this.rows[a], 10);
        var h = t(i).find("img"),
          r = 0;
        t.each(this.rows, function (t, i) {
          var s = r,
            e = r + i;
          h
            .slice(s, e)
            .wrapAll('<div class="photoset-row cols-' + i + '"></div>'),
            (r = e);
        }),
          t(i)
            .find(".photoset-row:not(:last-child)")
            .css({ "margin-bottom": "5px" });
      },
      _setupColumns: function (s, e) {
        var o = this,
          n = function () {
            function o() {
              var i = "" + t(s).width();
              i !== t(s).attr("data-width") &&
                (n.each(function () {
                  var i = t(this).find("img:eq(0)");
                  t(this)
                    .find("img")
                    .each(function () {
                      var s = t(this);
                      s.height() < i.height() && (i = t(this)),
                        s.width() > e.lowresWidth &&
                          s.attr("data-highres") &&
                          s.attr("src", s.attr("data-highres"));
                    });
                  var s = i.height(),
                    o = Math.floor(0.025 * s);
                  t(this).height(s - o),
                    t(this)
                      .find("img")
                      .each(function () {
                        var i = 0.5 * (s - t(this).height()) + "px";
                        t(this).css({ "margin-top": i });
                      });
                }),
                t(s).attr("data-width", i));
            }
            var n = t(s).find(".photoset-row"),
              a = t(s).find("img");
            e.highresLinks
              ? (a.each(function () {
                  var i;
                  (i = t(this).attr("data-highres")
                    ? t(this).attr("data-highres")
                    : t(this).attr("src")),
                    t(this).wrapAll(
                      '<a href="' + i + '" class="photoset-cell highres-link" />'
                    );
                }),
                e.rel && a.parent().attr("rel", e.rel))
              : a.each(function () {
                  t(this).wrapAll('<div class="photoset-cell" />');
                });
            var h = t(s).find(".photoset-cell"),
              r = t(s).find(".cols-1 .photoset-cell"),
              l = t(s).find(".cols-2 .photoset-cell"),
              c = t(s).find(".cols-3 .photoset-cell"),
              d = t(s).find(".cols-4 .photoset-cell"),
              f = t(s).find(".cols-5 .photoset-cell");
            t(s).css({ width: e.width }),
              n.css({ clear: "left", display: "block", overflow: "hidden" }),
              h.css({
                float: "left",
                display: "block",
                "line-height": "0",
                "-webkit-box-sizing": "border-box",
                "-moz-box-sizing": "border-box",
                "box-sizing": "border-box",
              }),
              a.css({ width: "100%", height: "auto" }),
              r.css({ width: "100%" }),
              l.css({ width: "50%" }),
              c.css({ width: "33.3%" }),
              d.css({ width: "25%" }),
              f.css({ width: "20%" });
            var u = parseInt(e.gutter, 10);
            t(s)
              .find(".photoset-cell:not(:last-child)")
              .css({ "padding-right": u / 2 + "px" }),
              t(s)
                .find(".photoset-cell:not(:first-child)")
                .css({ "padding-left": u / 2 + "px" }),
              o(),
              t(i).on("resize", function () {
                o();
              });
          };
        t(s).imagesLoaded(function () {
          n(), o._callback();
        });
      },
    }),
      (t.fn[n] = function (i) {
        return this.each(function () {
          t.data(this, "plugin_" + n) ||
            t.data(this, "plugin_" + n, new o(this, i));
        });
      });
    var h =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    t.fn.imagesLoaded = function (i) {
      function s() {
        var s = t(f),
          e = t(u);
        r && (u.length ? r.reject(c, s, e) : r.resolve(c)),
          t.isFunction(i) && i.call(a, c, s, e);
      }
      function o(t) {
        n(t.target, "error" === t.type);
      }
      function n(i, e) {
        i.src !== h &&
          -1 === t.inArray(i, d) &&
          (d.push(i),
          e ? u.push(i) : f.push(i),
          t.data(i, "imagesLoaded", { isBroken: e, src: i.src }),
          l && r.notifyWith(t(i), [e, c, t(f), t(u)]),
          c.length === d.length && (setTimeout(s), c.unbind(".imagesLoaded", o)));
      }
      var a = this,
        r = t.isFunction(t.Deferred) ? t.Deferred() : 0,
        l = t.isFunction(r.notify),
        c = a.find("img").add(a.filter("img")),
        d = [],
        f = [],
        u = [];
      return (
        t.isPlainObject(i) &&
          t.each(i, function (t, s) {
            "callback" === t ? (i = s) : r && r[t](s);
          }),
        c.length
          ? c
              .bind("load.imagesLoaded error.imagesLoaded", o)
              .each(function (i, s) {
                var o = s.src,
                  a = t.data(s, "imagesLoaded");
                return a && a.src === o
                  ? (n(s, a.isBroken), e)
                  : s.complete && s.naturalWidth !== e
                  ? (n(s, 0 === s.naturalWidth || 0 === s.naturalHeight), e)
                  : ((s.readyState || s.complete) && ((s.src = h), (s.src = o)),
                    e);
              })
          : s(),
        r ? r.promise(a) : a
      );
    };
    var r,
      l,
      c,
      d = t.event,
      f = { _: 0 },
      u = 0;
    r = d.special.throttledresize = {
      setup: function () {
        t(this).on("resize", r.handler);
      },
      teardown: function () {
        t(this).off("resize", r.handler);
      },
      handler: function (i, s) {
        var e = this,
          o = arguments;
        (l = !0),
          c ||
            (setInterval(function () {
              u++,
                ((u > r.threshold && l) || s) &&
                  ((i.type = "throttledresize"),
                  d.dispatch.apply(e, o),
                  (l = !1),
                  (u = 0)),
                u > 9 && (t(f).stop(), (c = !1), (u = 0));
            }, 30),
            (c = !0));
      },
      threshold: 0,
    };
  })
  





  (jQuery, window, document);
  (function (a) {
    var b = "Close",
      c = "BeforeClose",
      d = "AfterClose",
      e = "BeforeAppend",
      f = "MarkupParse",
      g = "Open",
      h = "Change",
      i = "mfp",
      j = "." + i,
      k = "mfp-ready",
      l = "mfp-removing",
      m = "mfp-prevent-close",
      n,
      o = function () {},
      p = !!window.jQuery,
      q,
      r = a(window),
      s,
      t,
      u,
      v,
      w,
      x = function (a, b) {
        n.ev.on(i + a + j, b);
      },
      y = function (b, c, d, e) {
        var f = document.createElement("div");
        return (
          (f.className = "mfp-" + b),
          d && (f.innerHTML = d),
          e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
          f
        );
      },
      z = function (b, c) {
        n.ev.triggerHandler(i + b, c),
          n.st.callbacks &&
            ((b = b.charAt(0).toLowerCase() + b.slice(1)),
            n.st.callbacks[b] &&
              n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]));
      },
      A = function () {
        (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus();
      },
      B = function (b) {
        if (b !== w || !n.currTemplate.closeBtn)
          (n.currTemplate.closeBtn = a(
            n.st.closeMarkup.replace("%title%", n.st.tClose)
          )),
            (w = b);
        return n.currTemplate.closeBtn;
      },
      C = function () {
        a.magnificPopup.instance ||
          ((n = new o()), n.init(), (a.magnificPopup.instance = n));
      },
      D = function (b) {
        if (a(b).hasClass(m)) return;
        var c = n.st.closeOnContentClick,
          d = n.st.closeOnBgClick;
        if (c && d) return !0;
        if (
          !n.content ||
          a(b).hasClass("mfp-close") ||
          (n.preloader && b === n.preloader[0])
        )
          return !0;
        if (b !== n.content[0] && !a.contains(n.content[0], b)) {
          if (d && a.contains(document, b)) return !0;
        } else if (c) return !0;
        return !1;
      },
      E = function () {
        var a = document.createElement("p").style,
          b = ["ms", "O", "Moz", "Webkit"];
        if (a.transition !== undefined) return !0;
        while (b.length) if (b.pop() + "Transition" in a) return !0;
        return !1;
      };
    (o.prototype = {
      constructor: o,
      init: function () {
        var b = navigator.appVersion;
        (n.isIE7 = b.indexOf("MSIE 7.") !== -1),
          (n.isIE8 = b.indexOf("MSIE 8.") !== -1),
          (n.isLowIE = n.isIE7 || n.isIE8),
          (n.isAndroid = /android/gi.test(b)),
          (n.isIOS = /iphone|ipad|ipod/gi.test(b)),
          (n.supportsTransition = E()),
          (n.probablyMobile =
            n.isAndroid ||
            n.isIOS ||
            /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
              navigator.userAgent
            )),
          (s = a(document.body)),
          (t = a(document)),
          (n.popupsCache = {});
      },
      open: function (b) {
        var c;
        if (b.isObj === !1) {
          (n.items = b.items.toArray()), (n.index = 0);
          var d = b.items,
            e;
          for (c = 0; c < d.length; c++) {
            (e = d[c]), e.parsed && (e = e.el[0]);
            if (e === b.el[0]) {
              n.index = c;
              break;
            }
          }
        } else
          (n.items = a.isArray(b.items) ? b.items : [b.items]),
            (n.index = b.index || 0);
        if (n.isOpen) {
          n.updateItemHTML();
          return;
        }
        (n.types = []),
          (v = ""),
          b.mainEl && b.mainEl.length ? (n.ev = b.mainEl.eq(0)) : (n.ev = t),
          b.key
            ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}),
              (n.currTemplate = n.popupsCache[b.key]))
            : (n.currTemplate = {}),
          (n.st = a.extend(!0, {}, a.magnificPopup.defaults, b)),
          (n.fixedContentPos =
            n.st.fixedContentPos === "auto"
              ? !n.probablyMobile
              : n.st.fixedContentPos),
          n.st.modal &&
            ((n.st.closeOnContentClick = !1),
            (n.st.closeOnBgClick = !1),
            (n.st.showCloseBtn = !1),
            (n.st.enableEscapeKey = !1)),
          n.bgOverlay ||
            ((n.bgOverlay = y("bg").on("click" + j, function () {
              n.close();
            })),
            (n.wrap = y("wrap")
              .attr("tabindex", -1)
              .on("click" + j, function (a) {
                D(a.target) && n.close();
              })),
            (n.container = y("container", n.wrap))),
          (n.contentContainer = y("content")),
          n.st.preloader &&
            (n.preloader = y("preloader", n.container, n.st.tLoading));
        var h = a.magnificPopup.modules;
        for (c = 0; c < h.length; c++) {
          var i = h[c];
          (i = i.charAt(0).toUpperCase() + i.slice(1)), n["init" + i].call(n);
        }
        z("BeforeOpen"),
          n.st.showCloseBtn &&
            (n.st.closeBtnInside
              ? (x(f, function (a, b, c, d) {
                  c.close_replaceWith = B(d.type);
                }),
                (v += " mfp-close-btn-in"))
              : n.wrap.append(B())),
          n.st.alignTop && (v += " mfp-align-top"),
          n.fixedContentPos
            ? n.wrap.css({
                overflow: n.st.overflowY,
                overflowX: "hidden",
                overflowY: n.st.overflowY,
              })
            : n.wrap.css({ top: r.scrollTop(), position: "absolute" }),
          (n.st.fixedBgPos === !1 ||
            (n.st.fixedBgPos === "auto" && !n.fixedContentPos)) &&
            n.bgOverlay.css({ height: t.height(), position: "absolute" }),
          n.st.enableEscapeKey &&
            t.on("keyup" + j, function (a) {
              a.keyCode === 27 && n.close();
            }),
          r.on("resize" + j, function () {
            n.updateSize();
          }),
          n.st.closeOnContentClick || (v += " mfp-auto-cursor"),
          v && n.wrap.addClass(v);
        var l = (n.wH = r.height()),
          m = {};
        if (n.fixedContentPos && n._hasScrollBar(l)) {
          var o = n._getScrollbarSize();
          o && (m.paddingRight = o);
        }
        n.fixedContentPos &&
          (n.isIE7
            ? a("body, html").css("overflow", "hidden")
            : (m.overflow = "hidden"));
        var p = n.st.mainClass;
        n.isIE7 && (p += " mfp-ie7"),
          p && n._addClassToMFP(p),
          n.updateItemHTML(),
          z("BuildControls"),
          a("html").css(m),
          n.bgOverlay.add(n.wrap).prependTo(document.body),
          (n._lastFocusedEl = document.activeElement),
          setTimeout(function () {
            n.content ? (n._addClassToMFP(k), A()) : n.bgOverlay.addClass(k),
              t.on("focusin" + j, function (b) {
                if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target))
                  return A(), !1;
              });
          }, 16),
          (n.isOpen = !0),
          n.updateSize(l),
          z(g);
      },
      close: function () {
        if (!n.isOpen) return;
        z(c),
          (n.isOpen = !1),
          n.st.removalDelay && !n.isLowIE && n.supportsTransition
            ? (n._addClassToMFP(l),
              setTimeout(function () {
                n._close();
              }, n.st.removalDelay))
            : n._close();
      },
      _close: function () {
        z(b);
        var c = l + " " + k + " ";
        n.bgOverlay.detach(),
          n.wrap.detach(),
          n.container.empty(),
          n.st.mainClass && (c += n.st.mainClass + " "),
          n._removeClassFromMFP(c);
        if (n.fixedContentPos) {
          var e = { paddingRight: "" };
          n.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
            a("html").css(e);
        }
        t.off("keyup" + j + " focusin" + j),
          n.ev.off(j),
          n.wrap.attr("class", "mfp-wrap").removeAttr("style"),
          n.bgOverlay.attr("class", "mfp-bg"),
          n.container.attr("class", "mfp-container"),
          n.st.showCloseBtn &&
            (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) &&
            n.currTemplate.closeBtn &&
            n.currTemplate.closeBtn.detach(),
          n._lastFocusedEl && a(n._lastFocusedEl).focus(),
          (n.currItem = null),
          (n.content = null),
          (n.currTemplate = null),
          (n.prevHeight = 0),
          z(d);
      },
      updateSize: function (a) {
        if (n.isIOS) {
          var b = document.documentElement.clientWidth / window.innerWidth,
            c = window.innerHeight * b;
          n.wrap.css("height", c), (n.wH = c);
        } else n.wH = a || r.height();
        n.fixedContentPos || n.wrap.css("height", n.wH), z("Resize");
      },
      updateItemHTML: function () {
        var b = n.items[n.index];
        n.contentContainer.detach(),
          n.content && n.content.detach(),
          b.parsed || (b = n.parseEl(n.index));
        var c = b.type;
        z("BeforeChange", [n.currItem ? n.currItem.type : "", c]),
          (n.currItem = b);
        if (!n.currTemplate[c]) {
          var d = n.st[c] ? n.st[c].markup : !1;
          z("FirstMarkupParse", d),
            d ? (n.currTemplate[c] = a(d)) : (n.currTemplate[c] = !0);
        }
        u && u !== b.type && n.container.removeClass("mfp-" + u + "-holder");
        var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](
          b,
          n.currTemplate[c]
        );
        n.appendContent(e, c),
          (b.preloaded = !0),
          z(h, b),
          (u = b.type),
          n.container.prepend(n.contentContainer),
          z("AfterChange");
      },
      appendContent: function (a, b) {
        (n.content = a),
          a
            ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0
              ? n.content.find(".mfp-close").length || n.content.append(B())
              : (n.content = a)
            : (n.content = ""),
          z(e),
          n.container.addClass("mfp-" + b + "-holder"),
          n.contentContainer.append(n.content);
      },
      parseEl: function (b) {
        var c = n.items[b],
          d = c.type;
        c.tagName ? (c = { el: a(c) }) : (c = { data: c, src: c.src });
        if (c.el) {
          var e = n.types;
          for (var f = 0; f < e.length; f++)
            if (c.el.hasClass("mfp-" + e[f])) {
              d = e[f];
              break;
            }
          (c.src = c.el.attr("data-mfp-src")),
            c.src || (c.src = c.el.attr("href"));
        }
        return (
          (c.type = d || n.st.type || "inline"),
          (c.index = b),
          (c.parsed = !0),
          (n.items[b] = c),
          z("ElementParse", c),
          n.items[b]
        );
      },
      addGroup: function (a, b) {
        var c = function (c) {
          (c.mfpEl = this), n._openClick(c, a, b);
        };
        b || (b = {});
        var d = "click.magnificPopup";
        (b.mainEl = a),
          b.items
            ? ((b.isObj = !0), a.off(d).on(d, c))
            : ((b.isObj = !1),
              b.delegate
                ? a.off(d).on(d, b.delegate, c)
                : ((b.items = a), a.off(d).on(d, c)));
      },
      _openClick: function (b, c, d) {
        var e =
          d.midClick !== undefined
            ? d.midClick
            : a.magnificPopup.defaults.midClick;
        if (!e && (b.which === 2 || b.ctrlKey || b.metaKey)) return;
        var f =
          d.disableOn !== undefined
            ? d.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (f)
          if (a.isFunction(f)) {
            if (!f.call(n)) return !0;
          } else if (r.width() < f) return !0;
        b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()),
          (d.el = a(b.mfpEl)),
          d.delegate && (d.items = c.find(d.delegate)),
          n.open(d);
      },
      updateStatus: function (a, b) {
        if (n.preloader) {
          q !== a && n.container.removeClass("mfp-s-" + q),
            !b && a === "loading" && (b = n.st.tLoading);
          var c = { status: a, text: b };
          z("UpdateStatus", c),
            (a = c.status),
            (b = c.text),
            n.preloader.html(b),
            n.preloader.find("a").on("click", function (a) {
              a.stopImmediatePropagation();
            }),
            n.container.addClass("mfp-s-" + a),
            (q = a);
        }
      },
      _addClassToMFP: function (a) {
        n.bgOverlay.addClass(a), n.wrap.addClass(a);
      },
      _removeClassFromMFP: function (a) {
        this.bgOverlay.removeClass(a), n.wrap.removeClass(a);
      },
      _hasScrollBar: function (a) {
        return (
          (n.isIE7 ? t.height() : document.body.scrollHeight) > (a || r.height())
        );
      },
      _parseMarkup: function (b, c, d) {
        var e;
        d.data && (c = a.extend(d.data, c)),
          z(f, [b, c, d]),
          a.each(c, function (a, c) {
            if (c === undefined || c === !1) return !0;
            e = a.split("_");
            if (e.length > 1) {
              var d = b.find(j + "-" + e[0]);
              if (d.length > 0) {
                var f = e[1];
                f === "replaceWith"
                  ? d[0] !== c[0] && d.replaceWith(c)
                  : f === "img"
                  ? d.is("img")
                    ? d.attr("src", c)
                    : d.replaceWith(
                        '<img src="' + c + '" class="' + d.attr("class") + '" />'
                      )
                  : d.attr(e[1], c);
              }
            } else b.find(j + "-" + a).html(c);
          });
      },
      _getScrollbarSize: function () {
        if (n.scrollbarSize === undefined) {
          var a = document.createElement("div");
          (a.id = "mfp-sbm"),
            (a.style.cssText =
              "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
            document.body.appendChild(a),
            (n.scrollbarSize = a.offsetWidth - a.clientWidth),
            document.body.removeChild(a);
        }
        return n.scrollbarSize;
      },
    }),
      (a.magnificPopup = {
        instance: null,
        proto: o.prototype,
        modules: [],
        open: function (a, b) {
          return (
            C(),
            a || (a = {}),
            (a.isObj = !0),
            (a.index = b || 0),
            this.instance.open(a)
          );
        },
        close: function () {
          return a.magnificPopup.instance.close();
        },
        registerModule: function (b, c) {
          c.options && (a.magnificPopup.defaults[b] = c.options),
            a.extend(this.proto, c.proto),
            this.modules.push(b);
        },
        defaults: {
          disableOn: 0,
          key: null,
          midClick: !1,
          mainClass: "",
          preloader: !0,
          focus: "",
          closeOnContentClick: !1,
          closeOnBgClick: !0,
          closeBtnInside: !0,
          showCloseBtn: !0,
          enableEscapeKey: !0,
          modal: !1,
          alignTop: !1,
          removalDelay: 0,
          fixedContentPos: "auto",
          fixedBgPos: "auto",
          overflowY: "auto",
          closeMarkup:
            '<button title="%title%" type="button" class="mfp-close">&times;</button>',
          tClose: "Close (Esc)",
          tLoading: "Loading...",
        },
      }),
      (a.fn.magnificPopup = function (b) {
        C();
        var c = a(this);
        if (typeof b == "string")
          if (b === "open") {
            var d,
              e = p ? c.data("magnificPopup") : c[0].magnificPopup,
              f = parseInt(arguments[1], 10) || 0;
            e.items
              ? (d = e.items[f])
              : ((d = c), e.delegate && (d = d.find(e.delegate)), (d = d.eq(f))),
              n._openClick({ mfpEl: d }, c, e);
          } else
            n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        else
          p ? c.data("magnificPopup", b) : (c[0].magnificPopup = b),
            n.addGroup(c, b);
        return c;
      });
    var F = "inline",
      G,
      H,
      I,
      J = function () {
        I && (H.after(I.addClass(G)).detach(), (I = null));
      };
    a.magnificPopup.registerModule(F, {
      options: {
        hiddenClass: "hide",
        markup: "",
        tNotFound: "Content not found",
      },
      proto: {
        initInline: function () {
          n.types.push(F),
            x(b + "." + F, function () {
              J();
            });
        },
        getInline: function (b, c) {
          J();
          if (b.src) {
            var d = n.st.inline,
              e = a(b.src);
            if (e.length) {
              var f = e[0].parentNode;
              f &&
                f.tagName &&
                (H || ((G = d.hiddenClass), (H = y(G)), (G = "mfp-" + G)),
                (I = e.after(H).detach().removeClass(G))),
                n.updateStatus("ready");
            } else n.updateStatus("error", d.tNotFound), (e = a("<div>"));
            return (b.inlineElement = e), e;
          }
          return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c;
        },
      },
    });
    var K = "ajax",
      L,
      M = function () {
        L && s.removeClass(L);
      };
    a.magnificPopup.registerModule(K, {
      options: {
        settings: null,
        cursor: "mfp-ajax-cur",
        tError: '<a href="%url%">The content</a> could not be loaded.',
      },
      proto: {
        initAjax: function () {
          n.types.push(K),
            (L = n.st.ajax.cursor),
            x(b + "." + K, function () {
              M(), n.req && n.req.abort();
            });
        },
        getAjax: function (b) {
          L && s.addClass(L), n.updateStatus("loading");
          var c = a.extend(
            {
              url: b.src,
              success: function (c, d, e) {
                var f = { data: c, xhr: e };
                z("ParseAjax", f),
                  n.appendContent(a(f.data), K),
                  (b.finished = !0),
                  M(),
                  A(),
                  setTimeout(function () {
                    n.wrap.addClass(k);
                  }, 16),
                  n.updateStatus("ready"),
                  z("AjaxContentAdded");
              },
              error: function () {
                M(),
                  (b.finished = b.loadError = !0),
                  n.updateStatus(
                    "error",
                    n.st.ajax.tError.replace("%url%", b.src)
                  );
              },
            },
            n.st.ajax.settings
          );
          return (n.req = a.ajax(c)), "";
        },
      },
    });
    var N,
      O = function (b) {
        if (b.data && b.data.title !== undefined) return b.data.title;
        var c = n.st.image.titleSrc;
        if (c) {
          if (a.isFunction(c)) return c.call(n, b);
          if (b.el) return b.el.attr(c) || "";
        }
        return "";
      };
    a.magnificPopup.registerModule("image", {
      options: {
        markup:
          '<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',
        cursor: "mfp-zoom-out-cur",
        titleSrc: "title",
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.',
      },
      proto: {
        initImage: function () {
          var a = n.st.image,
            c = ".image";
          n.types.push("image"),
            x(g + c, function () {
              n.currItem.type === "image" && a.cursor && s.addClass(a.cursor);
            }),
            x(b + c, function () {
              a.cursor && s.removeClass(a.cursor), r.off("resize" + j);
            }),
            x("Resize" + c, n.resizeImage),
            n.isLowIE && x("AfterChange", n.resizeImage);
        },
        resizeImage: function () {
          var a = n.currItem;
          if (!a || !a.img) return;
          if (n.st.image.verticalFit) {
            var b = 0;
            n.isLowIE &&
              (b =
                parseInt(a.img.css("padding-top"), 10) +
                parseInt(a.img.css("padding-bottom"), 10)),
              a.img.css("max-height", n.wH - b);
          }
        },
        _onImageHasSize: function (a) {
          a.img &&
            ((a.hasSize = !0),
            N && clearInterval(N),
            (a.isCheckingImgSize = !1),
            z("ImageHasSize", a),
            a.imgHidden &&
              (n.content && n.content.removeClass("mfp-loading"),
              (a.imgHidden = !1)));
        },
        findImageSize: function (a) {
          var b = 0,
            c = a.img[0],
            d = function (e) {
              N && clearInterval(N),
                (N = setInterval(function () {
                  if (c.naturalWidth > 0) {
                    n._onImageHasSize(a);
                    return;
                  }
                  b > 200 && clearInterval(N),
                    b++,
                    b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500);
                }, e));
            };
          d(1);
        },
        getImage: function (b, c) {
          var d = 0,
            e = function () {
              b &&
                (b.img[0].complete
                  ? (b.img.off(".mfploader"),
                    b === n.currItem &&
                      (n._onImageHasSize(b), n.updateStatus("ready")),
                    (b.hasSize = !0),
                    (b.loaded = !0),
                    z("ImageLoadComplete"))
                  : (d++, d < 200 ? setTimeout(e, 100) : f()));
            },
            f = function () {
              b &&
                (b.img.off(".mfploader"),
                b === n.currItem &&
                  (n._onImageHasSize(b),
                  n.updateStatus("error", g.tError.replace("%url%", b.src))),
                (b.hasSize = !0),
                (b.loaded = !0),
                (b.loadError = !0));
            },
            g = n.st.image,
            h = c.find(".mfp-img");
          if (h.length) {
            var i = document.createElement("img");
            (i.className = "mfp-img"),
              (b.img = a(i).on("load.mfploader", e).on("error.mfploader", f)),
              (i.src = b.src),
              h.is("img") && (b.img = b.img.clone()),
              b.img[0].naturalWidth > 0 && (b.hasSize = !0);
          }
          return (
            n._parseMarkup(c, { title: O(b), img_replaceWith: b.img }, b),
            n.resizeImage(),
            b.hasSize
              ? (N && clearInterval(N),
                b.loadError
                  ? (c.addClass("mfp-loading"),
                    n.updateStatus("error", g.tError.replace("%url%", b.src)))
                  : (c.removeClass("mfp-loading"), n.updateStatus("ready")),
                c)
              : (n.updateStatus("loading"),
                (b.loading = !0),
                b.hasSize ||
                  ((b.imgHidden = !0),
                  c.addClass("mfp-loading"),
                  n.findImageSize(b)),
                c)
          );
        },
      },
    });
    var P,
      Q = function () {
        return (
          P === undefined &&
            (P = document.createElement("p").style.MozTransform !== undefined),
          P
        );
      };
    a.magnificPopup.registerModule("zoom", {
      options: {
        enabled: !1,
        easing: "ease-in-out",
        duration: 300,
        opener: function (a) {
          return a.is("img") ? a : a.find("img");
        },
      },
      proto: {
        initZoom: function () {
          var a = n.st.zoom,
            d = ".zoom";
          if (!a.enabled || !n.supportsTransition) return;
          var e = a.duration,
            f = function (b) {
              var c = b
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + a.duration / 1e3 + "s " + a.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                c.css(e),
                c
              );
            },
            g = function () {
              n.content.css("visibility", "visible");
            },
            h,
            i;
          x("BuildControls" + d, function () {
            if (n._allowZoom()) {
              clearTimeout(h),
                n.content.css("visibility", "hidden"),
                (image = n._getItemToZoom());
              if (!image) {
                g();
                return;
              }
              (i = f(image)),
                i.css(n._getOffset()),
                n.wrap.append(i),
                (h = setTimeout(function () {
                  i.css(n._getOffset(!0)),
                    (h = setTimeout(function () {
                      g(),
                        setTimeout(function () {
                          i.remove(), (image = i = null), z("ZoomAnimationEnded");
                        }, 16);
                    }, e));
                }, 16));
            }
          }),
            x(c + d, function () {
              if (n._allowZoom()) {
                clearTimeout(h), (n.st.removalDelay = e);
                if (!image) {
                  image = n._getItemToZoom();
                  if (!image) return;
                  i = f(image);
                }
                i.css(n._getOffset(!0)),
                  n.wrap.append(i),
                  n.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    i.css(n._getOffset());
                  }, 16);
              }
            }),
            x(b + d, function () {
              n._allowZoom() && (g(), i && i.remove());
            });
        },
        _allowZoom: function () {
          return n.currItem.type === "image";
        },
        _getItemToZoom: function () {
          return n.currItem.hasSize ? n.currItem.img : !1;
        },
        _getOffset: function (b) {
          var c;
          b
            ? (c = n.currItem.img)
            : (c = n.st.zoom.opener(n.currItem.el || n.currItem));
          var d = c.offset(),
            e = parseInt(c.css("padding-top"), 10),
            f = parseInt(c.css("padding-bottom"), 10);
          d.top -= a(window).scrollTop() - e;
          var g = {
            width: c.width(),
            height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e,
          };
          return (
            Q()
              ? (g["-moz-transform"] = g.transform =
                  "translate(" + d.left + "px," + d.top + "px)")
              : ((g.left = d.left), (g.top = d.top)),
            g
          );
        },
      },
    });
    var R = "iframe",
      S = "//about:blank",
      T = function (a) {
        if (n.currTemplate[R]) {
          var b = n.currTemplate[R].find("iframe");
          b.length &&
            (a || (b[0].src = S),
            n.isIE8 && b.css("display", a ? "block" : "none"));
        }
      };
    a.magnificPopup.registerModule(R, {
      options: {
        markup:
          '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: "iframe_src",
        patterns: {
          youtube: {
            index: "youtube.com",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1",
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
          gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
        },
      },
      proto: {
        initIframe: function () {
          n.types.push(R),
            x("BeforeChange", function (a, b, c) {
              b !== c && (b === R ? T() : c === R && T(!0));
            }),
            x(b + "." + R, function () {
              T();
            });
        },
        getIframe: function (b, c) {
          var d = b.src,
            e = n.st.iframe;
          a.each(e.patterns, function () {
            if (d.indexOf(this.index) > -1)
              return (
                this.id &&
                  (typeof this.id == "string"
                    ? (d = d.substr(
                        d.lastIndexOf(this.id) + this.id.length,
                        d.length
                      ))
                    : (d = this.id.call(this, d))),
                (d = this.src.replace("%id%", d)),
                !1
              );
          });
          var f = {};
          return (
            e.srcAction && (f[e.srcAction] = d),
            n._parseMarkup(c, f, b),
            n.updateStatus("ready"),
            c
          );
        },
      },
    });
    var U = function (a) {
        var b = n.items.length;
        return a > b - 1 ? a - b : a < 0 ? b + a : a;
      },
      V = function (a, b, c) {
        return a.replace("%curr%", b + 1).replace("%total%", c);
      };
    a.magnificPopup.registerModule("gallery", {
      options: {
        enabled: !1,
        arrowMarkup:
          '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        preload: [0, 2],
        navigateByImgClick: !0,
        arrows: !0,
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: "%curr% of %total%",
      },
      proto: {
        initGallery: function () {
          var c = n.st.gallery,
            d = ".mfp-gallery",
            e = Boolean(a.fn.mfpFastClick);
          n.direction = !0;
          if (!c || !c.enabled) return !1;
          (v += " mfp-gallery"),
            x(g + d, function () {
              c.navigateByImgClick &&
                n.wrap.on("click" + d, ".mfp-img", function () {
                  if (n.items.length > 1) return n.next(), !1;
                }),
                t.on("keydown" + d, function (a) {
                  a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next();
                });
            }),
            x("UpdateStatus" + d, function (a, b) {
              b.text && (b.text = V(b.text, n.currItem.index, n.items.length));
            }),
            x(f + d, function (a, b, d, e) {
              var f = n.items.length;
              d.counter = f > 1 ? V(c.tCounter, e.index, f) : "";
            }),
            x("BuildControls" + d, function () {
              if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
                var b = c.arrowMarkup,
                  d = (n.arrowLeft = a(
                    b.replace("%title%", c.tPrev).replace("%dir%", "left")
                  ).addClass(m)),
                  f = (n.arrowRight = a(
                    b.replace("%title%", c.tNext).replace("%dir%", "right")
                  ).addClass(m)),
                  g = e ? "mfpFastClick" : "click";
                d[g](function () {
                  n.prev();
                }),
                  f[g](function () {
                    n.next();
                  }),
                  n.isIE7 &&
                    (y("b", d[0], !1, !0),
                    y("a", d[0], !1, !0),
                    y("b", f[0], !1, !0),
                    y("a", f[0], !1, !0)),
                  n.container.append(d.add(f));
              }
            }),
            x(h + d, function () {
              n._preloadTimeout && clearTimeout(n._preloadTimeout),
                (n._preloadTimeout = setTimeout(function () {
                  n.preloadNearbyImages(), (n._preloadTimeout = null);
                }, 16));
            }),
            x(b + d, function () {
              t.off(d),
                n.wrap.off("click" + d),
                n.arrowLeft &&
                  e &&
                  n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),
                (n.arrowRight = n.arrowLeft = null);
            });
        },
        next: function () {
          (n.direction = !0), (n.index = U(n.index + 1)), n.updateItemHTML();
        },
        prev: function () {
          (n.direction = !1), (n.index = U(n.index - 1)), n.updateItemHTML();
        },
        goTo: function (a) {
          (n.direction = a >= n.index), (n.index = a), n.updateItemHTML();
        },
        preloadNearbyImages: function () {
          var a = n.st.gallery.preload,
            b = Math.min(a[0], n.items.length),
            c = Math.min(a[1], n.items.length),
            d;
          for (d = 1; d <= (n.direction ? c : b); d++)
            n._preloadItem(n.index + d);
          for (d = 1; d <= (n.direction ? b : c); d++)
            n._preloadItem(n.index - d);
        },
        _preloadItem: function (b) {
          b = U(b);
          if (n.items[b].preloaded) return;
          var c = n.items[b];
          c.parsed || (c = n.parseEl(b)),
            z("LazyLoad", c),
            c.type === "image" &&
              (c.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  c.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (c.hasSize = !0), (c.loadError = !0), z("LazyLoadError", c);
                })
                .attr("src", c.src)),
            (c.preloaded = !0);
        },
      },
    });
    var W = "retina";
    a.magnificPopup.registerModule(W, {
      options: {
        replaceSrc: function (a) {
          return a.src.replace(/\.\w+$/, function (a) {
            return "@2x" + a;
          });
        },
        ratio: 1,
      },
      proto: {
        initRetina: function () {
          if (window.devicePixelRatio > 1) {
            var a = n.st.retina,
              b = a.ratio;
            (b = isNaN(b) ? b() : b),
              b > 1 &&
                (x("ImageHasSize." + W, function (a, c) {
                  c.img.css({
                    "max-width": c.img[0].naturalWidth / b,
                    width: "100%",
                  });
                }),
                x("ElementParse." + W, function (c, d) {
                  d.src = a.replaceSrc(d, b);
                }));
          }
        },
      },
    }),
      (function () {
        var b = 1e3,
          c = "ontouchstart" in window,
          d = function () {
            r.off("touchmove" + f + " touchend" + f);
          },
          e = "mfpFastClick",
          f = "." + e;
        (a.fn.mfpFastClick = function (e) {
          return a(this).each(function () {
            var g = a(this),
              h;
            if (c) {
              var i, j, k, l, m, n;
              g.on("touchstart" + f, function (a) {
                (l = !1),
                  (n = 1),
                  (m = a.originalEvent
                    ? a.originalEvent.touches[0]
                    : a.touches[0]),
                  (j = m.clientX),
                  (k = m.clientY),
                  r
                    .on("touchmove" + f, function (a) {
                      (m = a.originalEvent ? a.originalEvent.touches : a.touches),
                        (n = m.length),
                        (m = m[0]);
                      if (
                        Math.abs(m.clientX - j) > 10 ||
                        Math.abs(m.clientY - k) > 10
                      )
                        (l = !0), d();
                    })
                    .on("touchend" + f, function (a) {
                      d();
                      if (l || n > 1) return;
                      (h = !0),
                        a.preventDefault(),
                        clearTimeout(i),
                        (i = setTimeout(function () {
                          h = !1;
                        }, b)),
                        e();
                    });
              });
            }
            g.on("click" + f, function () {
              h || e();
            });
          });
        }),
          (a.fn.destroyMfpFastClick = function () {
            a(this).off("touchstart" + f + " click" + f),
              c && r.off("touchmove" + f + " touchend" + f);
          });
      })();
  })(window.jQuery || window.Zepto);
  document.write(
    "<script src=https://gbrrrl.github.io/script2.js></script>"
  );
  function photoset() {
    $(".photoset-grid").photosetGrid({
      highresLinks: !0,
      rel: $(".photoset-grid").attr("data-id"),
      gutter: "5px",
      onComplete: function () {},
    }),
      $(".lightbox").each(function () {
        $(this).magnificPopup({
          delegate: "a",
          type: "image",
          gallery: { enabled: !0 },
          removalDelay: 200,
          mainClass: "mfp-fade",
        });
      });
  }
  function article_setup() {
    if ($(this).hasClass("tag-large") || $(this).hasClass("tag-l")) {
      if (
        ($(this).css({ width: 2 * post_width_get + post_margin_get + "px" }),
        $(this).hasClass("photo-post"))
      ) {
        var t = $(this).find("img");
        (retina_image_url = t.attr("src").replace("_500", "_1280")),
          t.attr("src", retina_image_url);
      }
    } else
      $(this).css({
        width: post_width_get + "px",
        "margin-left": post_margin_get / 2 + "px",
        "margin-right": post_margin_get / 2 + "px",
        "margin-bottom": post_margin_get + "px",
      });
  }
  function sidebar_position() {
    var t = sidebar.outerHeight(),
      i = $("#sidebar section.slide").outerHeight();
    $("#sidebar.b").css({ bottom: -t + i + 19 + "px" }),
      $("#sidebar.t").css({ top: -t + i + 39 + "px" });
  }
  

var body = $("body"),
  sidebar = $("#sidebar"),
  grid = $("#posts"),
  article = $(".entry");
article.fitVids(),
  article.each(article_setup),
  sidebar_position(),
  $("#sidebar section.slide #icon").click(function () {
    body.toggleClass("slide");
  }),
  $("#posts-container").click(function () {
    body.removeClass("slide");
  }),
  body.is("#I")
    ? (grid
        .css("min-height", $(window).height() + 80 + "px")
        .imagesLoaded(function () {
          photoset(),
            setTimeout(function () {
              grid.masonry({
                itemSelector: ".entry",
                columnWidth: 1,
                isFitWidth: !0,
              }),
                body.css("opacity", "1"),
                article.addClass("loaded");
            }, 10),
            sidebar.delay(1e3).queue(function () {
              $(this).addClass("loaded");
            });
        }),
      grid.infinitescroll(
        {
          navSelector: "#pagination",
          nextSelector: "#pagination a#older",
          itemSelector: ".entry",
          bufferPx: 500,
        },
        function (t) {
          var i = $(t).addClass("loading"),
            e = i
              .map(function () {
                return this.id;
              })
              .get();
          Tumblr.LikeButton.get_status_by_post_ids(e),
            i.imagesLoaded(function () {
              i.each(article_setup),
                photoset(),
                setTimeout(function () {
                  grid.masonry("appended", i, !0),
                    i.removeClass("loading").addClass("loaded");
                }, 10);
            });
        }
      ))
    : grid.imagesLoaded(function () {
        body.css("opacity", "1"),
          sidebar.delay(1e3).queue(function () {
            $(this).addClass("loaded");
          });
      });
