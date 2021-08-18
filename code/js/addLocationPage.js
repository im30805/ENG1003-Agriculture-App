// Code for the Add Location page.

//put map and set default center
//access token
mapboxgl.accessToken = 'pk.eyJ1IjoiemlsaW5nOTgiLCJhIjoiY2p1MjQxNDU5MDhncjN5bnowaXcwcjVoOSJ9.EKPLCNEhWkY-RcWsZYreWw';
let map =new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    zoom: 12,
    center: [145.119550, -37.926210]
  });

//initialization of variable
let locationdata = [];
let cityRef,countryRef,nicknameRef,lat,long;

//function to jsonrequest
function jsonpRequest(city,country)
{
  let encodedCity = encodeURIComponent(city);
  let encodedCountry = encodeURIComponent(country);
  let url = "http://open.mapquestapi.com/geocoding/v1/address?key=EAWKgqOqQeaYQjwfxtAbRURkdR9z86jx&location=" + encodedCity + ", " + encodedCountry + "&callback=displayLocation";
  let script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

//call back for jsonrequest
function displayLocation(map)
{
  lat = map.results[0].locations[0].latLng.lat;
  long = map.results[0].locations[0].latLng.lng;
  let coord = [long,lat];
  let newLocation = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 12,
      center: coord
    });

  //popup msg for location details
  let popup = new mapboxgl.Popup()
    .setLngLat(coord)
    .setHTML(cityRef+", "+countryRef)
    .addTo(newLocation);
  //pin marker on the location
  let marker = new mapboxgl.Marker()
    .setLngLat(coord)
    .addTo(newLocation);
}

//function to get data user key in
function getValue()
{
  cityRef = document.getElementById("city").value;
  countryRef = document.getElementById("country").value;
  nicknameRef = document.getElementById("nickName").value;
  //call jsonrequest
  jsonpRequest(cityRef,countryRef);
  //after getting value a button appears
  document.getElementById('button2').style.display = 'block';
}

//function to store location data into local storage
function storeLocation()
{
  //store data into class
  let locationInstance = new Location(cityRef,countryRef,nicknameRef,long,lat);
  //check if local storage available
  if (typeof(Storage) !== "undefined")
  {
    //confirmation
    let yes = confirm("Save location and return to main page?");
    //if user select yes
    if (yes === true)
    {
      //now get key and store data into local storage
      let getLocationKey = localStorage.getItem(LOCATION_KEY);
      let getLocationObj = JSON.parse(getLocationKey);
      locationdata = getLocationObj;
      locationdata.push(locationInstance);
      localStorage.setItem(LOCATION_KEY,JSON.stringify(locationdata));
      //return to index.html
      location.href="index.html";
    }
    else
    {
      //do nothing
    }
  }
  else
  {
    console.log("Error: localStorage is not supported by current browser.");
  }
}
