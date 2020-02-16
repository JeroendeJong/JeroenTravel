
# Travel Server

> NodeJS express driven server for all things travel. 
> This server supports the travel frontend as well as the travel admin portal.

This uses a docker database for all of its stuff from : `kartoza/postgis`.

##### To recreate database data:
1. Run all SQL scripts in the structure folder
2. ensure all functions and triggers exist
3. run all `table-data` files.


### Scrape

Currently the frontend is hosted purely on a static domain. This means essentially there is no place to host this server. 
That is why the scaper is created. This is a simple tool that can be used via :

```
$ node main.js
```

And will ensure all files are downloaded and stored in a `output` folder. When uploading the static frontend assets add these files in the `/cache` directory to ensure the frontend will work on GCP. 