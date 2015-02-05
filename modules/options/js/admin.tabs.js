(function ($, app, undefined) {

    /**
     * Tabs Controller
     * @param {string} tabsSelector
     * @param {string} defaultTab
     * @constructor
     */
    function Controller(tabsSelector, defaultTab) {
        var $tabs = $(tabsSelector);

        if (!$tabs.length) {
            throw new Error('Failed to find any elements ' +
            'with selector ' + tabsSelector);
        }

        this.defaultTab = defaultTab || null;
        this.storeHashes = true;

        /**
         * Returns jQuery object of the tabs (NOT tabs content).
         * @returns {jQuery}
         */
        this.getTabs = function () {
            return $tabs;
        };

        this._init();
    }

    Controller.prototype = {
        hideAll: function () {
            $('[data-tabcontent="true"]').hide();
        },
        /**
         * Shows the selected tab
         * @param {string} id
         */
        show: function (id) {
            var element = this._filter(id);

            if (element.length) {
                /* Rewritten from the old code with BS tabs. */
                var content = $(element.attr('href'));

                if (content.length) {
                    $('[data-tabcontent="true"]').hide();

                    content.show();
                    element.parents('ul').find('li').removeClass('active');
                    element.parents('li').addClass('active');
                }
            }
        },
        /**
         * Shows the default tab.
         * If default tab is not specified, first tab will be shown.
         */
        showDefaultTab: function () {
            if (!this.defaultTab) {
                this.defaultTab = this.getTabs().first().attr('href');
            }

            this.show(this.defaultTab);
        },
        /**
         * Returns current tab
         * @returns {jQuery}
         */
        getCurrentTab: function () {
            var $listItem = this.getTabs().parents('li').filter('.active');

            return $listItem.find('a');
        },
        /**
         * Returns ID ("href" attribute) of the current tab
         * @returns {string}
         */
        getCurrentTabId: function () {
            return this.getCurrentTab().attr('href');
        },
        /**
         * Returns text (title) of the current tab
         * @returns {string}
         */
        getCurrentTabText: function () {
            return this.getCurrentTab().text();
        },
        /**
         * Adds an event listener to the tabs.
         * @param {string} events
         * @param {function} callback
         */
        on: function (events, callback, once) {
            if (typeof once !== 'boolean') {
                once = false;
            }

            once = once || false;

            if (once) {
                this.getTabs().one(events, callback);
            } else {
                this.getTabs().on(events, callback);
            }
        },
        onTabShow: function (callback, once) {
            this.on('show.bs.tab', callback, once);
        },
        /**
         * @todo: write description
         * @param {function} callback
         * @param {bool} once
         */
        onTabShown: function (callback, once) {
            this.on('shown.bs.tab', callback, once);
        },
        /**
         * @todo: write description
         * @param {function} callback
         * @param {bool} once
         */
        onTabHidden: function (callback, once) {
            this.on('hidden.bs.tab', callback, once);
        },
        /**
         * Return jQuery object of the specified tab.
         * @param {string} id
         * @returns {jQuery}
         * @private
         */
        _filter: function (id) {
            if (id.charAt(0) != '#') {
                id = '#' + id;
            }

            return this.getTabs().filter('[href="' + id + '"]');
        },
        /**
         * Initialize controller
         * @private
         */
        _init: function () {
            this.hideAll();

            this.getTabs().on('click', $.proxy(function (e) {
                e.preventDefault();

                this.show($(e.currentTarget).attr('href'));
            }, this));

            if (!this.storeHashes) {
                this.showDefaultTab();

                return;
            }

            this.on('click', function (e) {
                window.location.hash = $(e.currentTarget).attr('href');
            });

            if (window.location.hash) {
                this.show(window.location.hash);
            } else {
                this.showDefaultTab();
            }
        }
    };

    $(document).ready(function () {
        app.TabsController = new Controller('.supsystic-navigation a', 'gmpAllMaps');
    });

}(jQuery, window.EasyGoogleMaps = window.EasyGoogleMaps || {}));