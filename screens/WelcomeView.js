import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import common from '../styles/common';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
      <View style={[styles.greenBox, styles.borderStyle]}>
        <Text style={[styles.appNameText, common.boldFont]}>DIÁKMESTEREK</Text>
        <Text style={[styles.welcomeText, common.boldFont]}>ÜDVÖZÖLLEK</Text>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View style={[styles.button, styles.signUpBtn]} onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.buttonText, styles.signUpbuttonText, styles.boldFont]}>Regisztrálok</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.buttonText, common.boldFont]}>Már van fiókom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediumText: {
    fontSize: 20,
  },
  borderStyle: {
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#373B2C'
  },

  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  greenBox: {
    paddingBottom: 90,
    flex: 2,
    height: 500,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#B4FB01',
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#687A3C',
    fontSize: 36,
  },
  appNameText: {
    color: '#FFF',
    fontSize: 42,
  },
  button: {
    width: 220,
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  signUpBtn: {
    backgroundColor: '#687A3C',
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#687A3C',
  },
  signUpbuttonText: {
    color: '#FFF',
  },
});

//export default Welcome;