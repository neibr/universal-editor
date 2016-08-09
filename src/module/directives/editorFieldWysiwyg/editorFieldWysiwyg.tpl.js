(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/editorFieldWysiwyg/editorFieldWysiwyg.html',
    '\n' +
    '<div>\n' +
    '    <div class="row">\n' +
    '        <div class="field-name-label col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div data-ng-if="vm.hint" class="field-hint">\n' +
    '                <div class="hint-text">{{vm.hint}}</div>\n' +
    '            </div><span data-ng-class="vm.required ? \'editor-required\' : \'\' ">{{vm.fieldDisplayName}}:</span>\n' +
    '        </div>\n' +
    '        <div data-ng-if="vm.multiple" class="field-textarea-wrapper col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div data-ng-repeat="field_item in vm.fieldValue track by $index" class="item-textarea-wrapper">\n' +
    '                <div>\n' +
    '                    <textarea data-ui-tinymce="vm.wysiwygOptions" data-ng-model="vm.fieldValue[$index]"></textarea>\n' +
    '                    <div data-ng-click="vm.removeItem($index)" data-ng-if="!vm.readonly" class="btn btn-default btn-sm">x</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div data-ng-click="vm.addItem()" data-ng-if="!vm.readonly" class="btn btn-primary btn-sm">{{\'BUTTON.ADD\' | translate}}</div>\n' +
    '        </div>\n' +
    '        <div data-ng-if="!vm.multiple" class="field-textarea-wrapper col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div>\n' +
    '                <textarea data-ui-tinymce="vm.wysiwygOptions" data-ng-model="vm.fieldValue"></textarea>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="field-error-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.error" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
