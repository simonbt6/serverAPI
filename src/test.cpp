#include "StoreAPIlibc.hpp"

#include <iostream>

#include "Networking/HTTPServer.hpp"

int main()
{
    StoreAPI::HTTPServer *server = StoreAPI::HTTPServer::get_instance();
    server->listen();
    return 0;    
}