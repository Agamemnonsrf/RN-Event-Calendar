import { StatusBar } from 'expo-status-bar'
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native'
import { Calendar } from './Components/Calendar'
import { FloatingButton } from './Components/FloatingButton'
import { useState } from 'react'
import {
  BarsSolid,
  BombSolid,
  CodeSolid,
  DumbbellSolid,
  HeartSolid,
  HouseSolid,
  PaperClipSolid,
  PenToSquareSolid,
  StarSolid,
  TreeSolid,
} from './icons/exports'
import { StickerSelect } from './Components/StickerSelect'

export default function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [stickerList, setStickerList] = useState([])
  const [showStickerStore, setShowStickerStore] = useState(false)

  console.warn(stickerList)

  const renderStickerLine = ({ item }) => {
    return (
      <View style={styles.stickeLine}>
        <Text>{item}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <Calendar />
      <FloatingButton showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu && (
        <View style={{ position: 'absolute' }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.textandlist}>
                <Text style={styles.modalText}>Your Stickers</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    height: 300,
                    width: 250,
                  }}
                >
                  <FlatList data={stickerList} renderItem={renderStickerLine} />
                </View>
              </View>
              <TouchableHighlight onPress={() => setShowStickerStore(true)}>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowMenu(!showMenu)}
              >
                <Text style={styles.textStyle}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
          {showStickerStore && (
            <View style={{ position: 'absolute' }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView2}>
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.containerStyles}
                  >
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="BarsSolid"
                    >
                      <BarsSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="BombSolid"
                    >
                      <BombSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="CodeSolid"
                    >
                      <CodeSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="DumbbellSolid"
                    >
                      <DumbbellSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="HeartSolid"
                    >
                      <HeartSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="HouseSolid"
                    >
                      <HouseSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="PaperClipSolid"
                    >
                      <PaperClipSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="PenToSquareSolid"
                    >
                      <PenToSquareSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="StarSolid"
                    >
                      <StarSolid width={40} height={40} />
                    </StickerSelect>
                    <StickerSelect
                      setStickerList={setStickerList}
                      value="TreeSolid"
                    >
                      <TreeSolid width={40} height={40} />
                    </StickerSelect>
                  </ScrollView>
                  <TouchableHighlight
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setShowStickerStore(false)}
                  >
                    <Text style={styles.textStyle}>X</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      setShowStickerStore(false)
                    }}
                  >
                    <View style={styles.doneButton}>
                      <Text>Done</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
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

  containerStyles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    maxHeight: 350,
    width: 230,
  },
  textandlist: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 20,

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
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'rgba(50,50,50,1)',
    borderRadius: 20,
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
    backgroundColor: 'rgba(55,55,55,1)',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
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
    height: 50,
    width: 'auto',
    backgroundColor: 'red',
    margin: 5,
  },
})
