// Code for the View Location page.
//Initialization for darkskyapi key
let darkskyKey = "2c77a60439e098bc3275785c006485eb";
//parsing/getting storage keys
let locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation");
let locationkeyRet = localStorage.getItem(LOCATION_KEY);
let locationparseRet = JSON.parse(locationkeyRet);
let cacheLocationKey = localStorage.getItem(LOCATION_CACHE_KEY);
let cacheParse = JSON.parse(cacheLocationKey);
let retCrop = localStorage.getItem(STORAGE_KEY);
let retParseCrop = JSON.parse(retCrop);
//Initialize for userinput
let dayinput = document.getElementById("day");
let monthinput = document.getElementById("month");
let yearinput = document.getElementById("year");
//getting current date / today
let dateArray = [];
let currentDate = new Date();
dateArray[0] = parseInt(currentDate.getDate());
dateArray[1] = parseInt(currentDate.getMonth() + 1);
dateArray[2] = parseInt(currentDate.getFullYear());
//other initialization of variables
let leapyear = false;
let defaultVal = false;
let selectedCoordinate,date,tempMin,tempMax,weatherSummary,icon,currentTemp,userTimeStamp,monthLength,showseason,day,year,month;


//check if key val is not null
if (locationIndex !== null)
{
  //get location Name (city and country)
  let locationName = locationparseRet[locationIndex]._city + ", " + locationparseRet[locationIndex]._country;
  //store into headerBarTitle
  document.getElementById("headerBarTitle").textContent = locationName;

  //checking for nickname
  //if no nickname given
  if (locationparseRet[locationIndex]._nickname=== "")
  {
    document.getElementById("nick").innerText = "There's no nickname !";
  }
  else
  {
    //if nickname given
    document.getElementById("nick").innerText = locationparseRet[locationIndex]._nickname;
  }
  //retrieving coordinates for map
  selectedCoordinate = [locationparseRet[locationIndex]._mapcoordinate[0],locationparseRet[locationIndex]._mapcoordinate[1]];
}


printfromLocal();

function printfromLocal()
{
  //initialization
  let count =0;
  //if locationcache doesnt have anything stored
  if (cacheParse == null){
    //call function
    userInputcheck();
  }
  else
  {
    //if locationcache have something stored
    for (let j=0;j<cacheParse.length;j++)
    {
      //check if location coordinates and date is the same as stored in local storage
      if ((cacheParse[j]._locations[0]===selectedCoordinate[0]) && (cacheParse[j]._locations[1]===selectedCoordinate[1]) && (cacheParse[j]._date[0]===dateArray[0]) && (cacheParse[j]._date[1]===dateArray[1]) && (cacheParse[j]._date[2]===dateArray[2]))
      {
        //print the data instead of calling darkskyapi key
        let outputArea = document.getElementById("updateData");
        let output = "";
        output += "<h6> Date: "+ cacheParse[j]._date[0] +"/"+ cacheParse[j]._date[1]+"/"+ cacheParse[j]._date[2];
        output += "<h6>Current Weather: </h6>";
        output += "<img src=\"images/"+cacheParse[j]._icon+".png\">";
        output += "<h6>Weather Summary: </h6>"+cacheParse[j]._weatherInfo;
        output += "<h6>Data Table: </h6>";
        output += "<table class=\"mdl-data-table mdl-js-data-table\"><thead><tr>";
        output += "<th class=\"mdl-data-table__cell--non-numeric\">Current Temperature (&#8451;)</th>";
        output += "<th class=\"mdl-data-table__cell--non-numeric\">Minumum Temperature (&#8451;)</th>";
        output += "<th class=\"mdl-data-table__cell--non-numeric\">Maximum Temperature (&#8451;)</th></tr></thead><tbody><tr>";
        output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ cacheParse[j]._currentTemp + "</td>";
        output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ cacheParse[j]._temperature[0] + "</td>";
        output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ cacheParse[j]._temperature[1] + "</td>";

        outputArea.innerHTML = output;
        checkSeason();
      }
      else
      {
        //if data not match, increase count by 1
      count++;
      }
    }
    //if check storage and dont have the data, call function
    if (cacheParse.length==count)
    {
      userInputcheck();
    }
  }
}

//function to check if user have input any data.
function userInputcheck()
{
  //if no userinput
  if (dayinput.value === "" || monthinput.value === "" || yearinput.value ==="")
  {
    //call the currentDate's api key
    defaultVal = true;
    defaultPrint();
  }
  else
  {
    //call function
    defaultVal = false;
    dataCheck();
  }
}

//function to check valid date
function dataCheck()
{
  //default days in each months every year
  monthLength = [31,28,31,30,31,30,31,31,30,31,30,31];

  //checking for leap year
  if (yearinput.value % 400 === 0 || (yearinput.value % 100 !== 0 && yearinput % 4 == 0))
  {
    //if is leap year, february have 29 days
    leapyear = true;
    monthLength[1]=29;
  }
  //if leap year
  if (leapyear === true)
  {
    //checking valid date input
    if (yearinput.length === 4 && monthinput.value>0 && monthinput.value <13 && dayinput.value>0 && dayinput.value<monthLength[monthinput])
    {
      //call function
      dateValidation();
    }
    else
    {
      //send alert message date dont exist
      alert("Invalid Date!")
    }
  }
  //if not leap year
  if (leapyear === false)
  {
    //checking valid date input
    if ((yearinput.value.length) === 4 && (monthinput.value>0 && monthinput.value <13) && (dayinput.value>0 && dayinput.value<=monthLength[monthinput.value-1]))
    {
      //call function
      dateValidation();
    }
    else
    {
      //send alert message date dont exist
      alert("Invalid Date!")
    }
  }
}

//function to check if data is valid from 365 days
function dateValidation()
{
  //initialization
  //getting today's date and user input's date
  //changing it into timestamp and compare
  let today = new Date();
  let getTimeStamp = Math.floor(today.getTime()/1000);
  let validDate = getTimeStamp-31536000;
  let userDate = new Date(yearinput.value,monthinput.value-1,dayinput.value)
  userTimeStamp = Math.floor(userDate.getTime()/1000);

  //if user input is valid from 365s ago
  if (userTimeStamp >= validDate)
  {
    //call function
    userValPrint();
  }
  else
  {
    //invalid date prompt error message
    alert("Date must be from the last 12 months only!")
  }
}

//function for apikey
function defaultPrint()
{
  //getting url from darksky for today's date
  let geturl = "https://api.darksky.net/forecast/" + darkskyKey + "/" + locationparseRet[locationIndex]._mapcoordinate[1] + "," + locationparseRet[locationIndex]._mapcoordinate[0] + "?exclude=currently%2Cminutely%2Calert%2Cflags&units=si&callback=\"retWeatherData\"";
  let script = document.createElement('script');
  script.src = geturl;
  document.body.appendChild(script);
}

//function for apikey
function userValPrint()
{
  //getting url from darksky for user input's date
  let geturl = "https://api.darksky.net/forecast/" + darkskyKey + "/" + locationparseRet[locationIndex]._mapcoordinate[1] + "," + locationparseRet[locationIndex]._mapcoordinate[0] + "%2C"+ userTimeStamp+"?exclude=currently%2Cminutely%2Calert%2Cflags&units=si&callback=\"retWeatherData\"";
  let script = document.createElement('script');
  script.src = geturl;
  document.body.appendChild(script);
}

//callback function for apikey
function retWeatherData(data)
{
  //retrieving data from darkskyapi
  currentTemp = data.hourly.data[0].temperature;
  tempMin = data.daily.data[0].temperatureMin;
  tempMax = data.daily.data[0].temperatureMax;
  weatherSummary = data.daily.data[0].summary;
  icon = data.daily.data[0].icon;

  if (defaultVal === true)
  {
    //if no user input, use today's date
    currentDate = new Date();
    day = parseInt(currentDate.getDate());
    month = parseInt(currentDate.getMonth()+1);
    year = parseInt(currentDate.getFullYear());
    //call function
    storeLocationCache();
  }
  else
  {
    //if user input date, user this data
    day = parseInt(dayinput.value);
    month = parseInt(monthinput.value);
    year = parseInt(yearinput.value);
    storeLocationCache();
  }
  //call functions
  checkSeason();
  printCurrentData();
}

//function to print data
function printCurrentData()
{
  let outputArea = document.getElementById("updateData");
  let output = "";
  output += "<h6> Date: "+ day+"/"+month+"/"+year;
  output += "<h6>Current Weather: </h6>";
  output += "<img src=\"images/"+icon+".png\">";
  output += "<h6>Weather Summary: </h6>"+weatherSummary;
  output += "<h6>Data Table: </h6>";
  output += "<table class=\"mdl-data-table mdl-js-data-table\"><thead><tr>";
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Current Temperature (&#8451;)</th>";
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Minumum Temperature (&#8451;)</th>";
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Maximum Temperature (&#8451;)</th></tr></thead><tbody><tr>";
  output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ currentTemp + "</td>";
  output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ tempMin + "</td>";
  output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ tempMax + "</td>";

  outputArea.innerHTML = output;
}

//function to store into LocationWeatherCache
function storeLocationCache()
{
  //initialization
  //getting storage key and parsing has been declared //check initialization
  let longitudeVal = locationparseRet[locationIndex]._mapcoordinate[0];
  let latitudeVal = locationparseRet[locationIndex]._mapcoordinate[1];
  //store data
  let cacheInstance = new LocationWeatherCache(longitudeVal,latitudeVal,day,month,year,weatherSummary,tempMin,tempMax,currentTemp,icon);

  //if nothing stored in local storage
  if (cacheParse === null)
  {
    //create array to store
    cacheParse=[];
    cacheParse.push(cacheInstance);
    localStorage.setItem(LOCATION_CACHE_KEY,JSON.stringify(cacheParse));
  }
  //there's data in localstorage
  else if (cacheParse !== null)
  {
    //storing data into array
    cacheParse.push(cacheInstance);
    localStorage.setItem(LOCATION_CACHE_KEY,JSON.stringify(cacheParse));
  }
}

//function to check crop's season
function checkSeason()
{
  //initialization
  let outputArea = document.getElementById("seasondata");
  let output = "";
  let seasonGet = false;

  if (monthinput.value =="")
  {
    month = parseInt(currentDate.getMonth()+1);
  }
  else{
    month = parseInt(monthinput.value);
  }
  //based on Australia's season
  //December, January, February = summer
  if (month ===1 || month === 2 || month === 12)
  {
    showseason = "Summer";
  }
  //March, April, May = autumn
  if (month >= 3 && month <= 5)
  {
    showseason = "Autumn";
  }
  //June, July, August = winter
  if (month >=6 && month <=8)
  {
    showseason = "Winter";
  }
  //September, October, November = spring
  if (month >= 9 && month <=11)
  {
    showseason = "Spring";
  }
  //message to show available from in selected season
  output += "<h6>Crop(s) available in "+showseason+" : </h6>";

  //retParseCrop = parsed crop storage key // check initialization
  for (let i=0;i<retParseCrop.length;i++)
  {
    //if season selected matches
    if (showseason == retParseCrop[i]._season)
    {
      //get value from constructor
      let minsafe = parseFloat(retParseCrop[i]._safeTempRange[0]);
      let maxsafe = parseFloat(retParseCrop[i]._safeTempRange[1]);
      let offset = parseFloat(retParseCrop[i]._lowYieldOffset);
      let tolerance = parseInt(retParseCrop[i]._tolerance);
      //initialization
      let degreepass,survivalday,degreepassMin,degreepassMax;
      seasonGet = true;

      //printing output
      output += "<table class=\"mdl-data-table mdl-js-data-table\"><tr>";
      output += "<th class=\"mdl-data-table__cell--non-numeric\">Crop Name</th>";
      output += "<th class=\"mdl-data-table__cell--non-numeric\">Minumum Safe Temperature Range (&#8451;)</th>";
      output += "<th class=\"mdl-data-table__cell--non-numeric\">Maximum Safe Temperature Range (&#8451;)</th></tr>";
      output += "<tr><td class=\"mdl-data-table__cell--non-numeric\">"+ retParseCrop[i]._name + "</td>";
      output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ retParseCrop[i]._safeTempRange[0] + "</td>";
      output += "<td class=\"mdl-data-table__cell--non-numeric\">"+ retParseCrop[i]._safeTempRange[1] + "</td></tr>";

      //both in safe Range
      if ((tempMin>minsafe) && (tempMax<maxsafe))
      {
        output += "<tr><th>Estimation of effect of weather on crop : </th>"
        output +=  "<th>"+ retParseCrop[i]._name + " will have high yield.</th><th> </th></tr><br>";
      }
      //both in low yield and save range
      else if ((tempMin>(minsafe-offset+1)) && (tempMax<(maxsafe+offset-1)))
      {
        output += "<tr><th>Estimation of effect of weather on crop : </th>"
        output +=  "<th>"+ retParseCrop[i]._name + " will survive but have low yield.</th><th> </th></tr><br>";
      }
      //exceed min safe temp
      else if ((tempMin<(minsafe-offset)) && (tempMax<(maxsafe+offset-1)))
      {
        degreepass = (minsafe - offset)-currentTemp;
        survivalday = (tolerance)/(degreepass+1);
        survivalday = survivalday.toFixed(2);
        output += "<tr><th>Estimation of effect of weather on crop : </th>"
        output +=  "<th>"+ retParseCrop[i]._name + " will perish after "+Math.abs(survivalday)+" days. </th><th> </th></tr><br>";
      }
      //exceed max safe temp
      else if ((tempMin>(minsafe-offset+1)) && (tempMax>(maxsafe+offset)))
      {
        degreepass = currentTemp-(maxsafe+offset);
        survivalday = (tolerance)/(degreepass+1);
        survivalday = survivalday.toFixed(2);
        output += "<tr><th>Estimation of effect of weather on crop : </th>"
        output +=  "<th>"+ retParseCrop[i]._name + " will perish after "+Math.abs(survivalday)+" days. </th><th> </th></tr><br>";
      }
      //exceed both min and max safe temp
      else if ((tempMin<(minsafe-offset)) && (tempMax>(maxsafe+offset)))
      {
        degreepassMin = Math.abs((minsafe - offset)-currentTemp);
        degreepassMax = Math.abs(currentTemp-(maxsafe+offset));
        //get value that have larger degree difference
        //if min diff > max diff
        if (degreepassMin>degreepassMax)
        {
          survivalday = (tolerance)/(degreepassMin+1);
          survivalday = survivalday.toFixed(2);
        }
        //if max diff > min diff
        else
        {
          survivalday = (tolerance)/(degreepassMax+1);
          survivalday = survivalday.toFixed(2);
        }
        //print output
        output += "<tr><th>Estimation of effect of weather on crop : </th>"
        output +=  "<th>"+ retParseCrop[i]._name + " will perish after "+Math.abs(survivalday)+" days. </th><th> </th></tr><br>";
      }
    }
    outputArea.innerHTML = output;
  }

  //if no available crop in current season
  if (seasonGet === false)
  {
    //change output display on html and prompt alert message
    output = "<h6>Crop(s) available in season: "+" None"+"</h6>";
    alert("There are currently no crops added in this season!")
    outputArea.innerHTML = output;
  }
}

//delete location if selected
function deleteLocation()
{
  //initialization
  let locationNum = Number(locationIndex);
  let retrieveLocationKey = localStorage.getItem(LOCATION_KEY);
  let locationObj = JSON.parse(retrieveLocationKey);
  let locationArray = [];
  locationArray = locationObj;

  //if local storage is empty
  if (locationObj === null)
  {
    //prompt alert msg
    alert("There is no location to be removed!");
  }
  else
  {
    //if user select yes
    if (confirm("Delete location?"))
    {
      //check array length
      for (let k=0; k < locationObj.length; k++)
      {
        let newLocationArray = new Location();
        newLocationArray.initialiseFromLocationPDO(locationArray[k]);

        //if user select exist in array and on that array
        if(locationNum === k)
        {
          //delete the location
          locationArray.splice(locationNum, 1);
          localStorage.setItem(LOCATION_KEY, JSON.stringify(locationArray));
        }
      }
    }
    else
    {
      alert("No location has been removed.");
    }
  }
  //back to index.html
  location.href = 'index.html';
}
