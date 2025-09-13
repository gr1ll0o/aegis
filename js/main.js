const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ipcRenderer } = require('electron');

const apps = document.getElementById('appss');
const addInterface = document.getElementById('addInterface');

document.getElementById("min-btn").addEventListener("click", () => {
  ipcRenderer.send("minimize-app");
});

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

document.getElementById('addBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('nameService');
    const passwdInput = document.getElementById('passwdService');

    const serviceName = nameInput.value.trim();
    const map = {
      youtube: 'M', twitter: 'D', facebook: 'E', google: 'H',
      instagram: 'Q', spotify: 'W', discord: 'Y', pinterest: 'A'
    };
    const logo = map[serviceName.toLowerCase()] || 'K';
    if (document.getElementById('null')) {
        apps.innerHTML = ``;
    }
    apps.innerHTML += `
        <div class="app">
            <p style="font-family: 'Media';color: #fff;font-size:40px;">${logo}</p><br>
            <h4 style="margin: 10px;">${serviceName}</h4>
        </div>
    `;
    nameInput.value = '';
    passwdInput.value = '';
    addInterface.style.display = 'none';
});

document.getElementById('CancelBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('nameService');
    const passwdInput = document.getElementById('passwdService');

    nameInput.value = '';
    passwdInput.value = '';
    document.getElementById('addInterface').style.display = 'none';
});