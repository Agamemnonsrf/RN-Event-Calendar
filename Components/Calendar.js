import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Month } from './Month'

const months = [
  { month: 'January', days: 31, monthKey: 1 },
  { month: 'February', days: 28, monthKey: 2 },
  { month: 'March', days: 31, monthKey: 3 },
  { month: 'April', days: 30, monthKey: 4 },
  { month: 'May', days: 31, monthKey: 5 },
  { month: 'June', days: 30, monthKey: 6 },
  { month: 'July', days: 31, monthKey: 7 },
  { month: 'August', days: 31, monthKey: 8 },
  { month: 'September', days: 30, monthKey: 9 },
  { month: 'October', days: 31, monthKey: 10 },
  { month: 'November', days: 30, monthKey: 11 },
  { month: 'December', days: 31, monthKey: 12 },
]

export const Calendar = () => {
  const renderMonth = ({ item }) => {
    return (
      <View>
        <Month month={item.month} days={item.days} monthKey={item.monthKey} />
      </View>
    )
  }

  const renderYear = () => {
    return (
      <View style={styles.year}>
        <Text style={styles.yearText}>2023</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        renderItem={renderMonth}
        data={months}
        ListHeaderComponent={renderYear}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  year: {
    height: 50,
    width: 320,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  yearText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
})
