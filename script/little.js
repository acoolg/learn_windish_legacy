import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getDatabase, ref, get, child, set } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';

let userData = undefined;
var chooseAllId;

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

window.onload = async function() {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, `users/${getCookie("user")}`));
        if (snapshot.exists()) {
            userData = snapshot.val();
            window.userData = userData; // Expose to global scope
            document.dispatchEvent(new Event('userDataLoaded')); // Dispatch an event
        } else {
            console.error('No users found.');
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
    }
};

export function writeNewData(userData) {
    const dbRef = ref(getDatabase());
    set(ref(database, 'users/' + userData.username), {
        username: userData.username,
        email: userData.username,
        password: userData.password,
        xp: userData.xp,
        level: userData.level,
        rank: userData.rank,
        last_login: userData.last_login,
        streak: userData.streak,
        weak: {
            type: userData.weak.type,
            question: userData.weak.question,
            word: userData.weak.word,
            letter: userData.weak.letter
        }
    })
    .then(() => {
        console.log('Data saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving data: ', error);
    });
    document.cookie = "userData=" + JSON.stringify(userData)
}

export function getCookie(cname) {
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

export { userData };

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

export function jumpTo(url) {
    location.href = url
}

export async function getQuestionBy() {
    fetch("../data/choose.json")
    .then(async (data) => {
        var vari = await data.json()
        vari = vari.map(item => item.id)
        console.log(vari)
        return vari
    })
}

