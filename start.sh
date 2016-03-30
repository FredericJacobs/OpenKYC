#!/bin/sh

node api/index.js & cd web; webpack-dev-server --config webpack.hot.config.js && fg
