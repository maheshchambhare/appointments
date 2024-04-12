import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(app);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            try {
              // Get the current registration token

              getToken(messaging, {
                vapidKey:
                  "BDyb2nHfyzDYv-1bnyrZE9dJUJ_BYFPbFPYR-V478oO_2lh0R9cgSdANtuKvJyO_ESuk9nrbzBIsCuXH41s_96I",
              }).then((currentToken: any) => {
                if (currentToken) {
                  setToken(currentToken);
                  console.log("No registration token available.", currentToken);
                  // Send the token to your server and update the UI if necessary
                  // ...
                } else {
                  // Show permission request UI
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                  // ...
                }
              });
              //   const currentToken = await getToken(messaging, {
              //     vapidKey:
              //       "BDyb2nHfyzDYv-1bnyrZE9dJUJ_BYFPbFPYR-V478oO_2lh0R9cgSdANtuKvJyO_ESuk9nrbzBIsCuXH41s_96I",
              //   });
              //   if (currentToken) {
              //     setToken(currentToken);
              //   } else {
              //     console.log("No registration token available.");
              //   }
            } catch (error) {
              console.error("Error retrieving token:", error);
            }
          }
        }
      } catch (error) {
        console.error("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
