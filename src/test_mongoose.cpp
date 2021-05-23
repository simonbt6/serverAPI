extern "C"{
    #include "Networking/mongoose.h"
}

static const char *s_web_root_dir = ".";
static const char *s_listening_address = "http://localhost:8000";

static void cb(struct mg_connection *c, int ev, void *ev_data, void *fn_data)
{
    struct mg_http_serve_opts opts = {s_web_root_dir};

    printf("Serving dir .");
}

int main()
{
    struct mg_mgr mgr;

    mg_mgr_init(&mgr);

    mg_http_listen(&mgr, s_listening_address, cb, &mgr);
    for(;;) mg_mgr_poll(&mgr, 1000);
    mg_mgr_free(&mgr);
    return 0;
}