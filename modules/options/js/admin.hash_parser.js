(function ($, app, undefined) {

    function HashParser() {
        this.hash = window.location.hash;
        this.segments = {};

        this._onWindowChange($.proxy(this.parse, this));
        this._trigger();
    }

    HashParser.prototype = {
        parse: function () {
            this.segments = {};
            this.hash = window.location.hash;

            var hash = this.hash.substring(1).split('&');

            if (!$.isArray(hash)) {
                return;
            }

            $(hash).each($.proxy(function (index, pairs) {
                var kv = pairs.split('=');

                this.segments[kv[0]] = kv[1];
            }, this)).promise().done($.proxy(function () {
                $(this).trigger('change.hp');
            }, this));

        },
        has: function (segmentName) {
            return (segmentName in this.segments);
        },
        segment: function (segmentName) {
            return this.segments[segmentName];
        },
        onChange: function (fn) {
            $(this).on('change.hp', fn);
        },
        _onWindowChange: function (callback) {
            $(window).on('hashchange', callback);
        },
        _trigger: function () {
            $(window).trigger('hashchange');
        }
    };

    app.HashParser = new HashParser();
}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));