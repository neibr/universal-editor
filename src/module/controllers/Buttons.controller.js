(function() {
    'use strict';

    angular
        .module('universal-editor')
        .controller('ButtonsController', ButtonsController);

    function ButtonsController($scope, $controller, $element) {
        /* jshint validthis: true */
        'ngInject';
        var vm = this;
        
        var baseController = $controller('BaseController', { $scope: $scope, $element: $element });
        angular.extend(vm, baseController);
        var self = $scope.vm;
        self.setting.inline = true;
        var componentSettings = self.setting.component.settings;

        self.template = self.setting.component.settings.template;
        self.label = componentSettings.label;
        self.type = self.setting.type;
        self.entityId = self.setting.entityId;
        self.disabled = componentSettings.disabled === true;

        /** if template is set as a html-file */
        var htmlPattern = /[^\s]+(?=\.html$)/;

        if (angular.isString(self.template) || angular.isFunction(self.template)) {
            var template = self.template;
            if (angular.isFunction(self.template)) {
                self.template = self.template($scope);
            }
            if (self.template && htmlPattern.test(self.template)) {
                self.template = $templateCache.get(template);
                if (self.template === undefined) {
                    $translate('ERROR.FIELD.TEMPLATE').then(function(translation) {
                        console.warn(translation.replace('%template', template));
                    });
                }
            }
        }
    }
})();
