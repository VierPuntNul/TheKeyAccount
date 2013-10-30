<?php
//Include general config file
include("config.php");
$authenticated = false; //by default you're not authenticated and authorized to view the salt


//Include AES class for AES decription and make easy accessible functions for it
include("aes.php");

function aes_encrypt($plaintext,$key){
    return AesCtr::encrypt($plaintext, $key, 256);
}
function aes_decrypt($ciphertext,$key){
    return AesCtr::decrypt($ciphertext, $key, 256);
}


//if a key is present, handle it. Else, do nothing
if( isset($_POST['key']) )
{
    //decrypt the key using the AESkey from the config file
    $aesencrkey = $_POST['key'];
    $decryptedkey = aes_decrypt($aesencrkey,$AESkey);
    
    //split the key into a shaword and a timestamp
    $parts = explode(":", $decryptedkey);
    $shaword = $parts[0];
    $timestamp = $parts[1];
    
    //for each user in the config file, check if it's name matches the shaword.
    //if so: make authenticated true
    foreach($users as $user){
      if($shaword == $user){
          $authenticated = true;
      }
    }
    
    //if authenticated at this point, return the (encrypted) salt
    if($authenticated == true){
        //encrypt the salt with AES using the timestamp from the post.
        //json encode and send.
        $encodedSalt = aes_encrypt($Salt, $timestamp);
        $json["data"] = $encodedSalt;
        echo json_encode($json);
    }else{
        echo json_encode("not authenticated!");
    }
    
}else{
    echo json_encode("no key entered");
}

?>
