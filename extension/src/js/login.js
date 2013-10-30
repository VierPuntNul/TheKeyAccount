//url = localStorage["url"];
//encryptionpass = localStorage["encryptionpass"];
//serviceusername = localStorage["serviceusername"];
//personalusername = localStorage["personalusername"];
//
//url = "https://uhasselt-wifi.uhasselt.be/cgi-bin/login";
//data = "user="+name+"&password="+pass+"&cmd=authenticate&login=Log In";

//document.getElementById("main").innerHTML = "Logging in on the network!";

//window.alert(data);
//loadXMLDoc();
//response;

init();

document.querySelector('#submit').addEventListener('click', submitForm);


if (document.layers) {
  document.captureEvents(Event.KEYDOWN);
}

document.onkeydown = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
    // For Enter.
    // Your function here.
    document.getElementById('submit').click();
  }
  else {
    return true;
  }
};

function submitForm(){
    personalusername = document.getElementById("personalusername-field").value;
    personalpassword = document.getElementById("personalpass-field").value;
    
    var xmlhttp;
    if (window.XMLHttpRequest){
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
    else{
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    
    
    var keyword = personalusername + ":" + personalpassword;
    keyword = CryptoJS.SHA1(keyword);
    timestamp = Math.round(new Date().getTime() / 1000);
    
    keywordAndTimestamp = keyword + ":" + timestamp;
    encryptionpass = localStorage["encryptionpass"];
    theKey = Aes.Ctr.encrypt(keywordAndTimestamp, encryptionpass, 256);
    theKey = encodeURIComponent(theKey); //convert + signs to %2B
    data = "key=" + theKey;
    xmlhttp.open("POST", localStorage["url"], true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = JSON.parse(xmlhttp.responseText);
            
            handleResponse(response, timestamp);
            self.close();
        }
    }
}

function handleResponse(response, timestamp){
    if(response == "not authenticated!"){
        window.alert("You are: " + response);
    }else{            
        constructPassword(response.data, timestamp);
    }
}

function constructPassword(data, timestamp){
    timestamp = JSON.stringify(timestamp); //just serialize and convert to string;
    salt = Aes.Ctr.decrypt(data, timestamp, 256);
 
    shaofuname = CryptoJS.SHA1(document.getElementById("serviceusername-field").value);
    shaofdomain = CryptoJS.SHA1(document.getElementById("domain-field").value);
    
    passbase = shaofuname + shaofdomain + salt;
    servicepass = CryptoJS.SHA1(passbase);
    
    document.getElementById("servicepass").value = servicepass;
    copy();
    
}

function copy() {

    //Get Input Element
    var copyDiv = document.getElementById('servicepass');

    //Give the text element focus
    copyDiv.focus();

    //Select all content
    document.execCommand('SelectAll');

    //Copy Content
    document.execCommand("Copy", false, null);
}

function init(){
    chrome.tabs.getSelected(null, function(tab) {
	tabId = tab.id;
	tabUrl = tab.url;
        tabDomain = tabUrl.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
        document.getElementById("domain-field").value = tabDomain;

        document.getElementById("serviceusername-field").value = localStorage["serviceusername"];
        document.getElementById("personalusername-field").value = localStorage["personalusername"];
        document.getElementById("personalpass-field").focus();
    });
}
                
function loadXMLDoc(){
    
    xmlhttp.open("POST",url,false);
    //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    //document.getElementById("main").innerHTML = "Logged In!";
    //document.getElementById("main").innerHTML = xmlhttp.responseText;
    //response = xmlhttp.responseText;
    //console.log(response);
}
