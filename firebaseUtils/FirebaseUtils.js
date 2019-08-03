import React, {Component} from 'react';

/*
FirebaseUtils provides connection to firebase's real time database.
It contains utils methods for reading/writing to database 
*/

export default class FirebaseUtils extends Component {
    static databaseUrl = 'https://handyman-react.firebaseio.com/';
    
    static async getAllUsers() {
      try {
        let response = await fetch(
          'https://handyman-react.firebaseio.com/users.json',
        );
        let responseJson = await response.json();
        users = [];
          for(key in responseJson){
            users.push(responseJson[key])
          }
          return users
      } catch (error) {
        console.error(error);
      }
    }
    
    static async getUserByName(username){
        users = await FirebaseUtils.getAllUsers();
        const userExists = users.some(users => users.username == username);
        if(userExists){
            return users.find(users => users.username === username);
        }
        else{
            return null;
        }
    }

    static createNewUser(username, password, firstName, lastName, number, address, type){
      fetch("https://handyman-react.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify({
          'username': username,
          'password': password,
          'firstName': firstName,
          'lastName': lastName,
          'number': number,
          'address': address,
          'type': type
        })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

  }

/*
fetch("https://handyman-react.firebaseio.com/users.json", {
          method: "POST",
          body: JSON.stringify({
            'username': 'isi',
            'password': 'test01'
          })
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
*/