# Youtube remote control

#### Youtube mobile remote control to manage playlists on phone and watch on pc. You no need to stand up from the sofa to switch youtube videos.

# Install



## 1 - prepare DB
### Install mysql server [https://www.mysql.com]
### create the database named 'ytchanger' 
### and grand standard privelegs for db user 'ytchanger'
### user password is: 12345678
### import database from any mysql client 
### from file
    ./database.sql

## or
### You can set you DB requisites in:
    ./config/datastores.js
### Replace:
    url: 'mysql://MysqlUser:MysqlPassword@MysqlHost:3306/MysqlDatabse',
### and replace in:
    ./config/models.js
### to:
    migrate: 'drop',//Drop tables and create new
### It needs to make for the one time and
### after (sails lift) first time back to:
    migrate: 'safe',

---

## 2 - prepare backend
### Install Sails.js [https://sailsjs.com/get-started]:
    npm install sails -g

### Install packages:
    npm i

### Run server:
    sails lift

### Server will start on youip:1337 type in browser:
    http://youip:1337

### If you want to fill some demodata,
### type in you web browser
    http://youip:1337/filldemo

### If you want to use as youtube player
### stay on main page.
### If you want to manage your playlists
### Press the button "Control center" 
### and fill your playlists.

### To control player from mobile
### open in web browser main page (player)
### And open on smartphone browser 
    http://youip:1337
### and press control center.

---

## 3 -development
### Client source files for frontend
    ./assets/webpack/src
### to run webpack-dev-server type:
    npm run dev
### and run backend type:
    sails lift
### to build one js file with frontend type:
    npm run build

---
### Links:

[Sails.js] (https://sailsjs.com)

[Vue.js] (https://vuejs.org)

[MySQL] (https://www.mysql.com)

[Bulma] (https://bulma.io)

[Pug] (https://pugjs.org)

[JSDOM] (https://github.com/jsdom/jsdom)