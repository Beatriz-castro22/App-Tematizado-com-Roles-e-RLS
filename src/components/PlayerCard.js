import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function PlayerCard({ player }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{player.nome}</Text>
      <Text>HP: {player.hp}</Text>
      <Text>Mana: {player.mana}</Text>
      <Text>XP: {player.xp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
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