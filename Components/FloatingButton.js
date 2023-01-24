import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from "react-native";

export const FloatingButton = (props) => {
  const handlePress = () => {
    props.setShowMenu(true);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={handlePress}
      underlayColor="rgba(150,150,150,0.6)"
    >
      <Text style={styles.threeDots}>+</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    position: "absolute",
    backgroundColor: "rgb(180,180,180)",
    borderRadius: 90,
    transform: [{ translateY: 250 }, { translateX: -120 }],
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  threeDots: {
    fontSize: 60,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
    transform: [{ translateY: -10 }, { translateX: 0 }],
  },
});
