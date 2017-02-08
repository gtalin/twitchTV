userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var data2Display={};
var statusVal = {};
var calls = [];
baseUrl = "https://wind-bow.gomix.me/twitch-api/users/";
//Sample url: "https://wind-bow.gomix.me/twitch-api/users/noobs2ninjas?"
var url;
for (var i=0;i<userNames.length;i++) {
  url = baseUrl + userNames[i] + "?";
  calls.push(//passing key to outer function becuase else problem with case of key with name and user_name for received data
    $.getJSON(url, (function(key) {return function(data) {data2Display[key] = processData(data)}})(userNames[i])
             )
    )
  calls.push(
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+userNames[i], 
              (function(key) {
    return function(data) {statusVal[key] = statusData(data); console.log(statusVal)}})(userNames[i])
             )
    )
}

//using deferred variable so that we have data2Display variable before we display items.
//we need data2Display variable as opposed to displaying objects as they are downloaded because we need to be able to filter data as per it's streaming status. Else in processData function we could've just added one row at a time (as we got the data).

//In the then function we can make use of data ajaxed from the links.
$.when.apply($,calls).then(function(){
  console.log("Consolidated data", JSON.stringify(data2Display));
  console.log("Consolidated status", JSON.stringify(status));
  displayData(data2Display,statusVal);
});


function processData(data) {
  console.log("in processData", data["name"]);
  //var key = data["name"];
  var key = data["display_name"];//data["name"] some problem with case of name. It's affecting the keys of data2Display and status
  var baseLink = "https://www.twitch.tv/";
  var name = data["display_name"];
  var logo = data["logo"];
  var link = baseLink + data["name"];
  
  return {name: name, logo: logo, link: link};
  //var status = 
  
  /*var parent = document.getElementById("parent");
  //Create row
  var item = document.createElement("li");
  item.className = "item";
  //Create elements for rows
  //var pLogo = document.createElement("p");
   //pLogo.className = "logo";
  var domLogo = document.createElement("img");
  domLogo.alt = "Logo";
  domLogo.src = logo;
  //pLogo.append(domLogo);
 
  var pName = document.createElement("p");
  var domName = document.createElement("a");
  domName.text = name;
  domName.href = link;
  pName.className = "name";
  pName.append(domName);
  
  //Add elements
  item.append(domLogo);
  item.append(pName);
  */
}

function statusData (data) {
  //var statusUrl = "https://wind-bow.gomix.me/twitch-api/streams/"+data["name"];
  //console.log(statusUrl);
  //we could've used a flag and just used one object to keep all data
  console.log("In status fn");
  var status;  
  if (data["stream"] == null)
    status = "Offline";
  else status = data["stream"]["game"];//+data["stream"]["status"];
  console.log("status is", status)
  return status;
}


function displayData(data,status,selection) {
  if (selection == undefined) selection = "all";
  //filter based on status
  //Display elements
  var container = document.getElementById("container");
  var parent = document.createElement("ul");
  parent.className = "parent"
  for (var key in data) {
    console.log("key", key);  
    console.log("Elusive", data[key], status[key]);
    //Create row
    var item = document.createElement("li");
    item.className = "item";
    
    //for logo
    var domLogo = document.createElement("img");
    domLogo.alt = "Logo";
    domLogo.src = data[key]["logo"];
    //pLogo.append(domLogo);
    
    //for display name and twitch tv url
    var pName = document.createElement("p");
    var domName = document.createElement("a");
    domName.text = data[key]["name"];
    domName.href = data[key]["link"];
    pName.className = "name";
    pName.appendChild(domName);

    
    //For status
    var domStatus = document.createElement("p");
    console.log(status[key]);
    domStatus.textContent = status[key];
    domStatus.className = "status";
     
    //Appending to parent
    //Add elements
    item.appendChild(domLogo);
    item.appendChild(pName);
    item.appendChild(domStatus); 
    parent.appendChild(item);
    
  }
  container.appendChild(parent);
}
