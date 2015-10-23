angular.module('exstarter', [])

.value("ghEndpoint", "https://api.github.com/search/issues?q=label:level:starter+language:elixir+state:open")
.controller("IssuesListController", ["$scope", "$http", "ghEndpoint", function($scope, $http, ghEndpoint){
  $http.get(ghEndpoint)
    .success(function(response) {
      $scope.total_issues = response.items.length;
      $scope.issues = response.items;
      console.log($scope.issues);
    })
    .error(function(err) {
      console.log(err);
    });

  $scope.repoName = function(html_url) {
    parts = html_url.split("/");
    return parts[3] + "/" + parts[4];
  };

  $scope.repoUrl = function(html_url) {
    return "https://github.com/" + $scope.repoName(html_url);
  };

}]);
    
