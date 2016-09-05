(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/editorFieldSelect/editorFieldSelect.html',
    '\n' +
    '<div>\n' +
    '    <div data-ng-if="vm.multiple &amp;&amp; !vm.isTree" class="col-lg-2 col-md-2 col-sm-3 col-xs-3">\n' +
    '        <select name="{{vm.fieldName}}" data-ng-disabled="vm.readonly || !vm.parentValue" data-ng-model="vm.fieldValue" multiple="multiple" class="form-control">\n' +
    '            <option data-ng-repeat="option in vm.options" value="{{option[vm.field_id]}}">{{option[vm.field_search]}}</option>\n' +
    '        </select>\n' +
    '        <div data-ng-show="!!vm.loadingData" class="processing-status-wrapper">\n' +
    '            <div class="processing-status">{{\'PERFORMS_ACTIONS\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div data-ng-if="!vm.multiple &amp;&amp; !vm.isTree" class="col-lg-2 col-md-2 col-sm-3 col-xs-3">\n' +
    '        <div data-ng-click="vm.isShowPossible($event)" data-ng-class="!vm.search ? &quot;but-for-search&quot; : &quot;&quot;" class="select-input-wrapper">\n' +
    '            <input data-ng-if="vm.search" placeholder="{{vm.placeholder}}" data-ng-class="vm.isSelection ? &quot;color-placeholder&quot; : &quot;&quot;" data-ng-model="vm.filterText" data-ng-change="vm.change()" data-ng-focus="vm.focusPossible(true)" data-ng-blur="vm.focusPossible(false)" class="form-control"/>\n' +
    '            <div data-ng-if="!vm.search" class="form-control select-input">\n' +
    '                <div data-ng-class="vm.colorPlaceholder ? &quot;color-placeholder-div&quot; : &quot;&quot;" class="dropdown__selected-items">{{vm.placeholder}}</div>\n' +
    '            </div>\n' +
    '            <div data-ng-if="!vm.readonly &amp;&amp; (vm.options.length &gt; 0) &amp;&amp; vm.showPossible" data-ng-class="{&quot;active&quot; : vm.isActivePossible}" class="possible-values">\n' +
    '                <div data-ng-repeat="option in vm.options" data-ng-mouseover="vm.activeElement = $index" data-ng-click="vm.addToSelected(option)" data-ng-class="vm.activeElement == $index ? \'active\' : \'\'" class="possible-value-item">{{option[vm.field_search]}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div data-ng-show="!!vm.loadingData" class="processing-status-wrapper">\n' +
    '            <div class="processing-status">{{\'PERFORMS_ACTIONS\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div data-ng-if="vm.isTree" class="dropdown col-lg-3 col-md-3 col-sm-3 col-xs-3">\n' +
    '        <div class="dropdown__host">\n' +
    '            <div data-ng-class="{\'dropdown__title_open\': isOpen}" data-ng-click="toggleDropdown($event)" data-ng-style="{&quot;cursor&quot; : vm.search ? &quot;text&quot; : &quot;pointer&quot;}" class="dropdown__title form-control select-input">\n' +
    '                <div data-ng-repeat="value in vm.fieldValue" data-ng-if="vm.fieldValue.length &amp;&amp; (vm.multiple || vm.treeParentField &amp;&amp; vm.treeChildCountField)" class="selected-items__item">\n' +
    '                    <div class="selected-item">{{value[vm.field_search]}}<span data-ng-click="vm.remove($event, value)" class="selected-item__btn_delete">×</span></div>\n' +
    '                </div>\n' +
    '                <input data-ng-show="vm.search" data-ng-model="vm.filterText" data-ng-change="vm.change()" placeholder="{{vm.placeholder}}" data-ng-keyup="vm.clickEsc($event)" data-ng-style="vm.styleInput" size="{{vm.sizeInput}}" class="dropdown__search-field"/>\n' +
    '                <div data-ng-if="!vm.search">\n' +
    '                    <div data-ng-if="!vm.loadingData &amp;&amp; !vm.fieldValue.length" class="dropdown__selected-items dropdown-tree">{{vm.placeholder}}</div>\n' +
    '                </div>\n' +
    '                <div data-ng-if="::(vm.treeParentField &amp;&amp; vm.treeChildCountField)" data-ng-class="{\'dropdown__items_with-selected\': vm.fieldValue.length &gt; 2 || (vm.search &amp;&amp; vm.fieldValue.length)}" data-dropdown-items="" data-options="vm.options" data-is-open="isOpen &amp;&amp; vm.options.length" data-field-search="vm.field_search" data-child-count-field="vm.treeChildCountField" data-on-toggle="vm.toggle" data-api="field.values_remote.api" data-select-branches="vm.treeSelectBranches" data-assets-path="vm.assetsPath" data-multiple="vm.multiple" data-active-element="vm.activeElement" data-set-active-element="vm.setActiveElement" class="dropdown__items dropdown__items_with-padding active"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div data-ng-show="!!vm.loadingData" class="processing-status-wrapper">\n' +
    '            <div class="processing-status">{{\'PERFORMS_ACTIONS\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
