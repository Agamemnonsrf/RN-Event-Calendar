import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export const CalendarCell = (props) => {
  const [isToday, setIsToday] = useState(false);
  const [currentSticker, setCurrentSticker] = useState(null);
  const [isLongPressed, setIsLongPressed] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    if (month == props.monthKey && day == props.day) {
      setIsToday(true);
    }
  }, []);

  console.log("hello");
  console.log(`db: ${props.db}`);
  useEffect(() => {
    props.db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS stickerdates (id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, month TEXT, year TEXT, sticker TEXT)",
        null,
        (txObj, resultSet) => {
          console.log(
            `stickerDates create if not exists: ${JSON.stringify(resultSet)}`
          );
        },
        (txObj, error) =>
          console.log(`stickerDates error: ${JSON.stringify(error)}`)
      );
    });

    props.db.transaction((tx) => {
      tx.executeSql(
        "select sticker from stickerdates where day = ? and month = ? and year = ?",
        [props.day, props.monthKey, props.year],
        (txObj, resultSet) => {
          console.log(
            `resultSet.rows._array: ${JSON.stringify(resultSet.rows._array)}`
          );
          if (resultSet.rows._array.length > 0) {
            setCurrentSticker(resultSet.rows._array[0].sticker);
          }
        },
        (txObj, error) =>
          console.log(`error getting current sticker: ${JSON.stringify(error)}`)
      );
    });
  }, []);

  const handleSelectSticker = (item) => {
    if (props.db) {
      if (currentSticker === item) {
        props.db.transaction((tx) => {
          tx.executeSql(
            "delete from stickerdates where day = ? and month = ? and year = ?",
            [props.day, props.monthKey, props.year],
            (txObj, resultSet) => {
              console.log(
                `deleted sticker from stickerdates: ${JSON.stringify(
                  resultSet.rows._array
                )}`
              );
            },
            (txObj, error) =>
              console.log(
                `error deleting current sticker: ${JSON.stringify(error)}`
              )
          );
        });
        setCurrentSticker(null);
      } else {
        props.db.transaction((tx) => {
          tx.executeSql(
            "insert into stickerdates (day, month, year, sticker) values (?, ?, ?, ?)",
            [props.day, props.monthKey, props.year, item],
            (txObj, resultSet) => {
              console.log(
                `inserted sticker to stickerdates: ${JSON.stringify(
                  resultSet.rows._array
                )}`
              );
            },
            (txObj, error) =>
              console.log(
                `error inserting current sticker: ${JSON.stringify(error)}`
              )
          );
        });
        setCurrentSticker(item);
      }
    }

    currentSticker === item ? setCurrentSticker(null) : setCurrentSticker(item);
    setIsLongPressed(false);
  };

  const renderStickerListItem = ({ item }) => {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor:
            currentSticker === item
              ? "rgba(241, 201, 22,0.5)"
              : "rgba(100,100,100,0.5)",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 7,
          marginBottom: 5,
        }}
      >
        <TouchableHighlight
          onPress={() => handleSelectSticker(item)}
          underlayColor="rgba(150,150,150,0.6)"
          style={{ borderRadius: 10 }}
        >
          <MaterialCommunityIcons name={item} size={30} color="rgba(0,0,0,1)" />
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View>
      <TouchableHighlight
        style={[
          styles.container,
          {
            backgroundColor: isToday
              ? "rgba(150,10,25,0.7)"
              : currentSticker === null
              ? "grey"
              : "rgba(241, 201, 22,0.5)",
          },
        ]}
        onLongPress={() => {
          setIsLongPressed(!isLongPressed);
          console.warn("long pressed");
        }}
        onPress={() => {
          console.log("yo");
        }}
        underlayColor="rgba(150,150,150,0.6)"
      >
        <>
          <Text style={styles.day}>{props.day}</Text>
          {currentSticker && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons
                name={currentSticker}
                size={30}
                color="black"
              />
            </View>
          )}
        </>
      </TouchableHighlight>

      <Modal
        transparent={true}
        visible={isLongPressed}
        onRequestClose={() => {
          setIsLongPressed(!isLongPressed);
        }}
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ margin: "3%" }}></View>
            <FlatList
              style={{
                width: "100%",
                marginBottom: 15,
                backgroundColor: "rgba(115,115,115,1)",
                padding: 10,
                borderRadius: 10,
                paddingRight: 15,
              }}
              data={props.stickerList && props.stickerList}
              renderItem={renderStickerListItem}
              horizontal
            />
            <TextInput
              style={{
                height: "60%",
                width: "80%",
                borderColor: "black",
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 10,
                color: "white",
                fontFamily: "sans-serif",
              }}
            />
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsLongPressed(!isLongPressed)}
              underlayColor="rgba(150,150,150,0.6)"
            >
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color="white"
              />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 42,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 3,
    zIndex: 0,
  },
  day: {
    fontWeight: "bold",
    marginLeft: 3,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    width: 300,
    height: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "rgba(100,100,100,1)",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
