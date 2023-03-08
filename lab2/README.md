## Instructions

The executable is in /application folder. To run the application you can type in console `cd application` and `bash go2web [arguments]` or `./webscraper [argumetns]` on linux.

You can get the response from a website with `bash go2web -u url` which accepts html or json. Then parses it to be human readable. This operation also handles redirects up to 5 times.

You can search the top 10 duckduckgo results for a query using `bash go2web -s query_string`. The first 10 result links are listed.

You can open any of the results from the last query in browser using `bash go2web -sa nr` where nr is from 1 to 10