from html.parser import HTMLParser

class ScraperHTMLParser(HTMLParser):
    def handle_starttag(self, tag: str, attrs):
        #print([tag, attrs])
        
        for name, value in attrs:
            if name == "src":
                print([name, value])


        return super().handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str):
        #print(tag)
        
        
        return super().handle_endtag(tag)

    def handle_data(self, data: str):
        #print(data)
        
        
        return super().handle_data(data)

    