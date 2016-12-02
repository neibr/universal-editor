(function() {
    'use strict';

    angular
        .module('universal.editor')
        .controller('UeFormGroupController', UeFormGroupController);

    UeFormGroupController.$inject = ['$scope', 'EditEntityStorage', '$timeout',  'RestApiService', '$controller'];

    function UeFormGroupController($scope, EditEntityStorage, $timeout,  RestApiService, $controller) {
        /* jshint validthis: true */
        var vm = this,
            componentSettings = vm.setting.component.settings,
            entityObject = RestApiService.getEntityObject(),
            baseController,
            widthBootstrap = 12;

        vm.fieldName = componentSettings.name;

        baseController = $controller('BaseController', { $scope: $scope });
        angular.extend(vm, baseController);
        
        vm.innerFields = [];
        vm.fieldsArray = [];
        vm.countInLine = componentSettings.countInLine || 1;          
        widthBootstrap = Math.ceil(12 / vm.countInLine);       
        vm.className = 'col-md-' + widthBootstrap + ' col-xs-' + widthBootstrap + ' col-sm-' + widthBootstrap + ' col-lg-' + widthBootstrap;

        if(vm.multiple === true && !vm.fieldName) {
          console.log('UeFormGroup: в режиме multiple обязательно должен быть указан параметр name.');
        }

        vm.addItem = addItem;
        vm.removeItem = removeItem;

        angular.forEach(componentSettings.fields, function(value, index) {
            var field;
            if (angular.isString(value)) {
                field = entityObject.dataSource.fields.filter(function(k) {
                    return k.name == value;
                })[0];
            } else if (value && value.component) {
                field = value;
            }
            if (field) {
                if (vm.fieldName) {
                    field.parentField = vm.fieldName;
                }
                vm.innerFields.push(field);
            }
        });

        vm.$isOnlyChildsBroadcast = false;
        vm.listeners.push($scope.$on('editor:entity_loaded', onLoadedHandler));
        vm.option = angular.merge({}, vm.options);
        vm.option.isGroup = true;
        function onLoadedHandler(event, data) {
            if (!vm.$isOnlyChildsBroadcast) {
                var group = data[vm.fieldName];
                if (group) {
                    if (vm.multiple && angular.isArray(group)) {
                        group.forEach(vm.addItem);
                        $timeout(function() {
                            vm.$isOnlyChildsBroadcast = true;
                            $scope.$broadcast('editor:entity_loaded', data);
                            delete vm.$isOnlyChildsBroadcast;
                        }, 0);
                    }
                }
            }
        }
        
        function removeItem(ind) {
            var tmpArray = vm.fieldsArray;
            vm.fieldsArray.splice(ind, 1);
        }    

        function addItem() {
            var clone = vm.innerFields.map(function(field) { return angular.extend({}, field); });
            angular.forEach(clone, function(value, index) {
                value.parentFieldIndex = vm.fieldsArray.length;
            });
            vm.fieldsArray.push(clone);
        }
    }
})();