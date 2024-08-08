// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getDatabase, ref, set, push, get } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';



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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

function userid(digit) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < digit; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text
}


// Function to write user data
function writeUserData(userId, name, password) {
    set(ref(database, 'users/' + name), {
        username: name,
        email: name,
        password: password,
        xp: 0,
        level: 1,
        rank: "new",
        last_login: JSON.stringify(new Date()),
        streak: 0,
        weak: {
            type: "",
            question: "",
            word: "",
            letter: ""
        }
    })
    .then(() => {
        console.log('Data saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving data: ', error);
    });
}
// Add event listener to the button

document.getElementById("btn").addEventListener("click", () => {
    var email = document.getElementById("username").value
    var pass = document.getElementById("password").value
    writeUserData(userid(20), email, pass);
});