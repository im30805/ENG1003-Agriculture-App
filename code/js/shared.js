// Code for LocationWeatherCache class and other shared code.
//declaring all const
const STORAGE_KEY= "Crop";
const LOCATION_KEY = "Location";
const LOCATION_CACHE_KEY = "LocationWeatherCache";
var APP_PREFIX = "weatherApp";

//create location class
class Location
{
  //constructor with parameters
  constructor(city,country,nickname,lng,lat)
  {
    this._city = city;
    this._country = country;
    this._nickname = nickname;
    this._mapcoordinate = [lng,lat];
  }
  //setter and getters
  set city(newCity)
  {
    if (this._city === "")
    {
      alert("Please enter City Name!")
    }
    else
    {
      this._city = newCity;
    }
  }

  get city()
  {
    return this._city;
  }

  set country(newCountry)
  {
    this._country = country;
  }

  get country()
  {
    if (this._country === "")
    {
      alert("Please enter Country Name!")
    }
    else
    {
      return this._country;
    }
  }

  set nickname(newNickname)
  {
    if (this._nickname === null)
    {
      this._nickname = "";
    }
    else
    {
      this._nickname = newNickname;
    }
  }

  get nickname()
  {
    return this._nickname;
  }

  set lng(newlng)
  {
    this._mapcoordinate[0]= newlng;
  }

  get lng()
  {
    return this._mapcoordinate[0];
  }

  set lat(newlat)
  {
    this._mapcoordinate[1]= newlat;
  }

  get lat()
  {
    return this._mapcoordinate[1];
  }

  //intializer
  initialiseFromLocationPDO(locationPDO)
  {
    this._city = locationPDO._city;
    this._country = locationPDO._country;
    this._nickname = locationPDO._nickname;
    this._mapcoordinate = [locationPDO._mapcoordinate[0],locationPDO._mapcoordinate[1]];
  }
}

//create crop class
class Crop
{
  //constructor with parameters
  constructor(name,season,mintemp,maxtemp,lowYieldOffset,tolerance)
  {
    this._name= name;
    this._season= season;
    this._safeTempRange = [mintemp,maxtemp];
    this._lowYieldOffset= lowYieldOffset;
    this._tolerance= tolerance;
  }
  //setter and getters
  set name(newName)
  {
    this._name=newName;
  }

  get name()
  {
    return this._name;
  }

  set season(newSeason)
  {
    if (newSeason >= 1 && newSeason <= 4)
        {
            this._season = newSeason;
        }
  }

  get season()
  {
    return this._season;
  }

  set mintemp(newmintemp)
  {
    this._safeTempRange[0]= newmintemp;
  }

  get mintemp()
  {
    return this._safeTempRange[0];
  }

  set maxtemp(newmaxtemp)
  {
    this._safeTempRange[1]= newmaxtemp;
  }

  get maxtemp()
  {
    return this._safeTempRange[1];
  }

  set lowYieldOffset(newlowYieldOffset)
  {
    this._lowYieldOffset = newlowYieldOffset;
  }

  get lowYieldOffset()
  {
    return this._lowYieldOffset;
  }

  set tolerance(newtolerance)
  {
    this._tolerance = newtolerance;
  }

  get tolerance()
  {
    return this._tolerance;
  }

  //initializer
  initialiseFromCropPDO(cropPDO)
  {
    this._name= cropPDO._name;
    this._season= cropPDO._season;
    this._safeTempRange = [cropPDO._safeTempRange[0],cropPDO._safeTempRange[1]];
    this._lowYieldOffset= cropPDO._lowYieldOffset;
    this._tolerance= cropPDO._tolerance;
  }
}

//create location weather cache class
class LocationWeatherCache
{
  //constructor with parameters
  constructor(longitude,latitude,day,month,year,weatherInfo,minimumTemp,maximumTemp,currentTemp,icon)
  {
    this._locations = [longitude,latitude];
    this._date = [day,month,year];
    this._weatherInfo = weatherInfo;
    this._temperature = [minimumTemp,maximumTemp];
    this._currentTemp = currentTemp;
    this._icon = icon;
  }
  //setter and getters
  set longitude(newLongitude)
  {
    this._locations[0] = newLongitude;
  }

  get longitude()
  {
    return this._locations[0];
  }

  set latitude(newlatitude)
  {
    this._locations[1] = newlatitude;
  }

  get latitude()
  {
    return this._locations[1];
  }

  set day(newDay)
  {
    this._date[0] = newDay;
  }

  get day()
  {
    return this._date[0];
  }

  set month(newMonth)
  {
    this._date[1] = newMonth;
  }

  get month()
  {
    return this._date[1];
  }

  set year(newYear)
  {
    this._date[2] = newYear;
  }

  get year()
  {
    return this._date[2];
  }

  set weatherInfo(newWeatherInfo)
  {
    this._weatherInfo = newWeatherInfo;
  }

  get weatherInfo()
  {
    return this._weatherInfo;
  }

  set minimumTemp(newMinimumTemp)
  {
    this._temperature[0] = newMinimumTemp;
  }

  get minimumTemp()
  {
    return this._temperature[0];
  }

  set maximumTemp(newMaximumTemp)
  {
    this._temperature[1] = newMaximumTemp;
  }

  get maximumTemp()
  {
    return this._temperature[1];
  }

  set currentTemp(newcurrentTemp)
  {
    this._currentTemp = newcurrentTemp;
  }

  get currentTemp()
  {
    return this._currentTemp;
  }

  set icon(newicon)
  {
    this._icon = newicon;
  }

  get icon()
  {
    return this._icon;
  }

  //initializer
  initialiseFromCachePDO(cachePDO)
  {
    this._locations = [cachePDO._locations[0],cachePDO._locations[1]];
    this._date = [cachePDO._date[0],cachePDO._date[1],cachePDO._date[2]];
    this._weatherInfo = cachePDO._weatherInfo;
    this._temperature = [cachePDO._temperature[0],cachePDO._temperature[1]];
    this._currentTemp = cachePDO._currentTemp;
    this._icon = cachePDO._icon;
  }
}
