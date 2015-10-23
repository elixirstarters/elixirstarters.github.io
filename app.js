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

  $scope.timeAgo = function(datetime) {
    unix = Date.parse(datetime);
    unixDate = new Date(unix);

    return $scope.timeSince(unixDate);
  };

  $scope.timeSince = function(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

}]);
    
