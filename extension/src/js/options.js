                document.onload = init();
                        
                        function init(){
                                restoreOptions();          
                        }
                        
                        function restoreOptions() {
                                var url = localStorage["url"];
                                var encryptionpass = localStorage["encryptionpass"];
                                var serviceusername = localStorage["serviceusername"];
                                var personalusername = localStorage["personalusername"];
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
                        
                        document.querySelector('#submit').addEventListener('click', saveOptions);
                        
                        function saveOptions() {
                          
                          var url = document.getElementById("url-field").value;
                          var encryptionpass = document.getElementById("encryptionpass-field").value;
                          var serviceusername = document.getElementById("serviceusername-field").value;
                          var personalusername = document.getElementById("personalusername-field").value;
                          
                          localStorage["url"] = url;
                          localStorage["encryptionpass"] = encryptionpass;
                          localStorage["serviceusername"] = serviceusername;
                          localStorage["personalusername"] = personalusername;

                          //document.getElementById("status").innerHTML = "Saved!";
                          
                          //window.alert("saved");
                          
                          self.close();
                        }