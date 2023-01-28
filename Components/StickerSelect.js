import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native'
import * as SQLite from 'expo-sqlite'

import { useState, useEffect } from 'react'

export const StickerSelect = ({
  children,
  value,
  setStickerList,
  db,
  stickerList,
}) => {
  const [wasSelected, setWasSelected] = useState(false)

  const handleAddSticker = () => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          `insert into userstickers (value, name) values (?, ?)`,
          [value, ''],
          (_, result) => {
            console.log(`result.rowsAffected on insert: ${result.rowsAffected}`)
            setStickerList((prev) => [...prev, { value: value, name: '' }])
            setWasSelected(true)
          },
          (_, error) => console.log(`error: ${error}`),
        )
      })
    }
  }

  return (
    <TouchableHighlight
      underlayColor="rgba(150,150,150,0.6)"
      style={[
        styles.sticker,
        {
          opacity:
            stickerList.map((item) => item.value).includes(value) || wasSelected
              ? 0.5
              : 1,
        },
      ]}
      disabled={
        stickerList.map((item) => item.value).includes(value) || wasSelected
      }
      onPress={() => {
        if (
          !stickerList.map((item) => item.value).includes(value) &&
          !wasSelected
        ) {
          handleAddSticker()
        }
      }}
    >
      <View>{children}</View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  sticker: {
    backgroundColor: 'rgba(80,80,80,0.9)',
    borderRadius: 10,
    padding: 10,
    margin: 7,
    zIndex: 0,
  },
  checkMark: {
    backgroundColor: 'rgba(0,150,200,0.9)',
    borderRadius: 10,
    padding: 3,
    margin: -6,
    position: 'absolute',
    zIndex: 1,
  },
})
