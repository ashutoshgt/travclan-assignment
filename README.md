# travclan-assignment

Try out on local:
1. Clone this repo
2. Instal docker desktop for your system if not already installed
3. Run `docker compose up`
    - This will start three containers on respective ports, hotel-api(8080), elasticsearch(9500) and kibana(5069)
    - The api will create and prepopulate a hotel index
    - The index is populated using 100 fictitious hotels with latitude and longitude inside delhi ncr bounding box, refer: https://bboxfinder.com/#28.428845,76.864471,28.872337,77.465973
    - Once you see messages like `Indexed hotel id: <some id>` in the logs of the hotel-api container, the api is ready to be queried
4. Examples using curl commands (You can also use the postman collection, checked in the repo):
    - Query w/o any params (returns 50 at max)
    ```
    curl -X GET 'http://localhost:8080/hotels' --header 'Accept: */*'
    ```
    - Query with the name param
    ```
    curl -X GET 'http://localhost:8080/hotels?name=effert' --header 'Accept: */*'
    ```
    - Query with the bounds params (actual hits are 956, returns only 10 by default)
    ```
    curl -X GET 'http://localhost:8080/hotels?name=effert&tl_lat=28.87&tl_lon=76.86&br_lat=28.42&br_lon=77.46' --header 'Accept: */*'
    ```
    - Query with incorrect bounds param
    ```
    curl -X GET 'http://localhost:8080/hotels?tl_lat=test&tl_lon=76.86&br_lat=28.42&br_lon=77.46' --header 'Accept: */*' \
    ```
    
