import React from 'react';
import { Button, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#D34F73" />
      <View style={styles.redBox}>
        <Text style={styles.welcomeText}>ÜDVÖZÖLLEK</Text>
        <Text style={styles.appNameText}>APP NÉV</Text>
      </View>
      <View style={styles.buttonBox}>
        <Pressable style={[styles.button, styles.signUpBtn]}>
          <Text style={[styles.buttonText, styles.signUpbuttonText]}>Regisztrálok</Text>
        </Pressable>
        <Pressable style={[styles.button]}>
          <Text style={styles.buttonText}>Már van fiókom</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBBEA1',
  },
  redBox: {
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    paddingBottom: 90,
    flex: 2,
    height: 500,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#D34F73',
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold'
  },
  appNameText: {
    color: '#FF9FB9',
    fontSize: 42,
    fontWeight: 'bold',
  },
  button: {
    width: 220,
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  signUpBtn: {
    backgroundColor: '#3F292B',
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpbuttonText: {
    color: '#FFF',
  },
});

export default Welcome;