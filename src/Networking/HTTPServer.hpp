#ifndef HTTPServer_hpp
#define HTTPServer_hpp

extern "C"
{
    #include "mongoose.h"
}
#include "Routes/StoreAPIlibc-routes.hpp"
#include <vector>
#include <iostream>
#pragma comment(lib, "ws2_32.lib") /* Linking with winsock library */
#pragma comment(lib, "advapi32.lib")  /* the newly added */

namespace StoreAPI
{
    class HTTPServer
    {
        private:
            int _port = 9898;
            char *_address = "http://localhost:8000";
            char *_dir;

            std::vector<Route> _routes;

            struct mg_mgr _mgr;

            

            static HTTPServer *_instance;

        public:
            void listen();

            static void requestHandler(struct mg_connection *c, int ev, void *ev_data, void *fn_data);

            static void PRINT(const char *text);

            static HTTPServer *get_instance();

            Route findRoute(char *name);

            void addRoute(Route route);

            void loadRoutes();

            HTTPServer(int port, char *address, char *dir);
    };
}

#endif