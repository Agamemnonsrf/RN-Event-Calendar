import {
  FlatList,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
} from 'react-native'
import { CalendarCell } from './CalendarCell'
import { useState } from 'react'

const createDayRange = (days) => {
  const dayRange = []
  for (let i = 1; i <= days; i++) {
    dayRange.push(i)
  }
  return dayRange
}

export const Month = (props) => {
  const days = createDayRange(props.days)

  const cellRender = ({ item }) => {
    return (
      <View>
        <CalendarCell
          day={item}
          month={props.month}
          monthKey={props.monthKey}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.month}>{props.month}</Text>
      <View style={styles.cellContainer}>
        <FlatList renderItem={cellRender} data={days} numColumns={7} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: 320,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  month: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  modal: {
    width: 150,
    height: 150,
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.9)',
  },
})
