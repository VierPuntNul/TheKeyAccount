
//Run the init script
init();

//Add a listener for the submit button
document.querySelector('#submit').addEventListener('click', submitForm);


//Listen for the ENTER-key getting pressed
//If pressed, submit the form
if (document.layers) {
  document.captureEvents(Event.KEYDOWN);
}
document.onkeydown = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
    document.getElementById('submit').click();
  }
  else {
    return true;
  }
};










/****************************************************************/
/*                                                              */
/*    Helper functions that actually do all the work...         */
/*                                                              */
/****************************************************************/

//Init function.
function init(){
    
    //Get the current tab
    chrome.tabs.getSelected(null, function(tab) {
        //Get the url from the current tab, strip the domain & insert the domain in the html document
	tabUrl = tab.url;
        tabDomain = tabUrl.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
        document.getElementById("domain-field").value = tabDomain;

        //get the settings from the localStorage
        document.getElementById("serviceusername-field").value = localStorage["serviceusername"];
        document.getElementById("personalusername-field").value = localStorage["personalusername"];
        
        //set focus on the personalpass field (doesn't seem to work)
        document.getElementById("personalpass-field").focus();
    });
}

//Submit function
function submitForm(){
    //wrap the vars
    personalusername = document.getElementById("personalusername-field").value;
    personalpassword = document.getElementById("personalpass-field").value;
    
    //make an Ajax request
    var xmlhttp = new XMLHttpRequest();
    
    //Comment below.. Chrome only
    /*var xmlhttp;
    if (window.XMLHttpRequest){
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
    else{
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }*/

    
    //Construt the personal keyword
    var keyword = personalusername + ":" + personalpassword;
    keyword = CryptoJS.SHA1(keyword);
    
    //Add a timestamp
    timestamp = Math.round(new Date().getTime() / 1000);
    keywordAndTimestamp = keyword + ":" + timestamp;
    
    //AES Encrypt the keyword and timestamp with the default AES key from the options
    encryptionpass = localStorage["encryptionpass"];
    theKey = Aes.Ctr.encrypt(keywordAndTimestamp, encryptionpass, 256);
    theKey = encodeURIComponent(theKey); //convert + signs to %2B
    
    //Prepare the data and submit to the url from the options page
    data = "key=" + theKey;
    xmlhttp.open("POST", localStorage["url"], true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    
    //Wait until we've got a response
    //Handle the response
    //Close the window
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = JSON.parse(xmlhttp.responseText);
            
            handleResponse(response, timestamp);
            self.close();
        }
    }
}


//Response handling function
//if not authenticated, throw an alert, else generate the password for this service
function handleResponse(response, timestamp){
    if(response == "not authenticated!"){
        window.alert("You are: " + response);
    }else{            
        constructPassword(response.data, timestamp);
    }
}

//Password constructer function
function constructPassword(data, timestamp){
    //stringify the timestamp (timestamp is an object, chrome bitches if you want to encrypt/decrypt using objects as keys)
    //decrypt the salt with the timestamp
    timestamp = JSON.stringify(timestamp);
    salt = Aes.Ctr.decrypt(data, timestamp, 256);
 
    //Sha the default username and the domain
    shaofuname = CryptoJS.SHA1(document.getElementById("serviceusername-field").value);
    shaofdomain = CryptoJS.SHA1(document.getElementById("domain-field").value);
    
    //Create the key for the password and sha it to get the service pass
    passbase = shaofuname + shaofdomain + salt;
    servicepass = CryptoJS.SHA1(passbase);
    
    
    //Copy the service password to the clipboard using some hackerish tricks:
    //set the value of an invisible inputfield to the servicepass and copy that
    document.getElementById("servicepass").value = servicepass;
    copy();
    
}

//copy function
//copies the content of #servicepass to the clipboard.
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