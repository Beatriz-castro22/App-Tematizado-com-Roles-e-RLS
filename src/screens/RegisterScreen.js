import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [role, setRole] = useState('jogador')

  async function cadastrar() {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password: senha
      })

    if (error) {
      alert(error.message)
      return
    }

    await supabase.from('perfis').insert({
      id: data.user.id,
      nome,
      role
    })

    if (role === 'jogador') {
      await supabase.from('jogadores').insert({
        user_id: data.user.id
      })
    }

    alert('Cadastro realizado!')
    navigation.goBack()
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nome"
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
      />

      <Button
        title="Cadastrar como Jogador"
        onPress={() => {
          setRole('jogador')
          cadastrar()
        }}
      />

      <Button
        title="Cadastrar como Mestre"
        onPress={() => {
          setRole('mestre')
          cadastrar()
        }}
      />
    </View>
  )
}