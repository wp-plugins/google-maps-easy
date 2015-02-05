/*global jQuery, google*/
(function ($, app, undefined) {

    var autoOpenFlagKey = 'egmMarkerAutoOpen';

    function Controller() {
        var _form, _markersList, _popup, _uploader, _ctrl;

        _form = $('#egmMarkerForm');
        _markersList = $('#markerList');
        _popup = $('#iconsPopup');

        _ctrl = this;

        /**
         * @type {{NewMarker: (jQuery|HTMLElement), SaveMarker: (jQuery|HTMLElement)}}
         */
        this.Buttons = {
            Add: $('#gmpAddMarkerBtn'),
            Save: $('#gmpSaveMarkerBtn'),
            Edit: $('.egm-marker-edit'),
            Remove: $('.egm-marker-remove'),
            Icon: $('.button-icon')
        };

        this.Uploader = {
            init: function () {
                this.frame = window.wp.media.frames.file_frame = window.wp.media({
                    title: 'Upload icon',
                    button: {
                        text: 'Upload icon'
                    }
                });

                this.frame.on('select', $.proxy(function () {
                    var selected = this.frame.state().get('selection').toJSON(),
                        data = selected[0];

                    $.sendFormGmp({
                        msgElID: null,
                        data: {
                            reqType: 'ajax',
                            pl: 'gmp',
                            mod: 'icons',
                            action: 'saveNewIcon',
                            icon: {
                                url: data.url,
                                title: data.title,
                                description: ''
                            }
                        },
                        onSuccess: function (response) {
                            if (response.error) {
                                alert('Failed to add icon to the icons list.');

                                return;
                            }

                            var row = _popup.find('.previewIcon:first').clone(),
                                icon = response.data;

                            row.attr('title', icon.title);

                            row.attr('data-id', icon.id);
                            row.attr('data-tags', icon.description);
                            row.attr('data-path', icon.url);

                            row.find('img').attr('src', icon.url);

                            _ctrl.Dialog.applyClickHandler(row);

                            row.appendTo(_popup.find('.iconsList'));
                        }
                    });
                }, this));
            },
            open: function () {
                this.frame.open();
            }
        };

        this.Form = $.extend({}, _form, {
            control: function (name, subname) {
                var selectorStr = 'marker_opts[' + name + ']';

                if (subname !== undefined) {
                    selectorStr = selectorStr + '[' + subname + ']';
                }

                return this.find('[name="' + selectorStr + '"]');
            },
            controls: function (controls, fn) {
                if (!$.isArray(controls)) {
                    throw new Error('Parameter 1 must be an array.');
                }

                if (!$.isFunction(fn)) {
                    throw new Error('Parameter 2 must be a function.');
                }

                $.each(controls, $.proxy(function (i, name) {
                    var control = this.control(name);

                    fn.call(control, control, name);
                }, this));
            },
            setDefaults: function () {
                this.trigger('reset');

                this.control('icon').val(1);
                this.find('.egm-marker-icon img').attr('src', _ctrl.Icons.getPath(1));

                if (window.tinyMCE && window.tinyMCE.activeEditor) {
                    window.tinyMCE.activeEditor.setContent('');
                }
            },
            setValues: function (values, exceptions) {
                var form = this;

                if (!$.isPlainObject(values)) {
                    throw new Error('Parameters values must be a plain ' +
                    'JavaScript object');
                }

                $.each(values, function (name, value) {
                    var control = self.control(name);

                    if (control || control.length) {
                        if (exceptions && exceptions[name] !== undefined) {
                            if ($.isFunction(exceptions[name])) {
                                exceptions[name].call(null, form, control, name, value);
                            }
                        } else {
                            control.val(value);
                        }
                    }
                });
            },
            save: function () {
                var successCallback;

                if (window.tinyMCE && window.tinyMCE.activeEditor) {
                    window.tinyMCE.activeEditor.save();
                }

                successCallback = function (response) {
                    if (response.error) {
                        return;
                    }

                    if (!response.data.update) {
                        var markers = app.EditMapController.Map.markers,
                            index = markers.length - 1,
                            last = markers[index];

                        response.data.marker.index = index;
                        last.config = response.data.marker;

                        _ctrl.Markers.add(last);
                    } else {
                        var marker = response.data.marker,
                            row = _markersList.find('#marker-' + marker.id);

                        if (!row.length) {
                            return;
                        }

                        $(app.EditMapController.Map.markers).each(function (i, item) {
                            if (item.config.id == marker.id) {
                                item.config = marker;

                                if (item.infoWindow == undefined) {
                                    item.infoWindow = new google.maps.InfoWindow();
                                }

                                item.infoWindow.setContent(marker.description);
                            }
                        });

                        row.attr('id', 'marker-' + marker.id);
                        row.attr('data-id', marker.id);

                        row.find('.egm-marker-title').text(marker.title);

                        // Show short coordinates
                        row.find('.egm-marker-latlng').text(function () {
                            var lat = parseFloat(marker.coord_x).toFixed(2),
                                lng = parseFloat(marker.coord_y).toFixed(2);

                            return lat + '"N ' + lng + '"E';
                        });

                        // Store full coordinates to the data attributes.
                        row.attr('data-lat', marker.coord_x);
                        row.attr('data-lng', marker.coord_y);

                        _ctrl.Form.control('icon').unbind();
                    }

                    _ctrl.Form.hide();
                    _ctrl.Form.setDefaults();
                };

                this.sendFormGmp({
                    msgElID: null,
                    onSuccess: successCallback
                });
            }
        });

        this.Markers = $.extend({}, _markersList, {
            updateSelectors: function () {
                _ctrl.Buttons.Remove = $(_ctrl.Buttons.Remove.selector);
                _ctrl.Buttons.Edit = $(_ctrl.Buttons.Edit.selector);
            },
            clearList: function () {
                _markersList.find('.row[data-id]').remove();
            },
            remove: function (id, messageElementId, callback) {
                if (!$.isFunction(callback)) {
                    callback = function () {};
                }

                if (messageElementId === undefined || typeof messageElementId !== 'string') {
                    messageElementId = null;
                }

                $.sendFormGmp({
                    msgElID: messageElementId,
                    onSuccess: callback,
                    data: {
                        reqType: 'ajax',
                        pl: 'gmp',
                        page: 'marker',
                        action: 'removeMarker',
                        id: parseInt(id)
                    }
                });
            },
            edit: function (row) {
                var form = _ctrl.Form, config, marker;

                marker = app.EditMapController.Map.markers[row.data('index')];

                if (marker == undefined) {
                    alert('Failed to load marker.');

                    return;
                }

                config = marker.config;

                form.setDefaults();
                form.control('title').val(config.title);
                form.control('address').val(config.address);
                form.control('coord_x').val(config.coord_x);
                form.control('coord_y').val(config.coord_y);
                form.control('id').val(config.id);
                form.control('map_id').val(app.HashParser.segment('mapId'));
                form.control('icon').val(config.icon);

                form.control('description').val(config.description);

                if (window.tinyMCE != undefined) {
                    var editorId = form.control('description').attr('id'),
                        editor = tinyMCE.get(editorId);

                    if (editor && editor instanceof tinyMCE.Editor) {
                        editor.setContent(config.description);
                    }
                }

                marker.setForm(form);
                marker.egmInit();

                // Some hardcore magic for infowindow
                // ---
                var bindContent = function () {
                    //iWindow.setContent(form.control('description').val().replace(/([^>])\n/g, '$1<br/>'));
                };

                var bindIcon = function () {
                    $('span.egm-marker-icon img, #marker-' + config.id + ' .egm-marker-icon img').attr('src', form.control('path').val());
                    marker.setIcon(form.control('path').val());
                };

                form.control('icon').unbind();

                // Bind real-time editing support.
                form.control('description').on('paste keyup change', bindContent);

                // Unbind real-time content editing when user create new marker.
                _ctrl.Buttons.Add.on('click', function () {
                    form.control('description').off('paste keyup change', bindContent);
                    //form.control('icon').unbind();
                });

                _ctrl.Buttons.Save.on('click', function () {
                    //form.control('icon').unbind();
                });

                // Show infoWindow when user click on the marker.
                google.maps.event.addListener(marker, 'click', $.proxy(function () {
                    //iWindow.open(app.EditMapController.Map.getRawMapInstance(), marker);
                }, this));

                // Icons
                form.control('icon').on('change', bindIcon);

                $('span.egm-marker-icon img').attr('src', _ctrl.Icons.getPath(config.icon));

                form.show({
                    duration: 0,
                    complete: function () {
                        _ctrl.Buttons.Add.removeClass('button-block');
                        _ctrl.Buttons.Save.show();
                    }
                });

                _ctrl.Buttons.Save.one('click', function () {
                    marker.unbindForm();
                    marker.setForm(null);
                });
            },
            add: function (marker) {
                if (!marker || !marker instanceof google.maps.Marker) {
                    return;
                }

                if (!('config' in marker)) {
                    return;
                }

                var row = _markersList.find('#markerTemplate').clone( true );

                row.attr('id', 'marker-' + marker.config.id);
                row.attr('data-id', marker.config.id);

                row.find('.egm-marker-title').text(marker.config.title);

                // Show short coordinates
                row.find('.egm-marker-latlng').text(function () {
                    var lat = parseFloat(marker.config.coord_x).toFixed(2),
                        lng = parseFloat(marker.config.coord_y).toFixed(2);

                    return lat + '"N ' + lng + '"E';
                });

                row.find('.egm-marker-icon img').attr('src', function () {
                    return $('.previewIcon[data-id="' + marker.config.icon + '"]').data('path');
                });

                // Store full coordinates to the data attributes.
                row.attr('data-lat', marker.config.coord_x);
                row.attr('data-lng', marker.config.coord_y);
                row.attr('data-index', marker.config.index);

                row.show();

                row.appendTo(_markersList);
            }
        });

        this.Dialog = {
            init: function () {
                _popup.dialog({
                    modal: true,
                    width: 640,
                    height: 480,
                    autoOpen: false
                });

                this.applyClickHandler(_popup.find('li.previewIcon'));

                _popup.on('dialogopen', function (e, ui) {
                    var title = _popup.prev().find('.ui-dialog-title');

                    if (title && title.length) {
                        title.html(function () {
                            return 'Choose Icon or ' +
                                '<button class="button button-block button-upload-icon" onclick="EasyGoogleMaps.MarkerEditController.Uploader.open();">' +
                                    '<i class="fa fa-upload"></i>'+
                                    'Upload New Icon' +
                                '</button>';
                        });
                    }
                });
            },
            applyClickHandler: function (target) {
                target.on('click', function (e) {
                    _ctrl.Form.control('icon').val(function () {
                        var _target = $(e.currentTarget),
                            path;

                        if (e.currentTarget.dataset && e.currentTarget.dataset.path) {
                            path = e.currentTarget.dataset.path;
                        } else {
                            path = _target.data('path');
                        }

                        _ctrl.Form.control('path').val(path)
                            .trigger('change');

                        return _target.data('id');
                    }).trigger('change');

                    _ctrl.Dialog.close();
                });
            },
            open: function () {
                _popup.dialog('open');
            },
            close: function () {
                _popup.dialog('close');
            }
        };

        this.Icons = {
            find: function (id) {
                id = parseInt(id);
                var row = $(_popup.selector).find('.previewIcon[data-id="' + id + '"]');

                if (!row.length) {
                    return null;
                }

                return {
                    id:   id,
                    path: row.data('path'),
                    tags: row.data('tags')
                }
            },
            getPath: function (id) {
                var icon = this.find(id);

                if (icon === null) {
                    return null;
                }

                return icon.path;
            }
        };

        app.TabsController.on('click', $.proxy(function (e) {
            var target = $(e.currentTarget);

            if (target.attr('href') === '#gmpAddMap') {
                this.Markers.clearList();
                this.Form.setDefaults();
                this.Form.hide();
            }
        }, this));

        this.init();
    }

    Controller.prototype = {
        setAutoOpen: function (autoOpen) {
            if (window.localStorage && window.localStorage.setItem) {
                window.localStorage.setItem(autoOpenFlagKey, autoOpen);
            }
        },
        enableAutoOpen: function () {
            this.setAutoOpen(1);
        },
        disableAutoOpen: function () {
            this.setAutoOpen(0);
        },
        isAutoOpen: function () {
            if (window.localStorage && window.localStorage.getItem) {
                return window.localStorage.getItem(autoOpenFlagKey) == 1;
            }

            return false;
        },
        init: function () {
            this.Dialog.init();

            this.Uploader.init();

            this.Form.control('address').on('change paste keyup',
                $.proxy(function (e) {
                    e.stopImmediatePropagation();

                    var address = $(e.currentTarget),
                        source = $.proxy(function (request, response) {
                            app.EditMapController.Map.geocoding(
                                address.val(),
                                function (results) {
                                    response($.map(results, function (result) {
                                        return {
                                            label: result.formatted_address,
                                            lat: result.geometry.location.lat(),
                                            lng: result.geometry.location.lng()
                                        }
                                    }));
                                }
                            );
                        }, this),
                        select = $.proxy(function (e, ui) {
                            var lat = ui.item.lat,
                                lng = ui.item.lng;

                            this.Form.control('coord_x').val(lat).trigger('change.egm');
                            this.Form.control('coord_y').val(lng).trigger('change.egm');
                            this.Form.control('address').val(ui.item.value);

                            app.EditMapController.Map.setCenter(lat, lng);
                        }, this),
                        config = {
                            source: source,
                            select: select
                        };

                    address.autocomplete(config);
                }, this)
            );

            this.Form.control('address').on('focusout', $.proxy(function (e) {
                var address = $(e.currentTarget);

                app.EditMapController.Map.geocoding(
                    address.val(),
                    $.proxy(function (results) {
                        var lat = results[0].geometry.location.lat(),
                            lng = results[0].geometry.location.lng();

                        this.Form.control('coord_x')
                            .val(lat)
                            .trigger('change');

                        this.Form.control('coord_y')
                            .val(lng)
                            .trigger('change');

                        app.EditMapController.Map.setCenter(lat, lng);
                    }, this)
                );
            }, this));

            this.Buttons.Icon.on('click', $.proxy(function (e) {
                e.preventDefault();

                this.Dialog.open();
            }, this));

            this.Buttons.Save.on('click', $.proxy(function (e) {
                e.preventDefault();

                this.Form.save();
                app.GridController.refresh();

                this.Buttons.Save.hide();
                this.Buttons.Add.addClass('button-block');

                if (app.EditMapController.Map.markers.length) {
                    $.each(app.EditMapController.Map.markers,
                        function (i, marker) {
                            marker.unbindForm();
                        }
                    );
                }

                this.disableAutoOpen();
            }, this));

            this.Buttons.Add.on('click', $.proxy(function (e) {
                var marker, iWindow, bindContent;

                e.preventDefault();

                if (!app.HashParser.has('mapId')) {
                    app.EditMapController.Form.save();
                    this.enableAutoOpen();

                    return;
                }

                this.Buttons.Save.show();
                this.Buttons.Add.removeClass('button-block');

                this.Form.show();
                this.Form.setDefaults();

                this.Form.control('map_id').val(app.HashParser.segments.mapId);
                this.Form.control('id').val('');

                // Hardcore
                marker = app.EditMapController.Map.addMarker({}, this.Form);
                iWindow = new google.maps.InfoWindow();

                bindContent = $.proxy(function () {
                    iWindow.setContent(
                        this.Form.control('description').val()
                            .replace(/([^>])\n/g, '$1<br/>')
                    );
                }, this);

                this.Form.control('description').on('paste keyup change',
                    bindContent
                );

                google.maps.event.addListener(marker, 'click', function () {
                    iWindow.open(
                        app.EditMapController.Map.getRawMapInstance(),
                        marker
                    );
                });

                this.Form.control('icon').unbind();

                this.Form.control('icon').on('change', $.proxy(function () {
                    var iconId = this.Form.control('icon').val();

                    this.Form.find('.egm-marker-icon img').attr('src', $.proxy(function () {
                        var iconPath = this.Icons.getPath(iconId);

                        marker.setIcon(iconPath);

                        return iconPath;
                    }, this));

                }, this));

                if (this.Form.control('icon').val() == '') {
                    this.Form.control('path').val(this.Icons.getPath(1));
                    this.Form.control('icon').val(1).trigger('change');

                    this.Form.find('.egm-marker-icon img').attr(
                        'src',
                        this.Icons.getPath(1)
                    );
                }

                marker.setIcon(this.Icons.getPath(1));
            }, this));

            this.Buttons.Remove.on('click', $.proxy(function (e) {
                e.preventDefault();

                var button = $(e.currentTarget),
                    row = button.parents('.row[data-id]');

                if (!row.length || !confirm('Are you sure?')) {
                    return;
                }

                button.empty();
                $('<i/>', { 'class': 'fa fa-fw fa-gear fa-spin' }).appendTo(button);

                this.Markers.remove(row.data('id'), null, function (response) {
                    if (!response.error) {
                        row.remove();
                        app.HashParser._trigger();
                        app.EditMapController.refreshMapsList();
                    }
                });

            }, this));

            this.Buttons.Edit.on('click', $.proxy(function (e) {
                e.preventDefault();

                var button = $(e.currentTarget),
                    row = button.parents('.row[data-id]');

                if (!row.length) {
                    return;
                }

                this.Markers.edit(row);
            }, this));
        }
    };

    $(document).ready(function () {
        app.MarkerEditController = new Controller();
    });

}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));