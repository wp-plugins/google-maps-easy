(function ($, app, undefined) {

    /**
     * Constructs table controller
     * @constructor
     */
    function Controller() {
        var _table = $('#egmMaps');

        this.getTable = function () {
            if (_table.selector != undefined) {
                _table = $(_table.selector);
            }

            return _table;
        };

        this.init();
    }

    Controller.prototype = {
        getGridUrl: function () {
            var baseUri = ajaxurl,
                query = {
                    pl:         'gmp',
                    reqType:    'ajax',
                    mod:        'gmap',
                    action:     'getListForTbl'
                };

            return baseUri + '?' + $.param(query);
        },
        getGridParameters: function () {
            var gridUrl = this.getGridUrl();

            return {
                url:            gridUrl,
                datatype:       'json',
                autowidth:      true,
                shrinkToFit:    true,
                colNames:       ['ID', 'Title', 'Create Date', 'Markers', 'Actions'],
                colModel:       [
                    {
                        name: 'id',
                        index: 'id',
                        searchoptions: {
                            sopt: ['eq']
                        },
                        width: '30',
                        align: 'center'
                    },
                    {
                        name: 'title',
                        index: 'title',
                        searchoptions: {
                            sopt: ['eq']
                        },
                        align: 'center'
                    },
                    {
                        name: 'create_date',
                        index: 'create_date',
                        searchoptions: {
                            sopt: ['eq']
                        },
                        align: 'center',
                        width: 60
                    },
                    {
                        name: 'markers',
                        index: 'markers',
                        searchoptions: {
                            sopt: ['eq']
                        },
                        align: 'center'
                    },
                    {
                        name: 'actions',
                        index: 'actions',
                        search: false,
                        sortable: false,
                        align: 'center',
                        width: 40
                    }
                ],
                postData: {
                    search: {
                        text_like: $('#tblSearchText').val()
                    }
                },
                sortname: 'id',
                viewrecords: true,
                sortorder: 'desc',
                pager: '#egmMapsNav',
                jsonReader: { repeatitems : false, id: '0' },
                height: '100%',
                width: '100%',
                emptyrecords: 'No data found',
                //multiselect: true,
                beforeSelectRow: function(rowid, e) {
                    return false;
                },
                gridComplete: function () {
                    /* Trim ugly whitespaces inside table */
                    $('.mapListMarkers').find('span').each(function () {
                        var span = $(this), content = span.html();

                        span.html( $.trim(content) );
                    });
                }
            }
        },
        init: function () {
            this.getTable().jqGrid(this.getGridParameters());

            $('#tblSearchText').keyup($.proxy(function (e) {
                var value = $.trim($(e.currentTarget).val());

                if (value != '') {
                    this.getTable().setGridParam({
                        postData: {
                            search: {
                                text_like: value
                            }
                        }
                    });

                    this.refresh();
                }
            }, this));
        },
        refresh: function () {
            this.getTable().trigger('reloadGrid');
        }
    };

    $(document).ready(function () {
        var ctrl = app.GridController = new Controller();
    });

}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));