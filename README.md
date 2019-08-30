# Adventure Ahead
Adventure Ahead is an app that allows you to search for highlight places to visit in the cities around the world and add them to your Bucketlist. Also it allows you to prepare to pack the bags for your trip, with an ultimate Packing List. It uses Triposo API to facilitate the search features! Have Fun! <br>

<a href="https://github.com/YuliaKrimerman/adventure-ahead-server" target="_blank">Adventure Ahead API Repo</a><br>
<a href="https://github.com/YuliaKrimerman/adventure-ahead" target="_blank">Adventure Ahead Client Repo</a><br>
<a href="https://adventure-ahead.yuliakrimerman.now.sh" target="_blank">Live Adventure Ahead Application</a>


## <u>User-stories, Screenshots</u>
![user-storiess](https://user-images.githubusercontent.com/46899367/63277340-276d1a80-c273-11e9-8f79-5316d1cf251a.png)


## <Center>MVP </center>
#### Home page
![1111](https://user-images.githubusercontent.com/46899367/63277453-5d120380-c273-11e9-8ffe-1ba5698f4f8d.png)

#### Registration page (POST-/user)
![one](https://user-images.githubusercontent.com/46899367/63277780-f214fc80-c273-11e9-9b8b-346bac4dea96.png)

#### Login page (POST-/login)
![seven](https://user-images.githubusercontent.com/46899367/63641671-507d1900-c680-11e9-8b26-82c47e1036f9.png)
#### Search page (GET- Google Maps API,Triposo API)
![88](https://user-images.githubusercontent.com/46899367/63641676-612d8f00-c680-11e9-98d0-8ca11ceb1d33.png)
#### Results page (POST- /listTravel/:user_id/)
![99](https://user-images.githubusercontent.com/46899367/63641753-925a8f00-c681-11e9-849f-0bdeca9cb799.png)
#### Bucketlist ( GET, DELETE- /listTravel/:user_id/:id')
![three](https://user-images.githubusercontent.com/46899367/63277787-f6411a00-c273-11e9-962a-99c54ad0a072.png)
#### Packing List (GET-/packData/:user_id';PATCH- /packData/:user_id/:id')
![Untitledererer](https://user-images.githubusercontent.com/46899367/63641764-c33ac400-c681-11e9-9c2e-9ac67e83c529.png)



## Built with
  ### Front end
    -HTML
    -Javascript
    -React
    -CSS

  ### Back end
    -Node.js
    -Express.js
    -PostgreSQL
    -Mocha and Chai for testing

  ### 3rd Party API
  #### Triposo
  For issues or questions visit their API support page.
  <a href="https://www.triposo.com/api/documentation/20181213/" target="_blank">Triposo Documentation</a><br>

## Development road map
  * See other's saved highlights and allow for sharing.
  * Add and edit your own items for the Packing List


## Available Scripts

### Node Js
  ```npm install``` - Installs node modules<br>
  ```npm run dev```- Starts development/node server<br>
  ```npm test``` - Runs tests

### React
  ```npm install``` - Installs node modules<br>
  ```npm test``` - Runs tests
  ```npm start``` - Runs React App in development mode<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>


The page will reload if you make edits.<br>
You will also see any lint errors in the console.
