    window.onload = function() {

        // INITIALISE MASONRY
        var elem = document.getElementById('posts');
        var msnry = new Masonry(elem, {
            itemSelector: '.post',
            percentPosition: true,
            columnWidth: '#post-sizer',
            gutter: '#gutter-sizer'
        });

        // CALL MASONRY LAYOUT
        msnry.layout();

        // CALL MASONRY LAYOUT ON EMBED LOAD
        const embedObserver = new MutationObserver((m, o) => {
            msnry.layout();
        });
        embedObserver.observe(document, {
            childList: true,
            subtree: true
        });

        // INITIALISE INFINITE SCROLL
        let infScroll = new InfiniteScroll(elem, {
            path: '.pagination__next',
            append: '.post',
            history: false,
            outlayer: msnry,
        });

    }