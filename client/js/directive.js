todoApp.directive('timelineAnimation', function(){
  return {
    restrict: 'A',
    link: function(scope, elem){
      function isAlreadyShow(el) {    
        var viewTop = $(window).scrollTop(),
            viewBottom = viewTop + window.innerHeight,
            _top = el.offset().top,
            _bottom = _top + el.height();
        return ((_top <= viewBottom) && (_bottom >= viewTop));
      }

      var e = angular.element(elem);

      if(isAlreadyShow(elem)) {
        elem.addClass('no-animation');
      }

      angular.element(window).on('scroll', function(){
        if (isAlreadyShow(elem)) {
          elem.addClass('fade-in-animation');
        }
        scope.$apply(); 
      });     

    }
  };
});