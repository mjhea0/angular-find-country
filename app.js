var App = angular.module('angularCountry', []);

function myController($scope, $http){
  $scope.getInfo = function() {
    initialize();
    var address = 'http://restcountries.eu/rest/name/'+$scope.inputCountry;
    $http({method: 'GET', url: address}).
    success(function(data, status, headers, config) {
      $scope.country = data[0];
      findCountry(data[0]);
    });
  };
  $scope.$watch('inputCountry',function(newValue, oldValue){
    console.log('new',newValue)
    console.log('old',oldValue)
    if (newValue == oldValue) {
      alert('Changed !');
    }
  });
};

var map;
geocoder = new google.maps.Geocoder();

function initialize() {
  var latLng = new google.maps.LatLng(48.825183,2.1975769);
  var myOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    draggable: false,
    disableDoubleClickZoom: false,
    scrollwheel: false,
    zoom: 6,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP 
  };
  map = new google.maps.Map(document.getElementById("canvas"), myOptions);
};

function findCountry(country){
  geocoder.geocode( { 'address': country.name}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      console.log(country.name)
      console.log(results[0]);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log(status)
    }
  });
};
