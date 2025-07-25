  // getFCMToken.js
  import { messaging } from "./firebase";
  import { getToken } from "firebase/messaging";

  const getFCMToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BFIioA4bKvX4bgx_anvER3LOnKCZ54vvyRNzhNGugtJ5SacAc_W-X8inBnnEfY9pHjvjcwPYt_3Xz047FtL63rg", // Update VAPID KEY with your projects VAPID KEY
        });
        return token;
      } else {
        console.error("Notification permission denied");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  const getFCM = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BFIioA4bKvX4bgx_anvER3LOnKCZ54vvyRNzhNGugtJ5SacAc_W-X8inBnnEfY9pHjvjcwPYt_3Xz047FtL63rg ", // Update VAPID KEY with your projects VAPID KEY
        });
        return token;
      } else {
        console.error("Notification permission denied");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  export default getFCMToken;
  export { getFCM };
