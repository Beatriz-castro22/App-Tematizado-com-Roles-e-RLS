import { View, Text, Button } from 'react-native'
import { supabase } from '../services/supabase'
import { useEffect, useState } from 'react'

export default function PerfilScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null)

  async function fetchPerfil() {
    const user = supabase.auth.user()
    const { data } = await supabase.from('perfis').select('*').eq('id', user.id).single()
    setPerfil(data)
  }

  useEffect(() => { fetchPerfil() }, [])

  if (!perfil) return <Text>Carregando...</Text>

  async function logout() {
    await supabase.auth.signOut()
    navigation.replace('Login')
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome: {perfil.nome}</Text>
      <Text>Email: {supabase.auth.user().email}</Text>
      <Text>Role: {perfil.role}</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  )
}