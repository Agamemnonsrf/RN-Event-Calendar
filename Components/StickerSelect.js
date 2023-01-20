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

export const StickerSelect = ({ children, value, setStickerList, db }) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (isSelected) {
      db.transaction((tx) => {
        tx.executeSql(
          `insert into stickers (id, name) values (?, ?)`,
          [value, ''],
          (_, result) => {
            console.log(`result.rowsAffected: ${result.rowsAffected}`)
            setStickerList((prev) => [...prev, { value: value, name: '' }])
          },
          (_, error) => console.log(`error: ${error}`),
        )
      })
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `delete from stickers where id = ?`,
          [value],
          (_, result) => {
            setStickerList((prev) =>
              prev.filter((item) => item.value !== value),
            )
          },
        )
      })
    }
  }, [isSelected])

  return (
    <TouchableHighlight
      style={styles.sticker}
      onPress={() => setIsSelected(!isSelected)}
    >
      <View>
        {isSelected && (
          <View style={styles.checkMark}>
            <Text>V</Text>
          </View>
        )}
        {children}
      </View>
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
