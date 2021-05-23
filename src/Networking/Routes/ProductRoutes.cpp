#include "ProductRoutes.hpp"

void StoreAPI::ProductRoute::Go(struct mg_connection *c, char **params)
{
    mg_http_reply(c, 200, "", "Product route.");
}