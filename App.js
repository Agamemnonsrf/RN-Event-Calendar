import { StatusBar } from 'expo-status-bar'
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Touchable,
} from 'react-native'
import { Calendar } from './Components/Calendar'
import { FloatingButton } from './Components/FloatingButton'
import { useEffect, useState } from 'react'
import { StickerSelect } from './Components/StickerSelect'
import MenuDrawer from 'react-native-side-drawer'
import * as SQLite from 'expo-sqlite'
import { MaterialCommunityIcons } from 'react-native-vector-icons'

const stickerNames = [
  'weight-lifter',
  'abacus',
  'account-group',
  'air-horn',
  'airballoon',
  'alarm',
  'alert',
  'alien',
  'all-inclusive',
  'anvil',
  'arm-flex',
  'attachment',
  'badminton',
  'alpha-a',
  'alpha-b',
  'alpha-c',
  'alpha-d',
  'alpha-e',
  'alpha-f',
  'alpha-g',
  'alpha-h',
  'alpha-i',
  'alpha-j',
  'alpha-k',
  'alpha-l',
  'alpha-m',
  'alpha-n',
  'alpha-o',
  'alpha-p',
  'alpha-q',
  'alpha-r',
  'alpha-s',
  'alpha-t',
  'alpha-u',
  'alpha-v',
  'alpha-w',
  'alpha-x',
  'alpha-y',
  'alpha-z',
]

const StickerLine = ({ item, setStickerList, db }) => {
  const [stickerName, setStickerName] = useState(item.name)

  const handleDeleteSticker = (val) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          `delete from userstickers where value = ?`,
          [val],
          (_, result) => {
            console.log(`result.rowsAffected on delete: ${result.rowsAffected}`)
            setStickerList((prev) => prev.filter((item) => item.value !== val))
          },
        )
      })
    }
  }

  const handleSaveStickerName = (forSticker, val) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          `update userstickers set name = ? where value = ?`,
          [val, forSticker],
          (_, result) => {
            console.log(`result.rowsAffected on update: ${result.rowsAffected}`)
          },
        )
      })
    }
  }

  return (
    <View style={styles.stickeLine}>
      <MaterialCommunityIcons name={item.value} size={30} />
      <TextInput
        style={styles.stickerInput}
        placeholder="Sticker Name..."
        value={stickerName}
        onChangeText={(val) => {
          setStickerName(val)
        }}
      />

      <TouchableHighlight
        underlayColor="rgba(150,150,150,0.6)"
        style={{
          backgroundColor: 'rgba(100,100,100,0.8)',
          padding: 5,
          borderRadius: 90,
          marginLeft: -4,
        }}
        onPress={() => handleSaveStickerName(item.value, stickerName)}
      >
        <MaterialCommunityIcons
          name="check"
          size={20}
          color={'rgba(0,0,0,1)'}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="rgba(150,150,150,0.6)"
        style={{
          backgroundColor: 'rgba(100,100,100,0.8)',
          padding: 5,
          borderRadius: 90,
          marginLeft: 15,
        }}
        onPress={() => handleDeleteSticker(item.value)}
      >
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={'rgba(0,0,0,1)'}
        />
      </TouchableHighlight>
    </View>
  )
}

export default function App() {
  const [db, setDb] = useState(SQLite.openDatabase('seventheenths.db'))
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [stickerList, setStickerList] = useState([])

  useEffect(() => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS userstickers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value TEXT)',
          null,
          (txObj, resultSet) => {
            console.log(`resultSet: ${JSON.stringify(resultSet)}`)
          },
          (txObj, error) => console.log(`error: ${JSON.stringify(error)}`),
        )
      })

      db.transaction((tx) => {
        tx.executeSql(
          'select value, name from userstickers',
          null,
          (txObj, resultSet) => {
            console.log(`resultSet: ${JSON.stringify(resultSet)}`)
            console.log(
              `The new kinda stickerlist: ${JSON.stringify(
                resultSet.rows._array,
              )}`,
            )
            setStickerList(resultSet.rows._array)
            setIsLoading(false)
          },
          (txObj, error) => console.log(`error: ${JSON.stringify(error)}`),
        )
      })
    } else {
      console.log(`db isnt working: ${db}`)
    }
  }, [db])

  const renderStickerLine = ({ item }) => {
    return <StickerLine item={item} setStickerList={setStickerList} db={db} />
  }

  const drawerContent = (
    <View style={styles.sideMenu}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.modalText}>Your Stickers</Text>
        <TouchableHighlight
          underlayColor="rgba(150,150,150,0.6)"
          style={[
            { padding: 5, borderRadius: 90, marginBottom: 7 },
            styles.buttonClose,
          ]}
          onPress={() => setShowMenu(!showMenu)}
        >
          <MaterialCommunityIcons name="close" size={20} color="white" />
        </TouchableHighlight>
      </View>
      <View
        style={{
          marginLeft: 2,
          borderWidth: 1,
          borderColor: 'grey',
          height: 230,
          width: 250,
          marginBottom: 20,
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.containerStyles}
            >
              {stickerNames.map((key) => {
                return (
                  <StickerSelect
                    setStickerList={setStickerList}
                    value={key}
                    key={key}
                    db={db}
                    stickerList={stickerList}
                  >
                    <MaterialCommunityIcons name={key} size={40} key={key} />
                  </StickerSelect>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.textandlist}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            height: 300,
            width: 250,
          }}
        >
          {isLoading ? (
            <Text style={{ color: 'white' }}>Loading...</Text>
          ) : (
            <KeyboardAvoidingView behavior="height">
              <View style={{ maxHeight: '100%' }}>
                <FlatList
                  data={stickerList}
                  renderItem={renderStickerLine}
                  keyExtractor={(item) => item.value}
                  refreshing={isLoading}
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <Calendar
        stickerList={stickerList}
        db={db}
        underlayColor="rgba(150,150,150,0.6)"
      />
      <FloatingButton showMenu={showMenu} setShowMenu={setShowMenu} />

      <MenuDrawer
        open={showMenu}
        drawerContent={drawerContent}
        drawerPercentage={80}
        animationTime={250}
      ></MenuDrawer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sticker: {
    backgroundColor: 'rgba(100,100,100,0.9)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  doneButton: {
    backgroundColor: 'rgba(100,100,100,0.9)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  sideMenu: {
    backgroundColor: 'rgba(100,100,100,1)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
    height: '100%',
  },
  containerStyles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    maxHeight: 228,
    width: 230,
  },
  textandlist: {
    backgroundColor: 'rgba(100,100,100)',
  },
  header: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(50,50,50,1)',
    paddingVertical: 240,
    paddingHorizontal: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView2: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  addButton: {
    backgroundColor: 'grey',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 160,
    left: 60,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    marginTop: 3,
  },
  stickeLine: {
    height: 60,
    width: 'auto',
    backgroundColor: 'rgba(120,120,120,0.9)',
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  stickerInput: {
    color: 'white',
    fontSize: 14,
    height: 40,
    width: '50%',
    backgroundColor: 'rgba(90,90,90,1)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
})
