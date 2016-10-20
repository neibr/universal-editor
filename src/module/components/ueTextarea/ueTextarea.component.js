(function () {
    'use strict';

    var ueTextarea = {
        bindings : {
            setting: '=',
            filter: '='
        },
        template : ['$templateCache', function ($templateCache) {
            return $templateCache.get('module/components/ueTextarea/ueTextarea.html');
        }],
        controller: 'UeTextareaController',
        controllerAs : 'vm'
    };

    /**
     * @desc String-type field.
     * @example <ue-textarea></ue-textarea>
     */
    angular
        .module('universal.editor')
        .component('ueTextarea',ueTextarea);
})();