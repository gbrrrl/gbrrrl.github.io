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

var body = $("body"),
  grid = $("#posts"),
  article = $(".entry");
article.fitVids(),
  article.each(article_setup),
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
