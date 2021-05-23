/**
 * Name: StoreAPI webserver V2.
 * 
 * Author: Simon Brisebois-Therrien.
 * Date: 2021/05/19
 * Version: 2.0 Beta
 * 
 **/

#ifndef StoreAPIlibc_hpp
#define StoreAPIlibc_hpp

// Platform setup
#ifdef _WIN32
#define _WIN32_WINNT 0x0601
#endif

// Constant definition
#define PORT 9898

// General includes.
#include <stdio.h>

// Project specific includes.
#include "Networking/StoreAPIlibc-networking.hpp"

#endif