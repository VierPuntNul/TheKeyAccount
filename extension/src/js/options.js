//Run the initial script on page load.
document.onload = restoreOptions();

//Make a listener that acts when someone clicks the submit button
document.querySelector('#submit').addEventListener('click', saveOptions);




/****************************************************************/
/*                                                              */
/*    Helper functions that actually do all the work...         */
/*                                                              */
/****************************************************************/

//Run the initial script that restores the options
function restoreOptions() {
        
        //Get everything from localStorage and put in in variables.
        var url = localStorage["url"];
        var encryptionpass = localStorage["encryptionpass"];
	var serviceusername = localStorage["serviceusername"];
	var personalusername = localStorage["personalusername"];
        
        //So if those vars are not empty, put them in the input fields
	if(url != null && encryptionpass != null){
		document.getElementById("url-field").value = url;
		document.getElementById("encryptionpass-field").value = encryptionpass;
	}
	if(serviceusername != null){
		document.getElementById("serviceusername-field").value = serviceusername;
	}
	if(personalusername != null){
		document.getElementById("personalusername-field").value = personalusername;
	}
}

//Save the options to the localStorage
function saveOptions(){
        
        //Put inputfield values in variables
        var url = document.getElementById("url-field").value;
        var encryptionpass = document.getElementById("encryptionpass-field").value;
	var serviceusername = document.getElementById("serviceusername-field").value;
	var personalusername = document.getElementById("personalusername-field").value;
        
        //Store variables in localStorage
	localStorage["url"] = url;
	localStorage["encryptionpass"] = encryptionpass;
	localStorage["serviceusername"] = serviceusername;
	localStorage["personalusername"] = personalusername;  
	self.close();
}