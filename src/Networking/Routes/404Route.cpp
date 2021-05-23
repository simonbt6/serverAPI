#include "404Route.hpp"

void StoreAPI::BadRoute::Go(struct mg_connection *c, char **params)
{
    mg_http_reply(c, 404, "", "Bad gateway.");
}