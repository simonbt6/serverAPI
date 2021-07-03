import _thread
import time
import os
from lib.AmazonCA import AmazonCA

domains = [
    "amazon.com",
    "amazon.ca",
    "ebay.com",
    "ebay.com"
    ]

# Determine link source
def determineSource(url):
    if not type(url) == str:
        return
    for domain in domains:
        if domain in str(url):
            return domain
    return None

AmazonCA()
