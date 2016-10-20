(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/components/ueColorpicker/ueColorpicker.html',
    '\n' +
    '<div ng-class="{\'field-wrapper row\':!vm.filter}">\n' +
    '    <label ng-if="!vm.filter" class="field-name-label">\n' +
    '        <div data-ng-if="vm.hint" class="field-hint">\n' +
    '            <div ng-bind="vm.hint" class="hint-text"></div>\n' +
    '        </div><span data-ng-class="{\'editor-required\': vm.required}" ng-bind="vm.fieldDisplayName"></span>\n' +
    '    </label>\n' +
    '    <div ng-class="{\'filter-inner-wrapper\': vm.filter, \'field-element\': !vm.filter}" ng-style="{\'overflow:auto\':vm.multiple}"> \n' +
    '        <div data-ng-if="vm.multiple" class="col-lg-2 col-md-2 col-sm-3 col-xs-3">\n' +
    '            <div data-ng-repeat="field_item in vm.fieldValue track by $index" class="item-colorpicker-wrapper input-group">\n' +
    '                <input type="text" data-ng-disabled="vm.readonly" data-minicolors="" data-ng-model="vm.fieldValue[$index]" class="form-control input-sm"/><span class="input-group-btn">\n' +
    '                    <button data-ng-click="vm.removeItem($index)" data-ng-if="!vm.readonly" class="btn btn-default btn-sm">x</button></span>\n' +
    '            </div>\n' +
    '            <div data-ng-click="vm.addItem()" data-ng-if="!vm.readonly" class="btn btn-primary btn-sm">{{\'BUTTON.ADD\' | translate}}</div>\n' +
    '        </div>\n' +
    '        <div data-ng-if="!vm.multiple">\n' +
    '            <input type="text" data-ng-disabled="vm.readonly" data-minicolors="" data-ng-model="vm.fieldValue" class="form-control input-sm"/>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="!vm.filter" class="field-error-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.error track by $index" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
