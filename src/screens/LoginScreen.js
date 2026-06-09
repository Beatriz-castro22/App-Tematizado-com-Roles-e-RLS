import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
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

    if (perfil.role === 'mestre') navigation.replace('Mestre')
    else navigation.replace('Jogador')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={login} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 }
})