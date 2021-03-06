(function() {

    var tags = '';

    /*
    * @name getBounties
    * Does an ajax call to stackexchange's featured questions and provides the 
    * response data back to the callback function
    * 
    * @param {number} page Page Number
    * @param {getBounties-callback} callback - Callback function handles the data response
    *
    * @function $.ajax Makes XHR ajax call to Stackexchange API
    * @function beforeSend Shows searching while ajax call is taking place
    *
    * @returns {object} data object from stackoverflow, includes page, tags, etc.
    */
    var getBounties = function(page, callback) {
        $.ajax({
            url: 'https://api.stackexchange.com/2.0/questions/featured',
            dataType: 'jsonp',
            data: {
                page: page,
                pagesize: 10,
                tagged: tags,
                order: 'desc',
                sort: 'activity',
                site: 'stackoverflow',
                filter: '!)4k2jB7EKv1OvDDyMLKT2zyrACssKmSCXeX5DeyrzmOdRu8sC5L8d7X3ZpseW5o_nLvVAFfUSf'
            },
            beforeSend: function() {
                $.mobile.loadingMessageTextVisible = true;
                $.mobile.showPageLoadingMsg('a', 'Searching');
            }
            // waits for the ajax call to respond and then fires the callback function
        }).done(function(data) {
            callback(data);
        });
    };

    /*
    * Fires on the pageinit event, 'on' method binds it to document object
    * then bind via 'on', the 'click' method to the search button that adds 
    * the disabled class to the button, pulls the value from the tags, then runs
    * the getBounties function
    *
    * @event pageinit This event is fired the first time a page is initialized
    */
    $(document).on('pageinit', '#welcome', function() {
        $('#search').on('click', function() {
            $(this).closest('.ui-btn').addClass('ui-disabled');
            tags = $('tags').val();
            getBounties(1, function(data) {
                data.currentPage = 1;
                // sets response into local storagea and JSON.stringify's it.
                // stringify here as only primitives and arrays can be held in
                // localStorage
                localStorage.setItem('res', JSON.stringify(data));
                $.mobile.changePage('bounty-hunter-list.html', {
                    transition : 'slide'
                });
            });
        });
    });

    /*
    * Binds pageshow event to document object, fires a function that
    * removes the ui-disabled class from the button
    *
    * @event pageshow This event is fired every time a page is shown
    */
    $(document).on('pageshow', '#welcome', function() {
        $('#search').closest('.ui-btn').removeClass('ui-disabled');
    });


    $(document).on('pageinit', '#list', function() {
        var data = JSON.parse(localStorage.getItem('res')),
            total = parseInt(data.total, 10),
            size = parseInt(data.page_size, 10),
            totalPages = Math.ceil(total/size),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var createDate = function(date) {
            var cDate = new Date(date * 1000),
                fDate = [cDate.getDate(), months[cDate.getMonth()], cDate.getFullYear()].join(' ');
                return fDate;
        };

        $.views.helpers({ CreateDate: createDate });

        $('#results')
            .append($('#listTemplate')
                .render(data))
            .find('ul')
            .listview();

        var setClasses = function() {
            if (data.currentPage > 1) {
                $('a[data-icon="back"]').removeClass('ui-disabled');
            } else {
                $('a[data-icon="back"]').addClass('ui-disabled');
            }

            if (data.currentPage < totalPages) {
                $('a[data-icon="forward"]').removeClass('ui-disabled');
            } else {
                $('a[data-icon="forward"]').addClass('ui-disabled');
            }
        };

        $('span.num').text(data.currentPage);
        $('span.of').text(totalPages);

        if (totalPages > 1) {
            $('a[data-icon="forward"]').removeClass('ui-disabled');
        }
    });

}());