avatar-face-server
==================

This is the code behind the receiving and serving up of face images for avatars to be run on a data server.


## In ##
Face images from the app are also sent to the server. These are sent using a http POST message and accepted by a node.js server. Currently this is not set up automatically, but can be started using the startserver.sh script. I hope to fix this soon.

## Out ##
Face image GET requests are processed by another node.js server which is not yet built (as of 2013-09-19). It will probably have similar config to the 2nd server, and may be based on one of the tools mentioned [here](http://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http).
