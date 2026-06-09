import { View, Text, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      })

    if (error) {
      alert(error.message)
      return
    }

    const { data: perfil } = await supabase
      .from('perfis')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (perfil.role === 'mestre') {
      navigation.replace('Mestre')
    } else {
      navigation.replace('Jogador')
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        onPress={login}
      />

      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  )
}