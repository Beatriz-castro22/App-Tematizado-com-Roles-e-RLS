import { View, Text, FlatList, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import PlayerCard from '../components/PlayerCard'
import MonsterCard from '../components/MonsterCard'

export default function MestreScreen({ navigation }) {
  const [players, setPlayers] = useState([])
  const [monsters, setMonsters] = useState([])

  async function fetchPlayers() {
    const { data } = await supabase.from('jogadores').select('*')
    setPlayers(data)
  }

  async function fetchMonsters() {
    const { data } = await supabase.from('monstros').select('*')
    setMonsters(data)
  }

  useEffect(() => {
    fetchPlayers()
    fetchMonsters()
  }, [])

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Jogadores</Text>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PlayerCard player={item} />}
      />

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Monstros</Text>
      <FlatList
        data={monsters}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MonsterCard monster={item} />}
      />
    </View>
  )
}