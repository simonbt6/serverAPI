#include "StoreAPIlibc.hpp"

#include <iostream>

#include "Networking/HTTPServer.hpp"

int main()
{
    StoreAPI::HTTPServer server(9898, "http://localhost:9898", ".");
    server.listen();
    return 0;    
}