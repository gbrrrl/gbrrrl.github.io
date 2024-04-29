(function (e) {
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
      for (; g[0].firstChild;) f.appendChild(g[0].firstChild);
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
    if (((o = o || function () { }), !i(m))) return !1;
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
        errorCallback: function () { },
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
})




(jQuery);
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
      onInit: function () { },
      onComplete: function () { },
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

function photoset() {
    $(".photoset-grid").photosetGrid({
      highresLinks: !0,
      rel: $(".photoset-grid").attr("data-id"),
      gutter: "5px",
      onComplete: function () { },
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
            e = /*  */i
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
