#include "HTTPServer.hpp"

namespace StoreAPI
{
    HTTPServer::HTTPServer(int port, char *address, char *dir)
    {
        _port = port;
        _address = address;
        _dir = dir;

        mg_log_set("2");
        mg_mgr_init(&_mgr);

        loadRoutes();
    }

    void HTTPServer::requestHandler(struct mg_connection *c, int ev, void *ev_data, void *fn_data)
    {
        if (ev == MG_EV_HTTP_MSG)
        {
            struct mg_http_message *hm = (struct mg_http_message *) ev_data;
            
            PRINT(hm->uri.ptr);
            
            Route route = get_instance()->findRoute("products");

            route.Go(c, NULL);
            /**
             * if (mg_http_match_uri(hm, "/api/f1"))
            {
                mg_http_reply(c, 200, "", "{\"results\": %d}\n", 123);
            }
            else if (mg_http_match_uri(hm, "/api/f2/*"))
            {
                mg_http_reply(c, 200, "", "{\"results\": \"%.*s\"}\n", (int) hm->uri.len, hm->uri.ptr);
            }
            else
            {
                struct mg_http_serve_opts opts = {"."};
                mg_http_serve_dir(c, hm, &opts);
            }
            */
        }
        (void) requestHandler;
    }

    void HTTPServer::PRINT(const char *text)
    {
        std::cout << "\n" << text << "\n";
    }

    void HTTPServer::listen()
    {
        mg_http_listen(&_mgr, _address, requestHandler, NULL);
        for (;;) mg_mgr_poll(&_mgr, 1000);
        mg_mgr_free(&_mgr);
    }

    void HTTPServer::addRoute(Route route)
    {
        _routes.push_back(route);
    }

    Route HTTPServer::findRoute(char *name)
    {
        for(Route route : _routes)
        {
            if (route.get_name() == name) return route;
        }
        return BadRoute();
    }

    void HTTPServer::loadRoutes()
    {
        addRoute(ProductRoute());
    }

    HTTPServer *HTTPServer::get_instance()
    {
        if(_instance == NULL || (typeid(&_instance).name() != typeid(HTTPServer).name()))
        {
            _instance = &HTTPServer(9898, "http://localhost:9898", ".");
        }
        return _instance;
    }
}