// Code for the Add Crop page.
//initialization of variables
let checkData = false;
let cropArray = [];
let cropName_data,mintemp_data,maxtemp_data,lowyield_data,tolerance_data,season_data,val;

//function to check which season selected
function seasonselect()
{
  //detect user select
  let whichSeason = document.getElementsByName("seasons");

  //check for every season
  for (i=0;i<whichSeason.length;i++)
  {
    //store user selected checkbox's value into val
    if(whichSeason[i].checked)
    {
      val = whichSeason[i].value;
    }
  }
  //return the data
  return val;
}

//function to get user input's data
function checkUserInput()
{
  //getting each value entered by user
  cropName_data = document.getElementById("cropname").value;
  mintemp_data = document.getElementById("mintemp").value;
  maxtemp_data = document.getElementById("maxtemp").value;
  lowyield_data = document.getElementById("offset").value;
  tolerance_data = document.getElementById("tolerance").value;
  season_data = seasonselect();

  //check is any of the user input is empty and prompt msg
  if (cropName_data == "")
  {
    alert( "Please Enter A Crop Name!" );
    checkData= false;
  }

  if (mintemp_data == "")
  {
    alert( "Please Enter a Minimum Temperature Value!" );
    checkData= false;
  }

  if (maxtemp_data == "")
  {
    alert( "Please Enter a Maximum Temperature Value!" );
    checkData= false;
  }

  if (lowyield_data == "")
  {
    alert( "Please Enter a Value for Low Yield!" );
    checkData= false;
  }

  if (tolerance_data == "")
  {
    alert( "Please Enter a Value for Tolerance (Days)!" );
    checkData= false;
  }

  if ((mintemp_data !== "" && maxtemp_data !=="" )&&(mintemp_data>=maxtemp_data))
  {
    alert( "Minimum Temperature Value must be smaller than Maximum Temperature!");
  }

  if (lowyield_data !== "" && lowyield_data <= 0)
  {
    alert( "Low Yield value must be at least 1!" );
    checkData= false;
  }

  if (tolerance_data !== "" && tolerance_data<=0)
  {
    alert( "Tolerance(Days) value must be at least 1!");
    checkData= false;
  }

  //once all condition is fulfil and there's user input
  if (cropName_data !== "" && mintemp_data !== "" && maxtemp_data !== "" && lowyield_data !== "" &&tolerance_data !== "" && lowyield_data > 0 && tolerance_data>0 && maxtemp_data>mintemp_data)
  {
    checkData = true;
  }

}

//store crop into local storage
function storeCrops()
{
  //check first
  checkUserInput();
  //store data's value into class
  let cropInstance = new Crop(cropName_data,season_data,mintemp_data,maxtemp_data,lowyield_data,tolerance_data);
  //if condition meet
  if (checkData=true)
  {
    //check if there's localstorage in browser
    if (typeof(Storage) !== "undefined")
    {
      //get key and store
      let getCropKey = localStorage.getItem(STORAGE_KEY);
      let getCropObj = JSON.parse(getCropKey);
      cropArray = getCropObj;
      cropArray.push(cropInstance);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(cropArray));
    }
    else
    {
      console.log("Error: localStorage is not supported by current browser.");
    }
  }
  //back to index.html
  location.href="index.html";
}
