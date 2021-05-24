# Author: Simon Brisebois-Therrien
# Date: 2021-05-22
#
# Description: Makefile for x64 compilation.

.PHONY: compile

compile:
	cl /o bin/test.exe src/test.cpp src/Networking/HTTPServer.cpp src/Networking/mongoose.c src/Networking/Routes/ProductRoutes.cpp src/Networking/Routes/404Route.cpp src/Networking/Routes/Route.cpp  /EHsc 