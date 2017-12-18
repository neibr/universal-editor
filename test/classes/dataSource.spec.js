

import DataSource from '../../src/module/classes/dataSource.js';
(function() {
  'use strict';
  describe('DataSource class tests', function() {
    let options = {
      standard: 'YiiSoft',
      sortBy: {
        id: 'desc'
      },
      parentField: 'parent_id',
      keys: {
        items: 'items',
        meta: '_meta'
      },
      transport: {
        url: '//universal-backend.dev/rest/v1/staff',
        read: {
          url: '//universal-backend.dev/rest/v1/staff',
          headers: function() {
            return {};
          },
          params: function() {
            return { expand: 'field', params: 'p' };
          },
          data: function() {
            return { data: 'field' };
          },
          method: 'GET',
          handlers: {
            before: function(config, e) {
              console.log('Before handler!');
            },
            error: function(reject) {
              console.log('Error handler!');
            },
            success: function(response) {
              console.log('Success handler!');
            },
            complete: function() {
              console.log('Complete handler!');
            }
          }
        },
        one: {
          url: '//universal-backend.dev/rest/v1/staff/:id',
          headers: function() {
            return {};
          },
          params: function() {
            return { expand: 'field', params: 'p' };
          },
          data: function() {
            return { data: 'field' };
          },
          method: 'GET',
          handlers: {
            before: function(config) {
              console.log('Before handler!');
            },
            error: function(reject) {
              console.log('Error handler!');
            },
            success: function(response) {
              console.log('Success handler!');
            },
            complete: function() {
              console.log('Complete handler!');
            }
          }
        }
      },

      fields: [
        {
          name: 'name',
          component: {
            name: 'ue-string',
            settings: {
              label: 'Name'
            }
          }
        }
      ]
    };
    it('setting url', function() {
      let dataSource = new DataSource(options);
      expect(dataSource.url).toEqual(options.transport.url);
    });

    it('default primaryKey', function() {
      let dataSource = new DataSource(options);
      expect(dataSource.primaryKey).toEqual('id');
    });

    it('method getURL', function() {
      let options, dataSource, result;
      options = {
        transport: {
          read: {
            url: '//universal-backend.dev/'
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getURL('read')).toEqual(options.transport.read.url);

      options = {
        transport: {
          read: {
            url: (a) => '//universal-backend.dev/' + a.postfix
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getURL('read', { postfix: 'list' })).toEqual('//universal-backend.dev/list');

      options = {
        transport: {
          read: {
            url: '//universal-backend.dev/:param1/:param2'
          }
        }
      };
      dataSource = new DataSource(options);
      result = dataSource.getURL('read', { param1: 'p1', param2: 'p2' });
      expect(result).toEqual('//universal-backend.dev/p1/p2');

      options = {
        primaryKey: 'primaryKey',
        transport: {
          url: '//universal-backend.dev'
        }
      };
      dataSource = new DataSource(options);
      result = dataSource.getURL('read');
      expect(result).toEqual('//universal-backend.dev');
      result = dataSource.getURL('create');
      expect(result).toEqual('//universal-backend.dev');
      result = dataSource.getURL('update', { primaryKey: '5' });
      expect(result).toEqual('//universal-backend.dev/5');
      result = dataSource.getURL('delete', { primaryKey: '5' });
      expect(result).toEqual('//universal-backend.dev/5');
    });

    it('method getHandlers', function() {
      let options, dataSource, result;

      options = {
        transport: {
          read: {
            handlers: {
              before: () => 'beforeHnadler'
            }
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getHandlers('read').before()).toEqual('beforeHnadler');
    });


    it('method getMethod', function() {
      let options, dataSource, result;
      options = {
        transport: {
          read: {
            method: 'GET'
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getMethod('read')).toEqual('GET');

      options = {
        transport: {
          read: { },
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getMethod('read')).toEqual('GET');
      expect(dataSource.getMethod('create')).toEqual('POST');
      expect(dataSource.getMethod('update')).toEqual('PUT');
      expect(dataSource.getMethod('delete')).toEqual('DELETE');
    });

    it('method getParams', function() {
      let options, dataSource, result;
      options = {
        transport: {
          read: {
            params: (entity) => ({
              p1: 'v1',
              entity_id: 111
            })
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getParams('read').p1).toEqual('v1');
      expect(dataSource.getParams('read').entity_id).toEqual(111);
      expect($.isEmptyObject(dataSource.getParams('create'))).toBe(true);
    });

    it('method getData', function() {
      let options, dataSource, result;
      options = {
        transport: {
          read: {
            data: (entity) => ({
              p1: 'v1',
              entity_id: 111
            })
          }
        }
      };
      dataSource = new DataSource(options);
      expect(dataSource.getData('read').p1).toEqual('v1');
      expect(dataSource.getData('read').entity_id).toEqual(111);
      expect($.isEmptyObject(dataSource.getData('create'))).toBe(true);
    });
  });
})();