(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/editorFieldCheckbox/editorFieldCheckbox.html',
    '\n' +
    '<div class="checkbox-wrapper">\n' +
    '    <div class="row">\n' +
    '        <div class="field-name-label col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div data-ng-if="vm.hint" class="field-hint">\n' +
    '                <div class="hint-text">{{vm.hint}}</div>\n' +
    '            </div><span data-ng-class="vm.required ? \'editor-required\' : \'\' ">{{vm.fieldDisplayName}}:</span>\n' +
    '        </div>\n' +
    '        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div data-ng-repeat="item in vm.selectedValues" data-ng-class="vm.readonly ? \'disabled\' : \'\'" class="checkbox">\n' +
    '                <label>\n' +
    '                    <input type="checkbox" data-ng-disabled="vm.readonly" data-checklist-model="vm.fieldValue" data-checklist-value="item[vm.field_id]"/>{{item[vm.field_search]}}\n' +
    '                </label>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="field-error-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.error" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
