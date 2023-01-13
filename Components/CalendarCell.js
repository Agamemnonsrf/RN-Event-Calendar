import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native'
import { useState, useEffect } from 'react'

export const CalendarCell = (props) => {
  const [isToday, setIsToday] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    if (month == props.monthKey && day == props.day) {
      setIsToday(true)
    }
  }, [])

  return (
    <View>
      <TouchableHighlight
        style={[
          styles.container,
          {
            backgroundColor: isToday ? 'rgba(150,10,25,0.7)' : 'grey',
          },
        ]}
        onLongPress={() => {
          setIsSelected(!isSelected)
        }}
      >
        <Text style={styles.day}>{props.day}</Text>
      </TouchableHighlight>
      <Modal
        transparent={true}
        visible={isSelected}
        onRequestClose={() => {
          setIsSelected(!isSelected)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsSelected(!isSelected)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 39,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 3,
  },
  day: {
    fontWeight: 'bold',
    marginLeft: 3,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  },
})
