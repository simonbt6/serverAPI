#ifndef ProductRoutes_hpp
#define ProductRoutes_hpp

#include "Route.hpp"

namespace StoreAPI
{
    class ProductRoute : public Route
    {
        private:
            char *_name = "products";
            
        public:
            virtual void Go(struct mg_connection *c, char **params);
    };
}

#endif