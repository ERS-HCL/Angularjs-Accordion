angular.module('Accordion', [])
            .directive('accordion', function() {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    template: '<div data-ng-transclude=""></div>',
                    controller: function() {
                        var Panels = [];
                        this.gotOpened = function(selected_panel) {
                            angular.forEach(Panels, function(panel) {
                                if (selected_panel != panel)
                                    panel.openMe = false;
                            });
                        };
                        this.addPanel = function(panel) {
                            Panels.push(panel);
                        };
                    }
                };
            })
            .directive('accordionPanel', function() {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    require: '^accordion',
                    scope: {
                        title: '@panelTitle'
                    },
                    template: '<div>' +
                        '<div class="title" data-ng-click="toggle()">{{title}}</div>' +
                        '<div class="body" data-ng-show="openMe"  data-ng-transclude=""></div>' +
                        '</div>',
                    link: function(scope, element, attrs, accordionController) {
                        scope.openMe = false;
                        accordionController.addPanel(scope);
                        scope.toggle = function() {
                            scope.openMe = !scope.openMe;
                            accordionController.gotOpened(scope);
                        };
                    }
                }
            })
            .controller('MainController', function($scope) {
				
            });