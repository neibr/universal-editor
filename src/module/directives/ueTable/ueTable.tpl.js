(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/directives/ueTable/ueTable.html',
    '\n' +
    '<table data-ng-hide="vm.entityLoaded || vm.loadingData" class="table table-bordered items-list">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <td class="actions-header context-column"></td>\n' +
    '            <td data-ng-repeat="fieldItem in vm.tableFields" data-ng-class="{ \'active\' : fieldItem.field == vm.sortField, \'asc\' : vm.sortingDirection, \'desc\' : !vm.sortingDirection}" data-ng-click="vm.changeSortField(fieldItem.field)">{{fieldItem.displayName}}</td>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody data-ng-if="vm.listLoaded">\n' +
    '        <tr data-ng-repeat="item in vm.items" data-ng-class="{\'zhs-item\' : (vm.entityType !== item[vm.subType]) &amp;&amp; item[vm.subType] !== undefined}">\n' +
    '            <td class="context-column"><span data-ng-click="vm.toggleContextView(item[vm.idField])" data-ng-show="vm.contextLinks.length" class="context-toggle">Toggle buttons</span>\n' +
    '                <div data-ng-show="vm.contextId == item[vm.idField]" class="context-menu-wrapper">\n' +
    '                    <div data-ng-repeat="link in vm.contextLinks track by $index" data-ng-if="(item[vm.subType] == vm.entityType || item[vm.subType] == undefined)" class="context-menu-item">\n' +
    '                        <div data-ng-if="link.type == \'request\'" data-ng-click="vm.contextAction(link,item[vm.idField])">{{link.label}}</div>\n' +
    '                        <div data-ng-if="link.type == \'edit\'" data-editor-button-edit="" data-entity-subtype="{{item[vm.subType]}}" data-entity-id="{{item[vm.idField]}}" data-button-label="{{link.label}}" data-button-request="{{link.request}}"></div>\n' +
    '                        <div data-ng-if="link.type == \'delete\'" data-editor-button-delete="" data-entity-id="{{item[vm.idField]}}" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-button-class="context"></div>\n' +
    '                        <div data-ng-if="link.type == \'open\'" data-editor-button-open="" data-entity-id="{{item[vm.idField]}}" data-button-label="{{link.label}}" data-button-request="{{link.request}}"></div>\n' +
    '                        <div data-ng-if="link.type == \'download\'" data-editor-button-download="" data-item-value="item" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-index="{{$index}}" data-button-class="context"></div>\n' +
    '                        <div data-ng-if="link.type == \'targetBlank\'" data-editor-button-target-blank="" data-item-value="item" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-index="{{$index}}" data-button-class="context"></div>\n' +
    '                    </div>\n' +
    '                    <div data-ng-repeat="link in vm.mixContextLinks track by $index" data-ng-if="vm.mixEntityType &amp;&amp; item[vm.subType] === vm.mixEntityType" class="context-menu-item">\n' +
    '                        <div data-ng-if="link.type == \'request\'" data-ng-click="vm.contextAction(link,item[vm.idField])">{{link.label}}</div>\n' +
    '                        <div data-ng-if="link.type == \'edit\'" data-editor-button-edit="" data-entity-subtype="{{item[vm.subType]}}" data-entity-id="{{item[vm.idField]}}" data-button-label="{{link.label}}" data-button-request="{{link.request}}"></div>\n' +
    '                        <div data-ng-if="link.type == \'delete\'" data-entity-type="mix" data-editor-button-delete="" data-entity-id="{{item[vm.idField]}}" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-button-class="context"></div>\n' +
    '                        <div data-ng-if="link.type == \'download\'" data-editor-button-download="" data-item-value="item" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-index="{{$index}}" data-button-class="context"></div>\n' +
    '                        <div data-ng-if="link.type == \'targetBlank\'" data-editor-button-target-blank="" data-item-value="item" data-button-label="{{link.label}}" data-button-request="{{link.request}}" data-index="{{$index}}" data-button-class="context"></div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </td>\n' +
    '            <td data-ng-repeat="fieldItem in vm.tableFields track by $index"><span data-ng-class="{\'glyphicon-folder-open icon-mix-mode\' : (vm.isMixMode &amp;&amp; !((vm.entityType !== item[vm.subType]) &amp;&amp; item[vm.subType] !== undefined))}" data-ng-if="vm.prependIcon === fieldItem.field" class="glyphicon"></span><span style="padding-left: {{ item.parentPadding ? item.parentPadding * 10 : 0 }}px;">{{item[fieldItem.field]}}</span></td>\n' +
    '        </tr>\n' +
    '        <tr data-ng-if="vm.items.length == 0">\n' +
    '            <td colspan="{{vm.tableFields.length + 1}}">{{\'ELEMENT_NO\' | translate}}</td>\n' +
    '        </tr>\n' +
    '    </tbody>\n' +
    '    <tfoot>\n' +
    '        <tr data-ng-if="vm.metaKey">\n' +
    '            <td colspan="{{vm.tableFields.length + 1}}">\n' +
    '                <div class="meta-info">{{\'ELEMENTS\' | translate}} {{vm.metaData.fromItem}} - {{vm.metaData.toItem}} {{\'FROM\' | translate}} {{vm.metaData.totalCount}}</div>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td colspan="{{vm.tableFields.length + 1}}" data-ng-if="vm.pagination &amp;&amp; vm.metaKey">\n' +
    '                <ul class="pagination">\n' +
    '                    <li data-ng-repeat="pageItem in vm.pageItemsArray" data-ng-class="pageItem.self ? \'active\' : \'\'"><a data-ng-if="!pageItem.self" href="{{pageItem.href}}" data-ng-click="vm.changePage($event,pageItem.href)">{{pageItem.label}}</a><span data-ng-if="pageItem.self">{{pageItem.label}}</span></li>\n' +
    '                </ul>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '    </tfoot>\n' +
    '</table>');
}]);
})();
