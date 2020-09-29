# sololearn-likestromer
A SoloLearn Bot that sends like stroms to a specific user

### Usage
#### install dependencies
```
npm install
```

#### Pre requrements
Before you start you need to create a .env file and fill all required feilds from .env_sample file

#### run server
```
node server
```
The server will be started at http://localhost:3000 by default

### Making requests

Make a post request '/' with the given payload
```
{
    "userId": "<userId of user to whom strom will be sent>",
    "password": "<password that you created in env>"
}
```
You can use testing.rest file as well but make sure that you have installed rest client in your VS Code...<br>
You can use postman as well

### The actual Project is deployed on 
## https://sololearn-likestromer.herokuapp.com

#Happy Learning :)
