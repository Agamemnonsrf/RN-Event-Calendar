import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native'

import { useState, useEffect } from 'react'

export const StickerSelect = ({ children, value, setStickerList }) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setStickerList((prev) => [...prev, value])
    } else {
      setStickerList((prev) => prev.filter((item) => item !== value))
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
    backgroundColor: 'rgba(100,100,100,0.9)',
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
