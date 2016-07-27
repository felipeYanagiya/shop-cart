#!/bin/bash

npm install -g parse-server mongodb-runner &&
mongodb-runner start &&
parse-server --appId web-cart --masterKey master123 --databaseURI mongodb://localhost/cart
