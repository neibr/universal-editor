describe('EditEntityStorage tests ', function() {
  let EditEntityStorage, ApiService, $timeout, $rootScope, createController, $controller, $compile;
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
    EditEntityStorage = $injector.get('EditEntityStorage');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $compile = $injector.get('$compile');
    ApiService = $injector.get('ApiService');
    $timeout = $injector.get('$timeout');

    createController = function(settings) {
      var scope, element;
      scope = $rootScope.$new();
      scope.setting = settings;
      element = $compile('<component-wrapper setting="setting"></component-wrapper>')(scope);
      scope.$digest();
      return element.isolateScope();
    };
  }));

  it('getComponentBySetting', function() {
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-dropdown',
                settings: {
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);
    expect(EditEntityStorage.getComponentBySetting('list').fieldName).toBe('list');
  });

  it('getChildFieldComponents and deleteFieldController', function() {
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-autocomplete',
                settings: {
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);

    /** ue-autocomplete, ue-button, ue-button, ue-button*/
    expect(EditEntityStorage.getChildFieldComponents('form').length).toBe(4);
    controller.$destroy();
    expect(EditEntityStorage.getChildFieldComponents('form').length).toBe(0);
  });

  it('constructOutputValue', function() {
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'string.field',
              component: {
                name: 'ue-string',
                settings: {
                  defaultValue: 'value',
                }
              }
            },
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-autocomplete',
                settings: {
                  defaultValue: 1,
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);

    expect(JSON.stringify(EditEntityStorage.constructOutputValue({
      $componentId: formSettings.component.$id
    })))
      .toBe(JSON.stringify({
        string: {
          field: 'value'
        },
        list: 1
      }));
  });

  it('editEntityPresave', function() {
    let request = {
      $componentId: 'form',
      isError: false
    }
    let presaveMethod = spyOn(ApiService, 'presaveItem');
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'string.field',
              component: {
                name: 'ue-string',
                $id: 'field_string_id',
                settings: {
                }
              }
            },
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-autocomplete',
                settings: {
                  defaultValue: 1,
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);
    EditEntityStorage.editEntityPresave(request);
    expect(presaveMethod).toHaveBeenCalledWith(request);

    $rootScope.$broadcast('ue:componentError', {
      $componentId: 'form',
      data: [
        {
          field: 'string.field',
          message: 'Error'
        }
      ]
    });
    request = {
      $componentId: 'form',
      isError: false
    }

    EditEntityStorage.editEntityPresave(request);
    expect(presaveMethod).not.toHaveBeenCalledWith(request);
  });

  it('editEntityUpdate', function() {
    let addMethod = spyOn(ApiService, 'addNewItem');
    let updateMethod = spyOn(ApiService, 'updateItem');
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'string.field',
              component: {
                name: 'ue-string',
                $id: 'field_string_id',
                settings: {
                }
              }
            },
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-autocomplete',
                settings: {
                  defaultValue: 1,
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);

    let request = {
      $componentId: 'form',
      isError: false
    }
    EditEntityStorage.editEntityUpdate('create', request);
    expect(addMethod).toHaveBeenCalledWith(request);

    request = {
      $componentId: 'form',
      isError: false
    }
    EditEntityStorage.editEntityUpdate('update', request);
    expect(updateMethod).toHaveBeenCalledWith(request);

    $rootScope.$broadcast('ue:componentError', {
      $componentId: 'form',
      data: [
        {
          field: 'string.field',
          message: 'Error'
        }
      ]
    });
    request = {
      $componentId: 'form',
      isError: false
    }


    EditEntityStorage.editEntityUpdate('create', request);
    EditEntityStorage.editEntityUpdate('update', request);

    expect(addMethod).not.toHaveBeenCalledWith(request);
    expect(updateMethod).not.toHaveBeenCalledWith(request);
  });

  it('updateComponents', function() {
    let formSettings = {
      component: {
        name: 'ue-form',
        $id: 'form',
        settings: {
          dataSource: false,
          body: [
            {
              name: 'string.field',
              component: {
                name: 'ue-string',
                settings: {
                  defaultValue: 'value',
                }
              }
            },
            {
              name: 'list',
              component: {
                $id: 'list',
                name: 'ue-autocomplete',
                settings: {
                  defaultValue: 1,
                  valuesRemote: {
                    fields: {
                      value: 'id',
                      label: 'title'
                    },
                    url: '/rest/v1/news/categories'
                  }
                }
              }
            }
          ]
        }
      }
    };
    var controller = createController(formSettings);


    spyOn($rootScope, '$broadcast');
    EditEntityStorage.updateComponents(formSettings.component.$id);

    let eventObj = EditEntityStorage.constructOutputValue({ $componentId: formSettings.component.$id }, true);
    eventObj.$componentId = formSettings.component.$id;

    expect($rootScope.$broadcast).toHaveBeenCalledWith(
      'ue:componentValueChanged',
      eventObj
    );
  });
});
