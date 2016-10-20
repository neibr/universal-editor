(function() {
    'use strict';

    angular
        .module('universal.editor')
        .service('ModalService', ModalService);

    ModalService.$inject = ['$q', '$rootScope', '$http', 'configData', 'EditEntityStorage', '$location', '$timeout', '$state', '$httpParamSerializer', '$document', '$uibModal'];

    function ModalService($q, $rootScope, $http, configData, EditEntityStorage, $location, $timeout, $state, $httpParamSerializer, $document, $uibModal) {
        var
            self = this,
            modalInstance,
            isOpen = false,
            settings;

        self.close = closeWindow;
        self.open = openWindow;
        self.isModalOpen = isModalOpen;

        function openWindow(component) { /** send fromState и _pk */
            settings = component.settings;
            component.settings.modal = true;

            modalInstance = $uibModal.open({
                component: 'ueModal',
                resolve: {
                    settings: function() {
                        return settings;
                    }
                }
            });

            modalInstance.rendered.then(function() {
                isOpen = true;

                var pk = $state.params['pk' + EditEntityStorage.getLevelChild($state.current.name)];
                if (pk === 'new') {
                    EditEntityStorage.newSourceEntity();
                }
            });

            modalInstance.result.then(closeWindow, closeWindow);
        }

        function isModalOpen() {
            return isOpen;
        }

        function closeWindow() {
            if (isOpen) {
                isOpen = false;
                if (modalInstance) {
                    modalInstance.close();
                }
                modalInstance = null;
                if (settings.fromState) {
                    $state.go(settings.fromState.name, settings.fromParams, { reload: false });
                }
                settings = null;
            }
        }
    }
})();
