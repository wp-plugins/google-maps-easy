/*global jQuery, google*/
(function ($, app, undefined) {

    /**
     * Creates a new instance of the Google Map
     *
     * @constructor
     */
    function GoogleMap(mapId, config) {
        // Public properties
        this.config = {};

        // Private properties
        var map = null,
            defaults = {
                // Set default map center on New York.
                center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        config = config || {};

        if (mapId === undefined) {
            throw new Error('Map ID is not specified.');
        }

        if (!$.isPlainObject(config)) {
            throw new Error('Config must be a plain JavaScript object.');
        }

        if (typeof mapId === 'string') {
            mapId = $(mapId)[0];
        }

        this.config = $.extend({}, config, defaults);
        this.markers = [];

        map = new google.maps.Map(mapId, this.config);

        /**
         * Returns default map settings.
         *
         * @returns {{center: google.maps.LatLng, zoom: number, mapTypeId: google.maps.MapTypeId}}
         */
        this.getDefaults = function () {
            return defaults;
        };

        /**
         * Returns a google.maps.Map object.
         *
         * @returns {google.maps.Map}
         */
        this.getRawMapInstance = function () {
            return map;
        };
    }

    GoogleMap.prototype = {
        /**
         * @param {number} lat
         * @param {number} lng
         * @returns {GoogleMap}
         */
        setCenter: function (lat, lng) {
            this.getRawMapInstance().setCenter(new google.maps.LatLng(lat, lng));

            return this;
        },
        /**
         * @returns {google.maps.LatLng}
         */
        getCenter: function () {
            return this.getRawMapInstance().getCenter();
        },

        /**
         * @param {number} zoomLevel
         */
        setZoom: function (zoomLevel) {
            this.getRawMapInstance().setZoom(parseInt(zoomLevel));
        },

        /**
         * @returns {number}
         */
        getZoom: function () {
            return this.getRawMapInstance().getZoom();
        },

        /**
         * @param {string} event
         * @param {function} callback
         * @param {bool} once
         * @returns {GoogleMap}
         */
        on: function (event, callback, once) {
            var map = this.getRawMapInstance();

            once = once || false;

            if (once) {
                google.maps.event.addListenerOnce(map, event, callback);

                return this;
            }

            google.maps.event.addListener(map, event, callback);

            return this;
        },

        geocoding: function (address, resolve, reject) {
            if (address === undefined || $.trim(address).length < 1) {
                throw new Error('Invalid or empty address');
            }

            if (!$.isFunction(resolve)) {
                throw new Error('Resolver must be a function.');
            }

            if (!$.isFunction(reject)) {
                if (reject === undefined) {
                    reject = function () {};
                } else {
                    throw new Error('Reject must be a function.');
                }
            }

            var geoCoder = new google.maps.Geocoder();
            geoCoder.geocode({ address: address }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        },

        reverseGeocoding: function (lat, lng, resolve, reject) {
            var geocoder = new google.maps.Geocoder(),
                latLng = new google.maps.LatLng(lat, lng);

            geocoder.geocode({
                latLng: latLng
            }, function (response, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    if ($.isFunction(reject)) {
                        reject.call(null, status);
                    }
                }

                if ($.isFunction(resolve) && null != response) {
                    var address;

                    if (!response.length) {
                        return;
                    }

                    address = response.shift().formatted_address;

                    resolve.call(null, address);
                }
            });
        },

        addHiddenMarker: function (options, form) {
            var _ctrl = this,
                currentMap = this.getRawMapInstance(),
                marker = new google.maps.Marker(
                    $.extend({}, {
                        map: currentMap,
                        position: currentMap.getCenter()
                    }, options)
                );

            if (options === undefined || (typeof options === 'object' && !('title' in options))) {
                marker.setTitle('Untitled marker');
            }

            marker.setDescription = function (description) {
                var content = '';

                if (this.infoWindow === undefined) {
                    this.infoWindow = new google.maps.InfoWindow();
                }

                description = description.replace(/([^>])\n/g, '$1<br/>') || '';

                content = $('<div/>', {})
                    .addClass('egm-marker-iw')
                    .html(description);

                this.infoWindow.setContent(content[0]);
            };

            marker.setForm = function (form) {
                this.form = form;
            };

            marker.getForm = function () {
                return this.form;
            };

            marker.bindForm = function () {
                this.form.control('title').on('input.egm paste.egm change.egm keyup.egm',
                    $.proxy(function () {
                        this.setTitle(this.form.control('title').val());
                    }, this)
                );

                this.form.controls(['coord_x', 'coord_y'],
                    $.proxy(function (control) {
                        control.on('input.egm paste.egm change.egm keyup.egm',
                            $.proxy(function (e) {
                                e.stopImmediatePropagation();

                                var lat = this.form.control('coord_x').val(),
                                    lng = this.form.control('coord_y').val();

                                this.setPosition(new google.maps.LatLng(lat, lng));

                                app.EditMapController.Map.reverseGeocoding(lat, lng,
                                    $.proxy(function (address) {
                                        this.form.control('address').val(address);
                                    }, this),
                                    function (status) {
                                        // geoloc failed
                                    }
                                );
                            }, this)
                        );
                    }, this)
                );
            };

            marker.unbindForm = function () {
                this.form.control('title').unbind('.egm');
                this.form.control('coord_x').unbind('.egm');
                this.form.control('coord_y').unbind('.egm');
            };

            marker.egmInit = function () {
                this.setDraggable(true);

                if (!('form' in marker) || marker.form === undefined || marker.form === null) {
                    return this;
                }

                var form = this.form,
                    onDragEnd = function () {
                        try {
                            form.control('title').val(marker.getTitle());
                            form.control('coord_x').val(marker.getPosition().lat());
                            form.control('coord_y').val(marker.getPosition().lng());

                            _ctrl.reverseGeocoding(
                                this.getPosition().lat(),
                                this.getPosition().lng(),
                                function (address) {
                                    form.control('address').val(address);
                                },
                                function (status) {
                                    // Geocoding failed
                                }
                            );
                        } catch (e) {}
                    };

                this.addListener('dragend', $.proxy(onDragEnd, this));
                this.bindForm();
            };

            if (typeof form === 'object' && ('controls' in form && 'control' in form)) {
                marker.setForm(form);
            }

            marker.egmInit();

            google.maps.event.trigger(marker, 'dragend');

            this.markers.push(marker);

            return marker;
        },

        addMarker: function (options, form) {
            var marker = this.addHiddenMarker(options, form);

            marker.setMap(this.getRawMapInstance());

            return marker;
        },

        clearMarkers: function () {
            $.each(this.markers, function (index, marker) {
                marker.setMap(null);
            });
        }
    };

    $(document).ready(function () {
        app.GoogleMap = GoogleMap;
    });
}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));