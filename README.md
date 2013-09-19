avatar-face-server
==================

This is the code behind the receiving and serving up of face images for avatars to be run on a data server.

# Setup #
server requires node.js, supervisor, upstart, and http-server. An install script might look something like this:
```bash
#check for sudo, if not exit

#install node.js
sudo apt-get install node

#install http-server
sudo npm install http-server -g

#install supervisor 

#install upstart (or assume already installed)

#copy supervisor script to /etc/init/avatar-face-server-supervisor.conf
sudo cp ...something.../setup/avatar-face-server-supervisor.conf /etc/init/avatar-face-server-supervisor.conf
```

## In ##
Face images from the app are also sent to the server. These are sent using a http POST message and accepted by a node.js server. Currently this is not set up automatically, but can be started using the startserver.sh script. I hope to fix this soon.

## Out ##
Face image GET requests are processed by another node.js server which is not yet built (as of 2013-09-19). It will probably have similar config to the 2nd server, and may be based on one of the tools mentioned [here](http://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http).
