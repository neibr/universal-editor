(function () {
    'use strict';

    var ueForm = {
        bindings : {
            setting: "=",
            funcCloseModal: '&'
        },
        template : ['$templateCache', function ($templateCache) {
            return $templateCache.get('module/components/ueForm/ueForm.html');
        }],
        controller: 'UeFormController',
        controllerAs : 'vm'
    };

    /**
     * @desc String-type field.
     * @example <ue-form></ue-for,>
     */
    angular
        .module('universal.editor')
        .component('ueForm',ueForm);
})();