#ifndef BadRoute_hpp
#define BadRoute_hpp

#include "Route.hpp"

namespace StoreAPI
{
    class BadRoute : public Route
    {
        private:
            char *name = "404";
        public:
            virtual void Go(struct mg_connection *c, char **params);
    };
}

#endif