'use strict';

describe('Controller: NavControllerCtrl', function() {

  // load the controller's module
  beforeEach(module('aerogearDevnexusApp'));

  var NavControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    NavControllerCtrl = $controller('NavControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
