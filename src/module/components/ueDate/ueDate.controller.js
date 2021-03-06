(function() {
    'use strict';

    angular
        .module('universal-editor')
        .controller('UeDateController', UeDateController);

    function UeDateController($scope, $element, EditEntityStorage, moment, FilterFieldsStorage, $controller) {
        /* jshint validthis: true */
        'ngInject';
        var vm = this,
            componentSettings,
            baseController;

        vm.$onInit = function() {
            componentSettings = vm.setting.component.settings;
            componentSettings.$fieldType = 'date';
            baseController = $controller('FieldsController', { $scope: $scope, $element: $element });
            angular.extend(vm, baseController);

            vm.format = vm.format || 'DD.MM.YYYY HH:mm:ss';
            vm.maxView = vm.maxView || 'year';
            vm.minView = vm.minView || 'minutes';
            vm.view = vm.view || 'days';
            vm.locale = componentSettings.locale;

            vm.addItem = addItem;
            vm.removeItem = removeItem;
            vm.getFieldValue = getFieldValue;

            $scope.minDate = !vm.minDate ? vm.minDate : moment(vm.minDate, vm.format);
            $scope.maxDate = !vm.maxDate ? vm.maxDate : moment(vm.maxDate, vm.format);
            fillPreviewValue();

            vm.listeners.push($scope.$on('ue:componentDataLoaded', $scope.onLoadDataHandler));
        };

        function fillPreviewValue() {
            if (vm.multiple) {
                if (angular.isArray(vm.fieldValue)) {
                    vm.previewValue = [];
                    vm.fieldValue.forEach(function(date, index) {
                        vm.previewValue[index] = !angular.isString(vm.format) ? date.format(vm.format) : date.toString();
                    });
                }
            } else {
                if (vm.fieldValue) {
                    vm.previewValue = !angular.isString(vm.format) ? vm.fieldValue.format(vm.format) : vm.fieldValue.toString();
                }
            }
        }


        //-- private functions
        function removeItem(index) {
            if (angular.isArray(vm.fieldValue)) {
                vm.fieldValue.forEach(function(value, key) {
                    if (key == index) {
                        vm.fieldValue.splice(index, 1);
                    }
                });
            }
        }
        function addItem() {
            vm.fieldValue.push(moment());
        }

        function getFieldValue() {

            var field = {};

            var wrappedFieldValue;

            if (vm.multiname) {
                wrappedFieldValue = [];
                angular.forEach(vm.fieldValue, function(valueItem) {
                    if (isUnDefined(valueItem)) {
                        return;
                    }
                    var tempItem = {};
                    tempItem[vm.multiname] = moment(valueItem, vm.format).format(vm.format);
                    wrappedFieldValue.push(tempItem);
                });
            } else if (vm.multiple) {
                wrappedFieldValue = [];
                angular.forEach(vm.fieldValue, function(valueItem) {
                    if (isUnDefined(valueItem)) {
                        return;
                    }
                    wrappedFieldValue.push(moment(valueItem, vm.format).format(vm.format));
                });
            } else {
                if (isUnDefined(vm.fieldValue)) {
                    wrappedFieldValue = '';
                } else {
                    wrappedFieldValue = moment(vm.fieldValue, vm.format).format(vm.format);
                }
            }

            field[vm.fieldName] = wrappedFieldValue;

            return field;
        }

        function isUnDefined(v) { return v === undefined || v === '' || v === null; }
    }
})();