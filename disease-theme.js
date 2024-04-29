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
