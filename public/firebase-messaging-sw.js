// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyADXaFYBDikz_LFgRvlyRvyh-OK9IeHIN0",
  authDomain: "appointify-e6cff.firebaseapp.com",
  projectId: "appointify-e6cff",
  storageBucket: "appointify-e6cff.appspot.com",
  messagingSenderId: "175388342654",
  appId: "1:175388342654:web:844a16e4c533508f571b2f",
  measurementId: "G-2SFHLCMF19",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = "New Appointment added";
  const notificationOptions = {
    body: `A new Appointment has been added for customer ${payload.data.customer}`,
    icon: "./logo.webp",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
