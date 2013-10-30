<?php

//Generate an AES key and insert it here.
//This key will be used for initial encryption by the client and decryption by this server
$AESkey = "INSERT AES KEY HERE";
 
//Generate another random string and insert it here.
//This string will be your companies salt. It is vital that this key is kept PRIVATE!!
$Salt = "INSERT COMPANY SALT HERE";





//For each user, paste their personal "keyword" in the array underneath.
//The personal keyword is generated for each user by using a SHA1 encryption of:
//         personalusername:personalpassword

$users = array(
    "INSERT SHA 1 OF PERSONALUSERNAME:PERSONALPASSWORD STRING HERE", //user 1
    "INSERT SHA 1 OF PERSONALUSERNAME:PERSONALPASSWORD STRING HERE", //user 2
    "INSERT SHA 1 OF PERSONALUSERNAME:PERSONALPASSWORD STRING HERE", //user 3
    "INSERT SHA 1 OF PERSONALUSERNAME:PERSONALPASSWORD STRING HERE", //user 4
    //...
)

?>