import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function MonsterCard({ monster }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{monster.nome}</Text>
      <Text>Nível: {monster.nivel}</Text>
      <Text>HP: {monster.hp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFEBEE',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})