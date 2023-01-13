import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from './Components/Calendar'
import { FloatingButton } from './Components/FloatingButton'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <Calendar />
      <FloatingButton />
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
  header: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
  },
})
