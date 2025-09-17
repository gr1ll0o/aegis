const bcrypt = require('bcrypt');
const { ipcRenderer } = require('electron');
const fs = require('fs');

const apps = document.getElementById('appss');
const addInterface = document.getElementById('addInterface');
const noMasterkey = document.getElementById('noMasterkey');
const loginForm = document.getElementById('loginForm');

const saltRounds = 10;
let data = null;

const APP_FOLDER_NAME = 'Aegis';
const FILE_NAME = 'data.json';

document.getElementById("min-btn").addEventListener("click", () => {
  ipcRenderer.send("minimize-app");
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

document.getElementById('validMasterkey').addEventListener('click', () => {
    let firstPasswd = document.getElementById('firstPasswd');
    let secondPasswd = document.getElementById('secondPasswd');

    if (firstPasswd.value.length < 6) { document.getElementById('masterkeyText').style.color = '#f00'; return; }
    if (firstPasswd.value != secondPasswd.value) { document.getElementById('masterkeyPWText').style.color = '#f00'; return; }

    bcrypt.hash(firstPasswd.value, saltRounds, (error, hash) => {
        if (error) { alert(error); return; }
        localStorage.setItem('MASTERKEY', hash);
    });
    noMasterkey.style.display = 'none';
});

document.getElementById('validPassword').addEventListener('click', () => {
    let firstPasswd = document.getElementById('passwd');

    bcrypt.compare(firstPasswd.value, localStorage.getItem('MASTERKEY'), (err, response) => {
        if (err || !response) { alert("Contraseña incorrecta.");return; }
        loginForm.style.display = 'none';
    });
});

async function init() {
    if (!localStorage.getItem('MASTERKEY')) {
        noMasterkey.style.display = 'flex';
        return;
    }

    loginForm.style.display = 'flex';
}
//localStorage.removeItem('MASTERKEY');
init();
