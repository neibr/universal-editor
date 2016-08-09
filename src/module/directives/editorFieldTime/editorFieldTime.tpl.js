(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/editorFieldTime/editorFieldTime.html',
    '\n' +
    '<div>\n' +
    '    <div class="row">\n' +
    '        <div class="field-name-label col-lg-6 col-md-6 col-sm-6 col-xs-6">\n' +
    '            <div data-ng-if="vm.hint" class="field-hint">\n' +
    '                <div class="hint-text">{{vm.hint}}</div>\n' +
    '            </div><span data-ng-class="vm.required ? \'editor-required\' : \'\' ">{{vm.fieldDisplayName}}:</span>\n' +
    '        </div>\n' +
    '        <div data-ng-if="vm.multiple" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">\n' +
    '            <div data-ng-repeat="field_item in vm.fieldValue track by $index" class="item-timepicker-wrapper input-group">\n' +
    '                <input name="{{vm.fieldName}}" data-ng-disabled="vm.readonly" data-ng-model="vm.fieldValue[$index]" data-date-time="" data-format="HH:mm" data-max-view="hours" data-min-view="minutes" data-view="hours" class="form-control input-sm timepicker"/><span class="input-group-btn">\n' +
    '                    <button data-ng-click="vm.removeItem($index)" data-ng-if="!vm.readonly" class="btn btn-default btn-sm">x</button></span>\n' +
    '            </div>\n' +
    '            <div data-ng-click="vm.addItem()" data-ng-if="!vm.readonly" class="btn btn-primary btn-sm">{{\'BUTTON.ADD\' | translate}}</div>\n' +
    '        </div>\n' +
    '        <div data-ng-if="!vm.multiple" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">\n' +
    '            <input name="{{vm.fieldName}}" data-ng-disabled="vm.readonly" data-ng-model="vm.fieldValue" data-date-time="" data-format="HH:mm" data-max-view="hours" data-min-view="minutes" data-view="hours" class="form-control input-sm timepicker"/>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="field-error-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.error" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
