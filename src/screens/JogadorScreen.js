import { View, Text, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import PlayerCard from '../components/PlayerCard'

export default function JogadorScreen({ navigation }) {
  const [player, setPlayer] = useState(null)

  async function fetchPlayer() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('jogadores')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setPlayer(data)
  }

  useEffect(() => {
    fetchPlayer()
  }, [])

  if (!player) return <Text>Carregando...</Text>

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Sua Ficha</Text>
      <PlayerCard player={player} />
    </View>
  )
}