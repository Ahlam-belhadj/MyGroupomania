const axios = require('axios');

exports.getAllUsers = async (req, res) => {
const url = "http://localhost:3000/users";

    axios.get(url)
    .then(function (response) {
        // handle success
        if(response.data) {
            const data = response.data;
            res.render('home', {data})
      }
     })
    .catch(function (error) {
        // handle error
       console.log(error);
       res.render('home', {"error": "Un problem dans le serveur"})
    })
   .finally(function () {
       res.render('home')
    });

 }
