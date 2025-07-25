importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDsTbp2-wdezzJGh1mk09eNQGMBXQwcUYo",
  authDomain: "buzzhub-a3c54.firebaseapp.com",
  projectId: "buzzhub-a3c54",
  storageBucket: "buzzhub-a3c54.firebasestorage.app",
  messagingSenderId: "828809286179",
  appId: "1:828809286179:web:d46968287dd3774c641796",
  measurementId: "G-8LG8CS6F0H",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
let messaging = firebase.messaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      // Ensure Firebase Messaging has the registration before requesting a token
      messaging = firebase.messaging();
      messaging.useServiceWorker(registration);

      // Now request the FCM token
      return messaging.getToken();
    })
    .then((token) => {
      console.log("FCM Token:", token);
    })
    .catch((error) => {
      console.error("Error getting FCM token:", error);
    });
} else {
  console.warn("Service workers are not supported in this browser.");
}
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Optional: add an icon for your notifications
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
