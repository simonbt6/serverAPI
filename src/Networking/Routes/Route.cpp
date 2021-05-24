#include "Route.hpp"

void StoreAPI::Route::Go(struct mg_connection *c, char **params)
{
    mg_http_reply(c, 300, "", "ERROR, PLEASE CONTACT SERVER OWNER.");
}