todoApp.controller('TodoCtrl', function($rootScope, $scope, todosFactory) {
 
  $scope.todos = [];
  $scope.isEditable = [];
 
  // get all Todos on Load
  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
  });

  // check if object is in array
  function isInArray(input, array){
    var found = false;

    for(var i = 0; i < array.length; i++) {
      if(array[i].title.toLowerCase() === input.toLowerCase()) {
        found = true;
        break;
      }
    }
    return found;
  }

  // clear the todo input and details
  $scope.clear = function(){
    $scope.todoTitle = '';
    $scope.todoDetail = '';
    $scope.todoType = '';
    $scope.todoImage = '';
  };
 
  // Save a Todo to the server
  $scope.save = function() {
    var date = new Date().toString();

    if ($scope.todoTitle && $scope.todoType && !isInArray($scope.todoTitle, $scope.todos)) {
      $scope.hasError = false;
      $scope.errorMessage = '';
 
      todosFactory.saveTodo({
        "isCompleted": false,
        "title": $scope.todoTitle,
        "detail": $scope.todoDetail,
        "date": date,
        "type": $scope.todoType,
        "image": $scope.todoImage
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.todoTitle = '';
      $scope.todoDetail = '';
      $scope.todoType = '';
      $scope.todoImage = '';
    } else {
      $scope.hasError = true;
      if($scope.todoTitle === undefined) {
        $scope.errorMessage = 'Event Title can not be empty!';
      } else if($scope.todoType === undefined) {
        $scope.errorMessage = 'Event Type can not be empty!';
      } else if(isInArray($scope.todoTitle, $scope.todos)) {
        $scope.errorMessage = 'The event already exists!';
      }
    }
  };
 
  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var checked = $event.target.checked;
    var _t = $scope.todos[i];
    todosFactory.updateTodo({
      _id: _id,
      isCompleted: checked,
      title: _t.title,
      detail: _t.detail,
      date: _t.date,
      type: _t.type,
      image: _t.image
    }).then(function(data) {
      _t.isCompleted = checked;
    });
  };
 
  // Update the edited Todo
  $scope.edit = function(i) {
    var _t = $scope.todos[i];
    var updatedTitle = $('.todoUpdatedTitle')[i].value;
    var updatedDetail = $('.todoUpdatedDetail')[i].value;
    var updatedType = $('.todoUpdatedType')[i].value;
    todosFactory.updateTodo({
      _id: _t._id,
      isCompleted: _t.isCompleted,
      title: updatedTitle,
      detail: updatedDetail,
      date: _t.date,
      type: updatedType,
      image: _t.image
    }).then(function(data){
      $scope.isEditable[i] = false;
      _t.title = updatedTitle;
      _t.detail = updatedDetail;
      _t.type = updatedType;
    });
  };
 
  // Delete a Todo
  $scope.delete = function(i) {
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };
 
});

todoApp.controller('GalleryCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout) {

      var rootPath = '/image/gallery/';
      $scope.imageSrcList = [];

      function getImageSrc(data){
        var imageList = data.data;
        for(var i = 0; i < imageList.length; i++) {
          var imageSrc = rootPath + imageList[i];
          $scope.imageSrcList.push(imageSrc);
        }
      }

      function getError(){
        console.log('AJAX failed!');
      }

      $http.get(rootPath).then(getImageSrc, getError);           

}]);

todoApp.controller('TimelineCtrl', function($scope, todosFactory){
  $scope.timelineEvents = [];

  todosFactory.getTodos().then(function(data) {
    $scope.timelineEvents = data.data;
  });
});

todoApp.controller('AboutCtrl', function(){

});

