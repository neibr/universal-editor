(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/editorFieldString/editorFieldString.html',
    '\n' +
    '<div>\n' +
    '    <div data-ng-if="vm.multiple" data-ng-class="vm.classTextarea">\n' +
    '        <div data-ng-repeat="field_item in vm.fieldValue track by $index" class="item-string-wrapper input-group">\n' +
    '            <input type="text" data-ui-mask="{{vm.mask}}" data-ng-disabled="vm.readonly" name="{{vm.fieldName}}" data-ng-model="vm.fieldValue[$index]" data-ng-blur="vm.inputLeave(vm.fieldValue[$index])" class="form-control input-sm"/><span class="input-group-btn">\n' +
    '                <button data-ng-click="vm.removeItem($index)" data-ng-if="!vm.readonly" class="btn btn-default btn-sm">x</button></span>\n' +
    '        </div>\n' +
    '        <div data-ng-click="vm.addItem()" data-ng-if="!vm.readonly" class="btn btn-primary btn-sm">{{\'BUTTON.ADD\' | translate}}</div>\n' +
    '    </div>\n' +
    '    <div data-ng-if="!vm.multiple" data-ng-class="vm.classTextarea">\n' +
    '        <input type="text" data-ui-mask="{{vm.mask}}" data-ng-disabled="vm.readonly" name="{{vm.fieldName}}" data-ng-model="vm.fieldValue" data-ng-blur="vm.inputLeave(vm.fieldValue)" size="{{vm.size}}" class="form-control input-sm"/>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();