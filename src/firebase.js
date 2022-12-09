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

const registrationToken = {};
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export function requestPermission() {
    console.log('call requestPermission');
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            getToken(messaging, { vapidKey: FIREBASE_WEB_PUBLIC_VAPID_KEY }).then((currentToken) => {
                if (currentToken) {
                    registrationToken.statusCode = 200;
                    registrationToken.token = currentToken;
                } else {
                    registrationToken.statusCode = 400;
                    registrationToken.error = 'No registration token available. Request permission to generate one.';
                }
            }).catch((err) => {
                registrationToken.statusCode = 501;
                registrationToken.error = `An error occurred while retrieving token. ${err}`;
            });
        } else if (permission === 'denied') {
            alert('You need to turn on receiving notification from your browser');
        }
    });
}
requestPermission();

export const getRegistrationToken = registrationToken;
export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
