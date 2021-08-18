// Code for the main app page (locations list).

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewLocation.html';
}

//call function
printCrop();
printLocation();

//function to add default crops
function displayGivenCrops()
{
  //crop data
  let addCorn = new Crop("Corn","Summer",10,35,5,10);
  let addTomatoes = new Crop("Tomatoes","Summer",15,45,4,2);
  let addLeeks = new Crop("Leeks","Winter",3,17,2,20);
  let addWheat = new Crop("Wheat","Spring",18,41,20,15);
  //adding all existing crops into an array
  let givenCropArray = [addCorn,addTomatoes,addLeeks,addWheat];
  //get key and parse
  let getCrop = localStorage.getItem(STORAGE_KEY);
  let getCropObject= JSON.parse(getCrop);

  //storage dont have any crop data stored yet
  if (getCropObject===null)
  {
    //check local storage exist
    if (typeof(Storage) !== "undefined")
    {
      //chg obj to string and store
      let getCropString= JSON.stringify(givenCropArray);
      localStorage.setItem(STORAGE_KEY, getCropString);
    }
    else
    {
     console.log("Error: localStorage is not supported by current browser.");
    }
  }
}

//function to add default locations
function displayGivenLocation()
{
  //location data
  let addlocation1= new Location("Kuala Lumpur","Malaysia","KL",101.713636,3.154687);
  let addlocation2= new Location("Clayton","Australia","VIC",145.129272,-37.915047);
  //add to aray
  let locationarray = [addlocation1,addlocation2];
  //get key and parse
  let getLocation = localStorage.getItem(LOCATION_KEY);
  let getLocationObject= JSON.parse(getLocation);

  //storage dont have any crop data stored yet
  if (getLocationObject===null)
  {
    //check local storage exist
    if (typeof(Storage) !== "undefined")
    {
      //chg obj to string and store
      let getLocationString= JSON.stringify(locationarray);
      localStorage.setItem(LOCATION_KEY, getLocationString);
    }
    else
    {
      console.log("Error: localStorage is not supported by current browser.");
    }
  }
}

//print the default location
function printLocation()
{
  //call function
  displayGivenLocation();
  //initialization of variables
  let outputRef = document.getElementById("displayLocation");
  let outputHTML = "";
  //retrieves key and parse string
  let retrieveLocationKey = localStorage.getItem(LOCATION_KEY);
  let locationObj = JSON.parse(retrieveLocationKey);
  let locationArray = [];
  locationArray = locationObj;
  //if nothing in local storage
  if (locationObj === null)
  {
    //print in html
    outputHTML += "There are currently no location added!";
  }
  else
  {
    //checking the localstorage
    for (let j=0;j<locationObj.length;j++)
    {
      let newLocationArray = new Location();
      //reinitialise from PDO as it loses its properties
      newLocationArray.initialiseFromLocationPDO(locationObj[j]);
      //print
      outputHTML += "<span class=\"mdl-chip mdl-chip--contact\" onclick=\"viewLocation("+j+");\">";
      outputHTML += "<img class=\"mdl-chip__contact\" src=\"images/1146290.png\"></img>";
      outputHTML += "<span class=\"mdl-chip__text\">"+newLocationArray.city +", "+newLocationArray.country+"</span></span><br><br>";
    }
  }
  //print output in html
  outputRef.innerHTML=outputHTML;
}

//print default crop
function printCrop()
{
  //call function
  displayGivenCrops();
  //initialization of variables
  let outputRef = document.getElementById("displayCrop");
  let outputHTML = "";
  //retrieves key and parse string
  let retrieveCropKey = localStorage.getItem(STORAGE_KEY);
  let cropObj = JSON.parse(retrieveCropKey);
  let cropArray = [];
  cropArray = cropObj;
  //if nothing in local storage
  if (cropObj === null)
  {
    outputHTML += "There are currently no crop added!";
  }
  else
  {
    //checking the localstorage
    for (let k=0;k<cropObj.length;k++){
    let newCropArray = new Crop();
    //reinitialise from PDO as it loses its properties
    newCropArray.initialiseFromCropPDO(cropObj[k]);
    // outputHTML += "<li class=\"mdl-list__item mdl-list__item--one-line\" onclick=\"deleteCrop("+k+");\">";
    // outputHTML += "<span>"+ newCropArray.name +"</span>";
    outputHTML += "<span class=\"mdl-chip mdl-chip--contact\" onclick=\"deleteCrop("+k+");\">";
    outputHTML += "<img class=\"mdl-chip__contact\" src=\"images/water-can-watering-plant-icon-filled-line-flat-vector-22675743.jpg\"></img>";
    outputHTML += "<span class=\"mdl-chip__text\">"+newCropArray.name+"</span></span><br><br>";
    }
  }
  outputRef.innerHTML = outputHTML;
}

//function to delete crop
function deleteCrop(cropIndex)
{
  //get key and parse string
  let retrieveCropKey = localStorage.getItem(STORAGE_KEY);
  let cropObj = JSON.parse(retrieveCropKey);
  let cropArray = [];
  cropArray = cropObj;

  //if no crop in storage
  if(cropObj === null)
  {
    //prompt alert message
    alert("There is no crop to be removed!");
  }
  else
  {
    //if user press remove crop, prompt confirm message
    if(confirm("Remove crop?"))
    {
      //check length of crop in storage
      for (let k=0;k<cropObj.length;k++)
      {
        let newCropArray = new Crop();
        //reinitialise from PDO as it loses its properties
        newCropArray.initialiseFromCropPDO(cropArray[k]);
        //if selected crop data is in localstorage
        if(cropIndex === k)
        {
          //delete the specific array
          cropArray.splice(cropIndex, 1);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cropArray));
        }
      }
    }
    else
    {
      //prompt alert message
      alert("No crop has been removed.");
    }
  }
  //back to index.html
  location.href = 'index.html';
}
