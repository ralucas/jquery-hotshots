(function() {

    $.views.helpers({
        getMembers: function(obj) {
            var prop,
                arr = [];

            for ( prop in obj ) {
                // always do this if: Good Practice
                // checks to make sure it's not inherited
                if ( obj.hasOwnProperty(prop) ) {

                    var newObj = {
                        key: prop,
                        val: obj[prop]
                    }
                    arr.push(newObj);
                }
            }
            return arr;
        }
    });

    var template = $.templates( $('#contactTemplate').html() );

    window.addEventListener('message', function(e) {
        if( e.data.command === 'issueTemplate' ) {
            
            var message = {
                markup: template.render( e.data.context )
            };

            e.source.postMessage( message, event.origin );
        }
    });

}());