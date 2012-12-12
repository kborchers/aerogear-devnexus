'use strict';

describe('Directive: jumpTo', function() {
  beforeEach(module('aerogearDevnexusApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<jump-to></jump-to>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the jumpTo directive');
  }));
});
