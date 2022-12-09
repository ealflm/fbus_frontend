import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FIREBASE_WEB_PUBLIC_VAPID_KEY } from "./configs/baseURL";

const firebaseConfig = {
    apiKey: "AIzaSyAtVRZENzLlP--NTJCrWGTqgpV9510MLp4",
    authDomain: "fbus-364505.firebaseapp.com",
    projectId: "fbus-364505",
    storageBucket: "fbus-364505.appspot.com",
    messagingSenderId: "394615991951",
    appId: "1:394615991951:web:bb497a37027d1308718afa",
    measurementId: "G-M14KZGCX2K"
};

export let registrationToken = {};
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export function requestPermission() {
    return new Promise(resolve => {
        console.log('call requestPermission');
        Notification.requestPermission().then((permission) => {
            const deviceToken = {};
            if (permission === "granted") {
                getToken(messaging, { vapidKey: FIREBASE_WEB_PUBLIC_VAPID_KEY }).then((currentToken) => {
                    if (currentToken) {
                        console.log('currentToken -> ', currentToken);
                        deviceToken.statusCode = 200;
                        deviceToken.token = currentToken;
                    } else {
                        deviceToken.statusCode = 400;
                        deviceToken.error = 'No registration token available. Request permission to generate one.';
                    }
                    resolve(deviceToken);
                }).catch((err) => {
                    deviceToken.statusCode = 501;
                    deviceToken.error = `An error occurred while retrieving token. ${err}`;
                    resolve(deviceToken);
                });


            } else if (permission === 'denied') {
                alert('You need to turn on receiving notification from your browser');
            }
        });
    })
}

requestPermission().then(data => {
    console.log('Initial call to registration token', data);
    registrationToken = data;
}).catch(err => {
    console.log('Initial call to registration token Error -> ', err);
});

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
