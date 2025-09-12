const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash("prueba1234", saltRounds, (error, hash) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Password: ", hash);
});

bcrypt.compare("prueba1234", "HASH", (error, response) => {
    if (error) { console.log(error);return; }
    console.log(response);
});