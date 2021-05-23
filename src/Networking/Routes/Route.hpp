#ifndef Route_hpp
#define Route_hpp

extern "C"
{
    #include "../mongoose.h"
}

namespace StoreAPI
{
    class Route
    {
        private:
            char *_name;

        public:
            char *get_name() { return _name; }
            virtual void Go(struct mg_connection *c, char **params);    
    
    };
}

#endif