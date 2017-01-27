(function () {
    'use strict';

    angular
        .module('demoApp')
        .controller('NewsGridController', NewsGridController);

    NewsGridController.$inject = [];

    function NewsGridController() {
        var vm = this;
        var newsDataSource = {
            type: 'REST',
            url: '//universal-backend.dev/rest/v1/news',
            sortBy: '-id',
            primaryKey: 'id',
            parentField: 'parent_id',
            fields: [
                {
                    name: 'published',
                    component: {
                        name: 'ue-checkbox',
                        settings: {
                            label: 'Published',
                            trueValue: 1,
                            falseValue: 0
                        }
                    }
                },
                {
                    name: 'published_at',
                    component: {
                        name: 'ue-date',
                        settings: {
                            label: 'Publication date'
                        }
                    }
                },
                {
                    name: 'category_id',
                    component: {
                        name: 'ue-dropdown',
                        settings: {
                            label: 'Category',
                            valuesRemote: {
                                fields: {
                                    value: 'id',
                                    label: 'name',
                                    parent: 'parent_id',
                                    childCount: 'child_count'
                                },
                                url: 'http://universal-backend.dev/rest/v1/staff'
                            },
                            search: true,
                            tree: true,
                            selectBranches: true
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
                    name: 'description',
                    component: {
                        name: 'ue-textarea',
                        settings: {
                            label: 'Text'
                        }
                    }
                },
                {
                    name: 'authors',
                    component: {
                        name: 'ue-autocomplete',
                        settings: {
                            label: 'Authors',
                            valuesRemote: {
                                fields: {
                                    value: 'id',
                                    label: 'name'
                                },
                                url: 'http://universal-backend.dev/rest/v1/staff'
                            },
                            multiple: false,
                            expandable: true,
                            multiname: 'staff_id'
                        }
                    }
                },
                {
                    name: 'tags',
                    component: {
                        name: 'ue-autocomplete',
                        settings: {
                            label: 'Tags',
                            valuesRemote: {
                                fields: {
                                    value: 'id',
                                    label: 'name'
                                },
                                url: 'http://universal-backend.dev/rest/v1/tags'
                            },
                            multiple: false,
                            expandable: true
                        }
                    }
                },
                {
                    name: 'created_at',
                    component: {
                        name: 'ue-date',
                        settings: {
                            label: 'Created'
                        }
                    }
                },
                {
                    name: 'updated_at',
                    component: {
                        name: 'ue-date',
                        settings: {
                            label: 'Updated'
                        }
                    }
                }
            ]
        };
        
        vm.ueConfig = {
            component: {
                name: 'ue-grid',
                settings: {
                    dataSource: newsDataSource,
                    header: {
                        toolbar: [
                            {
                                component: {
                                    name: 'ue-button-link',
                                    settings: {
                                        label: 'Add news',
                                        state: 'news_edit'
                                    }
                                }
                            }
                        ]
                    },
                    columns: ['title', 'authors', 'published_at', 'published'],
                    contextMenu: [
                        {
                            component: {
                                name: 'ue-button-link',
                                settings: {
                                    label: 'Edit',
                                    state: 'news_edit'
                                }
                            }
                        },
                        {
                            separator: true,
                            component: {
                                name: 'ue-button-service',
                                settings: {
                                    label: 'Delete',
                                    action: 'delete'
                                }
                            }
                        }
                    ],
                    footer: {
                        controls: [
                            {
                                component: {
                                    name: 'ue-pagination',
                                    settings: {
                                        label: {
                                            last: '>>',
                                            next: '>'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        };
    }
})();
