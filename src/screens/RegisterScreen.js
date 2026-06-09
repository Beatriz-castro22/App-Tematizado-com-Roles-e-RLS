import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [role, setRole] = useState('jogador')

  async function cadastrar() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha
    })
    if (error) {
      alert(error.message)
      return 
    }

    const perfil = await supabase
      .from('perfis')
      .insert({ 
        id: data.user.id, 
        nome, 
        role 
      })

    if (perfil.error) {
      alert(perfil.error.message)
      return 
    }

    if (role === 'jogador') {
      await supabase
        .from('jogadores')
        .insert({ 
          user_id: data.user.id 
        })
    }

    alert('Cadastro realizado!')
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry onChangeText={setSenha} />

      <Button
        title="Cadastrar como Jogador"
        onPress={() => { setRole('jogador'); cadastrar() }}
      />
      <Button
        title="Cadastrar como Mestre"
        onPress={() => { setRole('mestre'); cadastrar() }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 }
})