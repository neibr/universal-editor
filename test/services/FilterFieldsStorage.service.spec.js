describe('FilterFieldsStorage tests ', function() {
  let FilterFieldsStorage, $rootScope, $location, createController, $controller, $compile;
  let listRequestHandler;
  let apiList = {
    "items": [
      {
        id: 1,
        title: 'item1'
      },
      {
        id: 2,
        title: 'item2'
      }
    ],
    "_links": {
      "self": {
        "href": "/rest/v1/news/categories"
      }
    },
    "_meta": {
      "totalCount": 4,
      "pageCount": 1,
      "currentPage": 1,
      "perPage": 20
    }
  };
  beforeEach(angular.mock.module('universal-editor'));

  beforeEach(inject(function($injector) {
    FilterFieldsStorage = $injector.get('FilterFieldsStorage');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');

    $location.search('prefix-filter', '{"title":"Title"}');

    createController = function(settings) {
      var scope, element;
      scope = $rootScope.$new();
      scope.setting = settings;
      element = $compile('<component-wrapper setting="setting"></component-wrapper>')(scope);
      scope.$digest();
      return element.isolateScope();
    };
  }));

  it('registerFilterController and addFilterFieldController', function() {
    let gridSettings = {
      component: {
        name: 'ue-grid',
        settings: {
          dataSource: {
            standard: 'YiiSoft',
            transport: {
              url: '/rest/v1/news/categories'
            },
            fields: [
              {
                name: 'id',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'ID',
                    validators: [
                      {
                        type: 'number'
                      }
                    ]
                  }
                }
              },
              {
                name: 'title',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'Title'
                  }
                }
              }
            ]
          },
          header: {
            toolbar: [
              {
                component: {
                  name: 'ue-filter'
                }
              }
            ]
          },
          columns: ['id', 'title']
        }
      }
    };
    var controller = createController(gridSettings);
    expect(FilterFieldsStorage.getFilterFieldController(gridSettings.component.$id).length).toBe(gridSettings.component.settings.dataSource.fields.length);
    controller.$destroy();
    expect(FilterFieldsStorage.getFilterFieldController(gridSettings.component.$id).length).toBe(0);
  });

  it('getFilterController', function() {
    let gridSettings = {
      component: {
        name: 'ue-grid',
        settings: {
          dataSource: {
            standard: 'YiiSoft',
            transport: {
              url: '/rest/v1/news/categories'
            },
            fields: [
              {
                name: 'id',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'ID',
                    validators: [
                      {
                        type: 'number'
                      }
                    ]
                  }
                }
              },
              {
                name: 'title',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'Title'
                  }
                }
              }
            ]
          },
          header: {
            toolbar: [
              {
                component: {
                  name: 'ue-filter'
                }
              }
            ]
          },
          columns: ['id', 'title']
        }
      }
    };
    var controller = createController(gridSettings);

    expect(FilterFieldsStorage.getFilterController(gridSettings.component.$id).setting.component.name).toBe('ue-filter');
  });

  it('isFilterSearchParamEmpty', function() {
    let gridSettings = {
      component: {
        name: 'ue-grid',
        settings: {
          routing: {
            paramsPrefix: 'prefix'
          },
          dataSource: {
            standard: 'YiiSoft',
            transport: {
              url: '/rest/v1/news/categories'
            },
            fields: [
              {
                name: 'id',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'ID',
                    validators: [
                      {
                        type: 'number'
                      }
                    ]
                  }
                }
              },
              {
                name: 'title',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'Title'
                  }
                }
              }
            ]
          },
          header: {
            toolbar: [
              {
                component: {
                  name: 'ue-filter'
                }
              }
            ]
          },
          columns: ['id', 'title']
        }
      }
    };
    var controller = createController(gridSettings);
    expect(FilterFieldsStorage.isFilterSearchParamEmpty(gridSettings.component.settings.routing.paramsPrefix)).toBe(false);
  });


  it('fillFilterComponent', function() {
    let gridSettings = {
      component: {
        name: 'ue-grid',
        settings: {
          routing: {
            paramsPrefix: 'prefix'
          },
          dataSource: {
            standard: 'YiiSoft',
            transport: {
              url: '/rest/v1/news/categories'
            },
            fields: [
              {
                name: 'id',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'ID',
                    validators: [
                      {
                        type: 'number'
                      }
                    ]
                  }
                }
              },
              {
                name: 'title',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'Title'
                  }
                }
              },
              {
                name: 'type',
                component: {
                  name: 'ue-checkbox',
                  settings: {
                    values: [
                      'v1',
                      'v2',
                      'v3'
                    ]
                  }
                }
              },
              {
                name: 'fired',
                component: {
                  name: 'ue-checkbox',
                  settings: {
                    trueValue: 1,
                    falseValue: 0
                  }
                }
              },
              {
                name: 'created',
                component: {
                  name: 'ue-date',
                  settings: {
                    label: 'Created',
                    validators: [{
                      type: 'date',
                      format: 'DD.MM.YYYY'
                    }]
                  }
                }
              }
            ]
          },
          header: {
            toolbar: [
              {
                component: {
                  name: 'ue-filter'
                }
              }
            ]
          },
          columns: ['id', 'title']
        }
      }
    };
    var controller = createController(gridSettings);
    FilterFieldsStorage.fillFilterComponent(gridSettings.component.$id, { 
      'id': 5, 
      'title': 
      'Title1', 
      '>=created': '12.01.2007', 
      '<=created': '12.01.2012', 
      type: 'v1', 
      fired: 0 });
    expect(
      JSON.stringify(
        FilterFieldsStorage.calculate(
          gridSettings.component.$id,
          gridSettings.component.settings.routing.paramsPrefix
        )
      )
    )
      .toBe('{"id":5,"title":"%Title1%","type":"v1","fired":0,">=created":"12.01.2007","<=created":"12.01.2012"}');

    expect(
      JSON.stringify(
        FilterFieldsStorage.getFilterQueryObject(
          gridSettings.component.settings.routing.paramsPrefix
        )
      )
    )
      .toBe('{"id":5,"title":"%Title1%","type":"v1","fired":0,">=created":"12.01.2007","<=created":"12.01.2012"}');
  });

  it('getFilterObject', function() {
    let gridSettings = {
      component: {
        name: 'ue-grid',
        settings: {
          routing: {
            paramsPrefix: 'prefix'
          },
          dataSource: {
            standard: 'YiiSoft',
            transport: {
              url: '/rest/v1/news/categories'
            },
            fields: [
              {
                name: 'id',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'ID',
                    validators: [
                      {
                        type: 'number'
                      }
                    ]
                  }
                }
              },
              {
                name: 'title',
                component: {
                  name: 'ue-string',
                  settings: {
                    label: 'Title'
                  }
                }
              }
            ]
          },
          header: {
            toolbar: [
              {
                component: {
                  name: 'ue-filter'
                }
              }
            ]
          },
          columns: ['id', 'title']
        }
      }
    };
    var controller = createController(gridSettings);
    FilterFieldsStorage.fillFilterComponent(gridSettings.component.$id, { "id": 5, "title": "Title1" });
    expect(
      JSON.stringify(
        FilterFieldsStorage.getFilterObject(gridSettings.component.$id)
      )
    )
      .toBe('{"id":[{"operator":":value","value":5}],"title":[{"operator":"%:value%","value":"Title1"}]}');
  });

  it('convertFilterToString', function() {
    expect(
      JSON.stringify(
        JSON.parse(
          FilterFieldsStorage.convertFilterToString({
            "id": [
              {
                "operator": ":value",
                "value": 5
              }
            ],
            "title": [
              {
                "operator": "%:value%",
                "value": "Title1"
              }
            ]
          })
        )
      )
    )
      .toBe('{"id":5,"title":"%Title1%"}');
  });
});
