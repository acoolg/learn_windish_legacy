// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';

var userData = undefined

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7nxZG7rjIlAxU67JWmIil5VjxtcYPvpg",
    authDomain: "chat-a64f5.firebaseapp.com",
    databaseURL: "https://chat-a64f5-default-rtdb.firebaseio.com",
    projectId: "chat-a64f5",
    storageBucket: "chat-a64f5.appspot.com",
    messagingSenderId: "275120951104",
    appId: "1:275120951104:web:cf900d45851f96833934a5",
    measurementId: "G-VG08P8L1SF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

window.onload = function() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${getCookie("user")}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            let found = false;
            userData = users
        } else {
            console.error('No users found.');
        }
    }).catch((error) => {
        console.error('Error retrieving user data:', error);
    });
}

// Initialize Firebase


function userid(digit) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < digit; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function loginUser(email, password) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${email}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            if(password == users.password){
                let found = false;
                document.cookie = `user=${email}`
                document.cookie = `userData=${JSON.stringify(users)}`
                userData = users
                location.href = '../sheet/wellcome.html'
            } else {
                console.log("password not found")
            }
        } else {
            console.error('No users found.');
        }
    }).catch((error) => {
        console.error('Error retrieving user data:', error);
    });
}

// Function to write user data
function writeUserData(name, password) {
    set(ref(database, `users/${name}`), {
        username: name,
        email: name,
        password: password,
        xp: 0,
        level: 1,
        rank: "new",
        last_login: new Date().toISOString(),
        streak: 0,
    }).then(() => {
        console.log('Data saved successfully!');
    }).catch((error) => {
        console.error('Error saving data: ', error);
    });
}

// Add event listener to the button
document.getElementById("login").addEventListener("click", () => {
    var email = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    loginUser(email, pass);
});


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}