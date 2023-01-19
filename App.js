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
} from 'react-native'
import { Calendar } from './Components/Calendar'
import { FloatingButton } from './Components/FloatingButton'
import { useEffect, useState } from 'react'
import { stickers } from './icons/exports'
import { StickerSelect } from './Components/StickerSelect'
import MenuDrawer from 'react-native-side-drawer'
import * as SQLite from 'expo-sqlite'

export default function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [stickerList, setStickerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const db = SQLite.openDatabase('db.db')

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists stickers (id integer primary key not null, name text, sticker text);',
      )
    })

    updateList()
  }, [])

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'select sticker from stickers',
        [],
        (_, result) => setStickerList(result.rows._array),
        (_, error) => console.log(error),
      )
    })
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('hello')
    console.log(stickerList)
  }, [stickerList])

  const renderStickerLine = ({ item }) => {
    const Sticker = stickers[item.value]
    return (
      <View style={styles.stickeLine}>
        <Sticker height={30} width={30} />
        <TextInput
          style={styles.stickerInput}
          placeholder="Set Sticker Name..."
          value={item.name}
        />
      </View>
    )
  }

  const drawerContent = (
    <View style={styles.sideMenu}>
      <Text style={styles.modalText}>Your Stickers</Text>
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
              {Object.keys(stickers).map((key) => {
                const Sticker = stickers[key]
                return (
                  <StickerSelect
                    setStickerList={setStickerList}
                    value={key}
                    key={key}
                  >
                    <Sticker width={40} height={40} />
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
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={stickerList}
              renderItem={renderStickerLine}
              keyExtractor={(item) => item}
              keyboardDismissMode="on-drag"
            />
          )}
        </View>
      </View>
      <TouchableHighlight
        style={[styles.button, styles.buttonClose]}
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={styles.textStyle}>X</Text>
      </TouchableHighlight>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <Calendar />
      <FloatingButton showMenu={showMenu} setShowMenu={setShowMenu} />

      <MenuDrawer
        open={showMenu}
        drawerContent={drawerContent}
        drawerPercentage={80}
        animationTime={250}
      >
        <View style={styles.container}>
          <Text>Open Drawer</Text>
        </View>
      </MenuDrawer>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 40,
    width: '80%',
    backgroundColor: 'rgba(90,90,90,1)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
})
