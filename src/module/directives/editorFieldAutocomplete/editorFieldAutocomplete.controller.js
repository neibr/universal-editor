(function () {
    'use strict';

    angular
        .module('universal.editor')
        .controller('EditorFieldAutocompleteController',EditorFieldAutocompleteController);

    EditorFieldAutocompleteController.$inject = ['$scope','$element','EditEntityStorage','RestApiService','$timeout','ArrayFieldStorage'];

    function EditorFieldAutocompleteController($scope,$element,EditEntityStorage,RestApiService,$timeout,ArrayFieldStorage){
        /* jshint validthis: true */
        var vm = this,
            inputTimeout;
        var fieldErrorName;

        if($scope.parentField){
            if($scope.parentFieldIndex){
                fieldErrorName = $scope.parentField + "_" + $scope.parentFieldIndex + "_" + $scope.fieldName;
            } else {
                fieldErrorName = $scope.parentField + "_" + $scope.fieldName;
            }
        } else {
            fieldErrorName = $scope.fieldName;
        }
        var possibleValues = angular.element($element[0].getElementsByClassName("possible-scroll")[0]);

        var remote = $scope.field.valuesRemote;
        vm.field_id = "id";
        vm.field_search = "title";
        if (remote) {
            if(remote.fields){
                if (remote.fields.value) {
                    vm.field_id = remote.fields.value;
                }
                if (remote.fields.label) {
                    vm.field_search = remote.fields.label;
                } else {
                    vm.field_search = vm.field_id;
                }
            }
        }

        vm.cols = $scope.field.width;
        vm.classWidth = 'col-lg-2 col-md-2 col-sm-3 col-xs-3';
        if (!!vm.cols) {
            if (vm.cols > 6) {
                vm.cols = 6;
            }
            if (vm.cols < 1) {
                vm.cols = 1;
            }
            vm.classWidth = 'col-lg-' + vm.cols + ' col-md-' + vm.cols + ' col-sm-' + vm.cols + ' col-xs-' + vm.cols;
        }

        vm.fieldName = $scope.field.name;
        vm.readonly = $scope.field.readonly || false;
        $scope.$parent.vm.error = [];
        vm.selectedValues = [];
        vm.inputValue = "";
        vm.possibleValues = [];
        vm.activeElement = 0;
        vm.preloadedData = false;
        vm.parentFieldIndex = $scope.parentFieldIndex || false;
        vm.searching = false;
        vm.maxItemsCount = $scope.field.maxItems || Number.POSITIVE_INFINITY;
        vm.minCount = $scope.field.minCount || 2;
        vm.sizeInput = 1;
        vm.classInput = {'width': '1px'};
        vm.showPossible = false;
        vm.placeholder = '';

        if ($scope.field.hasOwnProperty("multiple") && $scope.field.multiple === true){
            vm.multiple = true;
            vm.fieldValue = [];
            if ($scope.field.multiname || angular.isString($scope.field.multiname)) {
                vm.multiname = ('' + $scope.field.multiname) || "value";
            }
        } else {
            vm.multiple = false;
            vm.fieldValue = undefined;
            vm.classInput.width = '99%';
            vm.classInput['padding-right'] = '25px';
        }

        if(vm.parentFieldIndex){
            if(vm.multiple){
                vm.fieldValue = [];
                angular.forEach(ArrayFieldStorage.getFieldValue($scope.parentField,$scope.parentFieldIndex,$scope.field.name), function (item) {
                    if (vm.multiname) {
                        vm.fieldValue.push(item[vm.multiname]);
                    } else {
                        vm.fieldValue.push(item);
                    }
                });
            } else {
                vm.fieldValue = ArrayFieldStorage.getFieldValue($scope.parentField,$scope.parentFieldIndex,$scope.field.name) || vm.fieldValue;
            }
            vm.preloadedData = false;
            loadValues();
        }

        EditEntityStorage.addFieldController(this);

        $element.find("input").bind("keydown", function (event) {
            switch(event.which){
                case 13:
                    event.preventDefault();
                    if(vm.possibleValues.length < 1){
                        break;
                    }

                    $timeout(function () {
                        vm.addToSelected(event, vm.possibleValues[vm.activeElement]);
                    },0);

                    break;
                case 40:
                    event.preventDefault();
                    if(vm.possibleValues.length < 1){
                        break;
                    }

                    possibleValues = angular.element($element[0].getElementsByClassName("possible-scroll")[0]);

                    if(vm.activeElement < vm.possibleValues.length -1){
                        $timeout(function () {
                            vm.activeElement++;
                        },0);

                        $timeout(function () {
                            var activeTop  = angular.element(possibleValues[0].getElementsByClassName("active")[0])[0].offsetTop,
                                activeHeight = angular.element(possibleValues[0].getElementsByClassName("active")[0])[0].clientHeight,
                                wrapperScroll = possibleValues[0].scrollTop,
                                wrapperHeight = possibleValues[0].clientHeight;

                            if (activeTop >= (wrapperHeight + wrapperScroll - activeHeight)) {
                                possibleValues[0].scrollTop += activeHeight + 1;
                            }
                        },1);
                    }
                    break;
                case 38:
                    event.preventDefault();
                    if(vm.possibleValues.length < 1){
                        break;
                    }

                    possibleValues = angular.element($element[0].getElementsByClassName("possible-scroll")[0]);

                    if(vm.activeElement > 0){
                        $timeout(function () {
                            vm.activeElement--;
                        },0);

                        $timeout(function () {
                            var activeTop  = angular.element(possibleValues[0].getElementsByClassName("active")[0])[0].offsetTop,
                                activeHeight = angular.element(possibleValues[0].getElementsByClassName("active")[0])[0].clientHeight,
                                wrapperScroll = possibleValues[0].scrollTop,
                                wrapperHeight = possibleValues[0].clientHeight;

                            if (activeTop < wrapperScroll) {
                                possibleValues[0].scrollTop -= activeHeight + 1;
                            }
                        },1);
                    }
                    break;
            }
        });

        this.getFieldValue = function () {

            var field = {};
            var wrappedFieldValue;

              if(vm.multiname){
                  wrappedFieldValue = [];
                  angular.forEach(vm.selectedValues, function (valueItem) {
                      var tempItem = {};
                      tempItem[vm.multiname] = valueItem[vm.field_id];
                      wrappedFieldValue.push(tempItem);
                  });
              } else if (vm.multiple) {
                wrappedFieldValue = [];
                angular.forEach(vm.selectedValues, function (valueItem) {
                    wrappedFieldValue.push(valueItem[vm.field_id]);
                });
              } else {
                  wrappedFieldValue = vm.selectedValues.length > 0 ? vm.selectedValues[0][vm.field_id] : "";
              }
            if($scope.parentField){
                if(vm.parentFieldIndex){
                    field[$scope.parentField] = [];
                    field[$scope.parentField][vm.parentFieldIndex] = {};
                    field[$scope.parentField][vm.parentFieldIndex][vm.fieldName] = wrappedFieldValue;
                } else {
                    field[$scope.parentField] = {};
                    field[$scope.parentField][vm.fieldName] = wrappedFieldValue;
                }
            } else {
                field[vm.fieldName] = wrappedFieldValue;
            }
            return field;
        };

        this.getInitialValue = function () {

            var field = {};

            if($scope.parentField){
                if(vm.multiple){
                    field[$scope.parentField] = {};
                    field[$scope.parentField][vm.fieldName] = [];
                } else {
                    field[$scope.parentField] = {};
                    field[$scope.parentField][vm.fieldName] = undefined;
                }
            } else {
                if(vm.multiple){
                    field[vm.fieldName] = [];
                } else {
                    field[vm.fieldName] = undefined;
                }
            }

            return field;
        };

        function clear() {
            if ($scope.field.hasOwnProperty("multiple") && $scope.field.multiple === true) {
                vm.fieldValue = [];
            } else {
                vm.fieldValue = undefined;
            }
            $element.find('.autocomplete-field-search').removeClass('hidden');
            vm.inputValue = "";
            vm.sizeInput = 1;
            vm.selectedValues = [];
            vm.placeholder = '';

        }

        $scope.$on('editor:entity_loaded', function (event, data) {
            vm.preloadedData = false;
            $element.find('.autocomplete-field-search').removeClass('hidden');
            vm.inputValue = "";
            vm.selectedValues = [];
            vm.placeholder = '';

            //-- functional for required fields
            if ($scope.field.requiredField) {
                $scope.$watch(function () {
                    var f_value = EditEntityStorage.getValueField($scope.field.requiredField);
                    var result = false;
                    var endRecursion = false;
                    (function (value) {
                        var keys = Object.keys(value);
                        for (var i = keys.length; i--;) {
                            var propValue = value[keys[i]];
                            if (propValue !== null && propValue !== undefined && propValue !== "") {
                                if (angular.isObject(propValue) && !endRecursion) {
                                    arguments.callee(propValue);
                                }
                                result = true;
                                endRecursion = true;
                            }
                        }
                    })(f_value);
                    return result;
                }, function (value) {
                    if (!value) {
                        clear();
                        vm.readonly = true;
                    } else {
                        vm.readonly = $scope.field.readonly || false;
                    }
                }, true);
            }



            if( data.editorEntityType === 'new' ){
                if(!!$scope.field.defaultValue){
                    vm.fieldValue = vm.multiple ? [$scope.field.defaultValue] : $scope.field.defaultValue;
                    loadValues();
                }else{
                    vm.fieldValue = vm.multiple ? [] : undefined;
                }
                if(data.hasOwnProperty($scope.fieldName)) {
                    vm.fieldValue = data[$scope.fieldName];
                    loadValues();                                        
                }
                vm.sizeInput = 1;
                vm.preloadedData = true;
                return;
            }


            if(!$scope.parentField){
                if(!vm.multiple){
                    vm.fieldValue = data[$scope.field.name];
                } else if (vm.multiname) {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.field.name], function (item) {
                        vm.fieldValue.push(item[vm.multiname]);
                    });
                } else {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.field.name], function (item) {
                        vm.fieldValue.push(item);
                    });
                }
            } else {
                if(!vm.multiple){
                    vm.fieldValue = data[$scope.parentField][$scope.field.name];
                } else if (vm.multiname) {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.parentField][$scope.field.name], function (item) {
                        vm.fieldValue.push(item[vm.multiname]);
                    });
                } else {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.parentField][$scope.field.name], function (item) {
                        vm.fieldValue.push(item);
                    });
                }
            }

            loadValues();
        });

        $scope.$on('$destroy', function () {
            EditEntityStorage.deleteFieldController(vm);
            if(vm.parentFieldIndex){
                ArrayFieldStorage.fieldDestroy($scope.parentField,$scope.parentFieldIndex,$scope.field.name,vm.fieldValue);
            }
        });

        $scope.$on("editor:api_error_field_"+ fieldErrorName, function (event,data) {
            if(angular.isArray(data)){
                angular.forEach(data, function (error) {
                    if($scope.$parent.vm.error.indexOf(error) < 0){
                        $scope.$parent.vm.error.push(error);
                    }
                });
            } else {
                if($scope.$parent.vm.error.indexOf(data) < 0){
                    $scope.$parent.vm.error.push(data);
                }
            }
        });

        $scope.$watch(function () {
            return vm.inputValue;
        }, function (newValue) {

            if(inputTimeout) {
              $timeout.cancel(inputTimeout);
            }
            vm.showPossible = true;
            vm.possibleValues = [];
            if (vm.multiple) {
                vm.sizeInput = newValue.length || 1;
                if (vm.sizeInput === 1 && (newValue.length != 1)) {
                    vm.classInput.width = '1px';
                } else {
                    vm.classInput.width = 'initial';
                }
            }
            inputTimeout = $timeout(function(){
                autocompleteSearch(newValue);
            },300);
        },true);

        $scope.$watch(function () {
            return vm.fieldValue;
        }, function () {
            $scope.$parent.vm.error = [];
        });

        /* PUBLIC METHODS */

        vm.addToSelected = function (event, obj) {
            if (!vm.multiple) {
                vm.selectedValues = [];
                vm.placeholder = obj[vm.field_search];
            }
            vm.selectedValues.push(obj);
            $element.find('.autocomplete-field-search').removeClass('hidden');
            vm.inputValue = "";
            vm.sizeInput = 1;
            vm.possibleValues = [];
            if (!vm.multiple) {
                event.stopPropagation();
            }
        };

        vm.removeFromSelected = function (event, obj) {
            angular.forEach(vm.selectedValues, function (val,key) {
                if(val[vm.field_id] == obj[vm.field_id]){
                    vm.selectedValues.splice(key,1);
                    if (!vm.multiple) {
                        vm.placeholder = '';
                    }
                }
            });
        };

        /* PRIVATE METHODS */

        function autocompleteSearch(searchString){

            $scope.$parent.vm.error = [];

            if(searchString === "" || searchString.length <= vm.minCount){
                return;
            }
            vm.searching = true;
            if ($scope.field.hasOwnProperty("values")) {
                angular.forEach($scope.field.values, function (v,key) {
                    var obj = {};
                    if (angular.isArray($scope.field.values)) {
                        obj[vm.field_id] = v;
                    } else {
                        obj[vm.field_id] = key;
                    }
                    obj[vm.field_search] = v;
                    if (containsString(v,searchString) && !alreadySelected(obj)) {
                        vm.possibleValues.push(obj);
                    }
                });
                vm.activeElement = 0;
                vm.searching = false;
            } else {
                var urlParam = {};
                urlParam[vm.field_search] = "%" + searchString + "%";

                RestApiService
                    .getUrlResource($scope.field.valuesRemote.url + "?filter=" + JSON.stringify(urlParam))
                    .then(function (response){
                        angular.forEach(response.data.items, function (v) {
                            if(!alreadySelected(v) && !alreadyInPossible(v)){
                                vm.possibleValues.push(v);
                            }
                        });
                        vm.activeElement = 0;
                        vm.searching = false;
                    }, function (reject) {
                        console.error('EditorFieldAutocompleteController: Не удалось получить значения для поля \"' + $scope.field.name + '\" с удаленного ресурса');
                        vm.searching = false;
                    });
            }
        }

        function containsString(str,search){
            return (str.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        }

        function alreadyInPossible(obj){
          var inPossible = false;

          angular.forEach(vm.possibleValues,function (v) {
            if(v[vm.field_id] == obj[vm.field_id]){
              inPossible = true;
            }
          });

          return inPossible;
        }

        function alreadySelected(obj){

            var inSelected = false;

            angular.forEach(vm.selectedValues, function (v) {
                if(v[vm.field_id] == obj[vm.field_id]){
                    inSelected = true;
                }
            });

            return inSelected;
        }

        function loadValues() {
          if ($scope.field.hasOwnProperty("values")) {
              angular.forEach($scope.field.values, function (v,key) {
                  var obj = {};
                  if(Array.isArray(vm.fieldValue) && vm.fieldValue.indexOf(key) >= 0 && vm.multiple){
                      if (angular.isArray($scope.field.values)) {
                          obj[vm.field_id] = v;
                      } else {
                          obj[vm.field_id] = key;
                      }
                      obj[vm.field_search] = v;
                      vm.selectedValues.push(obj);
                  } else if (vm.fieldValue == key && !vm.multiple){
                      if (angular.isArray($scope.field.values)) {
                          obj[vm.field_id] = v;
                      } else {
                          obj[vm.field_id] = key;
                      }
                      obj[vm.field_search] = v;
                      vm.selectedValues.push(obj);
                      vm.placeholder = obj[vm.field_search];
                  }
              });
              vm.preloadedData = true;
          } else if ($scope.field.hasOwnProperty('valuesRemote')) {

              if (vm.fieldValue === undefined || vm.fieldValue === null) {
                  vm.preloadedData = true;
                  return;
              }

              var urlParam;

              if (vm.multiple && angular.isArray(vm.fieldValue) && vm.fieldValue.length > 0 ) {
                  urlParam = {};
                  urlParam[vm.field_id] = vm.fieldValue;
              } else if (!vm.multiple && vm.fieldValue !== '') {
                  urlParam = {};
                  urlParam[vm.field_id] = [];
                  urlParam[vm.field_id].push(vm.fieldValue);
              } else {
                  vm.preloadedData = true;
                  return;
              }

              RestApiService
                  .getUrlResource($scope.field.valuesRemote.url + '?filter=' + JSON.stringify(urlParam))
                  .then(function (response) {
                      angular.forEach(response.data.items, function (v) {
                          if ( Array.isArray(vm.fieldValue) &&
                              ( vm.fieldValue.indexOf(v[vm.field_id]) >= 0 || vm.fieldValue.indexOf(String(v[vm.field_id])) >= 0) &&
                              vm.multiple
                          ) {
                              vm.selectedValues.push(v);
                          } else if (vm.fieldValue == v[vm.field_id] && !vm.multiple) {
                              vm.selectedValues.push(v);
                              vm.placeholder = v[vm.field_search];
                          }
                      });
                      vm.preloadedData = true;
                  }, function (reject) {
                      vm.preloadedData = true;
                      console.error('EditorFieldAutocompleteController: Не удалось получить значения для поля \"' + $scope.field.name + '\" с удаленного ресурса');
                  });
          } else {
              vm.preloadedData = true;
              console.error('EditorFieldAutocompleteController: Для поля не указан ни один тип получения значений ( локальный или удаленный )');
          }
        }
        vm.focusPossible = function(isActive) {
            vm.isActivePossible = isActive;
            if (!vm.multiple) {
                if ($element.find('.autocomplete-item').length > 0) {
                    if (isActive){
                        $element.find('.autocomplete-field-search').removeClass('hidden');
                        $element.find('.autocomplete-item').addClass('opacity-item');
                    } else {
                        $element.find('.autocomplete-field-search').addClass('hidden');
                        $element.find('.autocomplete-item').removeClass('opacity-item');
                    }
                }
            }
        };

        vm.deleteToAutocomplete = function(event) {
            if (event.which == 8 &&
                !!vm.selectedValues &&
                !!vm.selectedValues.length &&
                !vm.inputValue &&
                vm.multiple
            ) {
                vm.removeFromSelected(event, vm.selectedValues[vm.selectedValues.length - 1]);
            }
        };
    }
})();