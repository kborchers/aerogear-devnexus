'use strict';

describe('Controller: TwitterCtrl', function() {

  // load the controller's module
  beforeEach(module('aerogearDevnexusApp'));

  var TwitterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    TwitterCtrl = $controller('TwitterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
