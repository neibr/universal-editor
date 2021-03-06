(function () {
    'use strict';

    var ueCheckbox = {
        bindings : {
            setting: '<',
            options: '='
        },
        template : ['$templateCache', function ($templateCache) {
            return $templateCache.get('module/components/ueCheckbox/ueCheckbox.html');
        }],
        controller: 'UeCheckboxController',
        controllerAs : 'vm'
    };

    /**
     * @desc Checkbox-type field.
     * @example <ue-checkbox></ue-checkbox>
     */
    angular
        .module('universal-editor')
        .component('ueCheckbox', ueCheckbox);
})();