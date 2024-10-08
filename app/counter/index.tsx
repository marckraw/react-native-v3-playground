import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      // to testr need to click and add to home (background notification)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello",
          body: "This is a test notification",
        },
        trigger: {
          seconds: 5,
        },
      });
      console.log("Permission for notification was granted");
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Permission for notification was not granted",
          "Enable the notification permission in settings to use this feature.",
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text>Register for push notifications</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
  },
});
