(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/components/ueForm/ueForm.html',
    '\n' +
    '<div data-ng-show="vm.entityLoaded" class="editor-body">\n' +
    '    <div data-ng-click="vm.closeButton()" ng-style="{\'background-image\':\'url(\'+ vm.assetsPath +\'/images/close.jpg)\'}" class="close-editor"></div>\n' +
    '    <div class="nav nav-tabs">\n' +
    '        <li data-ng-repeat="tab in vm.tabs" data-ng-class="vm.currentTab == tab.label ? \'active\' : \'\'" data-ng-click="vm.currentTab = tab.label"><a href="">{{tab.label}}</a></li>\n' +
    '    </div>\n' +
    '    <div class="tab-content-wrapper">\n' +
    '        <div data-ng-repeat="tab in vm.tabs" data-ng-show="vm.currentTab == tab.label" class="tab-item-content">\n' +
    '            <div class="field-content-wrapper">\n' +
    '                <field-wrapper data-ng-repeat="field in tab.fields" data-setting="field" data-ng-if="(vm.editorEntityType == \'new\' &amp;&amp; field.showOnly == \'create\') || (vm.editorEntityType == \'exist\' &amp;&amp; field.showOnly == \'edit\') || !field.showOnly"></field-wrapper>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="field-error-bottom-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.errors" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '    <div class="field-notify-bottom-wrapper">\n' +
    '        <div data-ng-repeat="notify in vm.notifys" class="notify-item">{{notify}}</div>\n' +
    '    </div>\n' +
    '    <div data-ng-if="vm.entityLoaded" class="editor-entity-actions">\n' +
    '        <button-wrapper data-ng-repeat="button in vm.editFooterBar track by $index" data-entity-id="{{vm.entityId}}" data-setting="button" data-button-class="footer" class="editor-action-button"></button-wrapper>\n' +
    '        <!--.editor-action-button(ng-repeat="button in (vm.editorEntityType == \'new\' ? vm.editFooterBarNew : vm.editFooterBarExist) track by $index")\n' +
    '        //div(data-ng-if="(button.type == \'add\') && vm.editorEntityType == \'new\'", data-editor-button-add="", data-button-label="{{button.label}}")\n' +
    '        //div(data-ng-if="(button.type == \'presave\')", data-editor-button-presave="", data-entity-id="{{vm.entityId}}", data-button-request="{{button.request}}", data-button-label="{{button.label}}")\n' +
    '        //div(data-ng-if="(button.type == \'update\') && vm.editorEntityType == \'exist\'", data-editor-button-update="", data-entity-id="{{vm.entityId}}", data-button-label="{{button.label}}")\n' +
    '        //div(data-ng-if="(button.type == \'delete\') && vm.editorEntityType == \'exist\'", data-editor-button-delete="", data-entity-id="{{vm.entityId}}", data-button-label="{{button.label}}", data-button-class="editor")\n' +
    '        //div.btn.btn-md.btn-success(data-ng-if="button.type == \'request\'", data-ng-click="vm.contextAction(button, vm.entityId)") {{button.label}}\n' +
    '        //div(data-ng-if="button.type == \'targetBlank\'", data-editor-button-target-blank="", data-item-value="item", data-button-label="{{button.label}}", data-button-request="{{button.request}}", data-index="{{$index}}", data-button-class="editor")\n' +
    '        //div(data-ng-if="button.type == \'download\'", data-editor-button-download="", data-item-value="item", data-button-label="{{button.label}}", data-button-request="{{button.request}}", data-index="{{$index}}", data-button-class="editor")\n' +
    '        -->\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
