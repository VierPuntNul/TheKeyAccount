TheKeyAccount
=============

A Customer Password Keeping Service that doesn't save passwords

##Installation of the Server-side

- Deploy server-side/src on a webserver
- Rename configsample.php to config.php
- Insert an AES key and a company Salt of your choice
- For each user enter a keyword

###Creating Keywords
For each user make a **SHA1** of their **"username:password"**. The result shall be their keyword

##Installing the WebApp
This remains ToDo.