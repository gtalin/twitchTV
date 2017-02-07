userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

baseUrl = "https://wind-bow.gomix.me/twitch-api/users/";
//Sample url: "https://wind-bow.gomix.me/twitch-api/users/noobs2ninjas?"
var url;
for (var i=0;i<userNames.length;i++) {
  url = baseUrl + userNames[i] + "?";
  $.getJSON(url, processData);
}


function processData(data) {
  console.log(data);
  var baseLink = "https://www.twitch.tv/";
  var name = data["display_name"];
  var logo = data["logo"];
  var link = baseLink + data["name"];
  //var status = 
  
  var parent = document.getElementById("parent");
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
  
  
  var statusUrl = "https://wind-bow.gomix.me/twitch-api/streams/"+data["name"];
  console.log(statusUrl);
  var status = "Online";
  $.getJSON(statusUrl, function(data) {
    if (data["stream"] == null)
      status = "Offline";
    var domStatus = document.createElement("p");
  domStatus.textContent = status;
  domStatus.className = "status";
   item.append(domStatus); 
    //Appending to parent
  parent.append(item);
  });
  
  
}