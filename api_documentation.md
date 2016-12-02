

# mealdotnext API documentation

## API endpoints
--------------------------------------------------------------

## Statics
### Landing Page
Method: GET
Path: /
Response: 200 and index.html of landing page

### Homepage
Method: GET
Path: /app
Response: 200 and index.html of homepage

--------------------------------------------------------------

### Concoctions
#### Concoction Object

{
  userid: String,
  triggerapi: String,
  triggerevent: String,
  triggerparams: Object,
  triggeruserid: String,
  triggertoken: String,
  actionapi: String,
  actionevent: String,
  actionuserid: String,
  actiontoken: String,
  actionparams: Object,
  enable: Boolean,
  description: String
}

#### Create a Concoction
Method: POST
Path: /api/constructor/add
Input: JSON
Response: 201 and saved Concoction

#### Enable / Disable a Concoction
Method: POST
Path: /api/constructor/toggleEnable
Input: JSON with concId = concoction ID
Response: 201 and 'concoction successfully toggled'

--------------------------------------------------------------

### User
#### Get User data with data of Meals
Method: GET
Path: /api/user/concoctions
Input: username through the url or as JSON
Response: 200 and all concoctions of a user

#### Register User
Method: POST
Path: /api/user/signup
Input: JSON with property username and password
Response: 201 and 'success'

#### Login User
Method: POST
Path: /api/user/login
Input: JSON with property username and password
Response: 200 and 'success'

#### Logout User
Method: GET
Path: /api/user/logout
Response: 200 and 'success'

--------------------------------------------------------------