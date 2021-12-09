import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ImageBackground } from 'react-native';

export default function App() {
  const [email, setEmail] = useState(null)

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/pea.png')} style={styles.backgroundImage}>
        <Image source={require('./assets/silvia.png')} style={styles.image} />
      </ImageBackground>
      <View style={styles.signUpForm}>
        <View>
          <Text style={styles.title}>I'm in the</Text>
          <Text style={styles.titleSub}>office.</Text>
        </View>
        <TextInput placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' style={styles.email} />
        <Button title='Sign Up' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  signUpForm: {
    flex: 1,
    marginLeft: 32,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 32,
  },
  titleSub: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});
