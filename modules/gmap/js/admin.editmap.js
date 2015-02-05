(function ($, app, undefined) {

    function Controller() {
        var _shortcode, _form, _map, _stdButton, _markersList, _ctrl;

        _ctrl = this;

        _shortcode = $('#mapShortcode');
        _form = $('#gmpEditMapForm');

        _map = new app.GoogleMap('#gmpMapPreview', {});

        _stdButton = {
            disable: function () {
                this.attr('disabled', 'disabled');
            },
            enable: function () {
                this.removeAttr('disabled');
            }
        };

        app.TabsController.on('click', function (e) {
            var target = $(e.currentTarget);

            if (target.attr('href') === '#gmpAddMap') {
                _ctrl.Map = new app.GoogleMap('#gmpMapPreview', {});
                _ctrl.resetPage();

                // Hide "Save marker" button if we can do it now.
                if (app.MarkerEditController && app.MarkerEditController.Buttons) {
                    app.MarkerEditController.Buttons.Add.addClass('button-block');
                    app.MarkerEditController.Buttons.Save.hide();
                }
            }
        });

        /**
         * Map buttons
         * @type {{Save: jQuery, Delete: jQuery}}
         */
        this.Buttons = {
            Save: $.extend({}, $('#gmpSaveMap'), _stdButton),
            Delete: $.extend({}, $('#gmpDeleteMap'), _stdButton, {
                enable: function () {
                    this.removeAttr('disabled');
                    this.attr('map-id', _ctrl.Form.control('id'));
                }
            })
        };

        /**
         * Maps form
         * @type {jQuery}
         */
        this.Form = $.extend({}, _form, {
            defaults: {
                id: '',
                title: '',
                width: 100,
                width_units: '%',
                height: 250
            },
            control: function (name, subname) {
                var selectorStr = 'map_opts[' + name + ']';

                if (subname !== undefined) {
                    selectorStr = selectorStr + '[' + subname + ']';
                }

                return this.find('[name="' + selectorStr + '"]');
            },
            setDefaults: function () {
                this.trigger('reset');

                this.setValues(this.defaults, {
                    width_units: function (form, checkboxes, name, val) {
                        var unit = checkboxes.filter('[value="' + val + '"]');

                        if (unit.length) {
                            unit.attr('checked', 'checked');
                        }
                    }
                });

                this.control('title').removeAttr('placeholder');
            },
            setValues: function (values, exceptions) {
                var self = this;

                if (!$.isPlainObject(values)) {
                    throw new Error('Parameters values must be a plain ' +
                    'JavaScript object');
                }

                $.each(values, function (name, value) {
                    var control = self.control(name);

                    if (control || control.length) {
                        if (exceptions && exceptions[name] !== undefined) {
                            if ($.isFunction(exceptions[name])) {
                                exceptions[name].call(null, self, control, name, value);
                            }
                        } else {
                            control.val(value);
                        }
                    }
                });
            },
            save: function () {
                this.control('map_center', 'coord_x').val(_ctrl.Map.getCenter().lat());
                this.control('map_center', 'coord_y').val(_ctrl.Map.getCenter().lng());
                this.control('zoom').val(_ctrl.Map.getZoom());

                if ($.trim(this.control('title').val()) == '') {
                    this.control('title').val('Untitled map');
                }

                this.sendFormGmp({
                    msgElID: null,
                    onSuccess: $.proxy(function (response) {
                        this.control('title').removeAttr('placeholder');

                        if (response.error) {
                            return;
                        }

                        _ctrl.editMap(response.data.map_id);
                        _ctrl.refreshMapsList();
                    }, this)
                });
            }
        });

        /**
         * @type {EasyGoogleMaps.GoogleMap}
         */
        this.Map = _map;

        /**
         * @type {jQuery}
         */
        this.Shortcode = $.extend({}, _shortcode, {
            effectDuration: 0,
            _sc: _shortcode.find('#shortcodeCode'),
            _notice: _shortcode.find('#shortcodeNotice'),

            /**
             * Sets map id for the shortcode value
             * @param {string} mapId
             */
            setMapId: function (mapId) {
                this._sc.find('span:last').text(mapId);
            },

            /**
             * Shows the shortcode and hide notice
             * @param {string} mapId Optional map id
             */
            showCode: function (mapId) {
                this._sc.show({
                    duration: this.effectDuration,
                    complete: $.proxy(function () {
                        this._notice.hide();
                    }, this)
                });

                if (mapId != undefined) {
                    this.setMapId(mapId);
                }
            },

            /**
             * Hides shortcode and shows notice
             */
            hideCode: function () {
                this._sc.hide({
                    duration: this.effectDuration,
                    complete: $.proxy(function () {
                        this._notice.show();
                    }, this)
                });
            }
        });

        this.init();
    }

    Controller.prototype = {
        resetPage: function () {
            this.Shortcode.hideCode();
            this.Form.setDefaults();

            this.Buttons.Delete.disable();
            this.Buttons.Delete.removeAttr('data-map-id');
        },
        loadByHash: function () {
            var loadMap = $.proxy(function () {
                if (!app.HashParser.has('editMap')) {
                    return;
                }

                if (!app.HashParser.has('mapId')) {
                    app.TabsController.showDefaultTab();

                    return;
                }

                this.editMap(app.HashParser.segment('mapId'));

            }, this);

            loadMap();

            app.HashParser.onChange(loadMap);
        },
        init: function () {
            this.resetPage();
            this.loadByHash();

            this.Buttons.Save.on('click', $.proxy(function (e) {
                e.preventDefault();

                this.Form.save();
            }, this));

            this.Buttons.Delete.on('click', $.proxy(function (e) {
                e.preventDefault();

                if (false === gmpRemoveMap($(e.currentTarget).data('map-id'))) {
                    return;
                }

                app.TabsController.showDefaultTab();
            }, this));
        },
        refreshMapsList: function () {
            app.GridController.refresh();
        },
        saveMap: function () {
            this.Buttons.Save.trigger('click');
            this.refreshMapsList();
        },
        editMap: function (mapId) {
            var successCallback;

            successCallback = $.proxy(function (response) {
                if (response.error) {
                    return;
                }

                var map, values;

                app.TabsController.show('gmpAddMap');
                this.Map = new app.GoogleMap('#gmpMapPreview', {});

                map = response.data.map;
                values = {
                    id: map.id,
                    title: map.title,
                    width: map.html_options.width,
                    width_units: map.params.width_units,
                    height: map.html_options.height
                };

                this.Form.setValues(values, {
                    width_units: function (form, control, field, value) {
                        var radio = control.filter('[value="' + value + '"]');

                        if (radio.length) {
                            radio.attr('checked', 'checked');
                        }
                    }
                });

                this.Buttons.Delete.attr('data-map-id', mapId);
                this.Buttons.Delete.enable();

                this.Map.clearMarkers();
                app.MarkerEditController.Markers.clearList();

                if ('markers' in map && map.markers.length) {
                    $.each(map.markers, $.proxy(function (index, config) {
                        var marker, position;

                        config.index = index;

                        position = new google.maps.LatLng(
                            config.coord_x,
                            config.coord_y
                        );

                        marker = this.Map.addMarker();

                        marker.setTitle(config.title);
                        marker.setPosition(position);
                        marker.setIcon(app.MarkerEditController.Icons.getPath(config.icon));
                        marker.setDescription(config.description);

                        marker.config = config;

                        google.maps.event.addListener(marker, 'click', $.proxy(function () {
                            marker.infoWindow.open(this.Map.getRawMapInstance(), marker);
                        }, this));

                        app.MarkerEditController.Markers.add(marker);
                    }, this));

                    app.MarkerEditController.Markers.show();
                    app.MarkerEditController.Markers.updateSelectors();

                    app.MarkerEditController.Form.setDefaults();
                    app.MarkerEditController.Form.hide();
                    app.MarkerEditController.Buttons.Add.addClass('button-block');
                    app.MarkerEditController.Buttons.Save.hide();
                }

                this.Map.setCenter(
                    map.params.map_center.coord_x,
                    map.params.map_center.coord_y
                );

                if (isNumber(map.params.zoom)) {
                    this.Map.setZoom(map.params.zoom);
                }

                this.Shortcode.showCode(mapId);

                window.location.hash = '#editMap&mapId=' + mapId;

                if (app.MarkerEditController.isAutoOpen()) {
                    app.MarkerEditController.Buttons.Add.trigger('click');
                }
            }, this);

            this.resetPage();

            $.sendFormGmp({
                msgElID: 'gmpRemoveElemLoader__' + mapId,
                data: {
                    page: 'gmap',
                    action: 'getMapById',
                    id: parseInt(mapId),
                    reqType: 'ajax'
                },
                onSuccess: successCallback
            });
        }
    };

    $(document).ready(function () {
        app.EditMapController = new Controller();
    });

}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));