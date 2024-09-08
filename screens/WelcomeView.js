import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Welcome({navigation}) {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
      <View style={[styles.greenBox, styles.borderStyle]}>
        <Text style={[styles.appNameText, styles.boldFont]}>DIÁKMESTEREK</Text>
        <Text style={[styles.welcomeText, styles.boldFont]}>ÜDVÖZÖLLEK</Text>
      </View>
      <View style={styles.buttonBox}>
        <Pressable
          style={[styles.button, styles.signUpBtn]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.buttonText, styles.signUpbuttonText, styles.boldFont]}>Regisztrálok</Text>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.buttonText, styles.boldFont]}>Már van fiókom</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightFont: {
    fontFamily: 'Quicksand-Light',
  },
  regularFont: {
    fontFamily: 'Quicksand-Regular',
  },
  semiBoldFont: {
    fontFamily: 'Quicksand-SemiBold',
  },
  boldFont: {
    fontFamily: 'Quicksand-Bold',
  },
  mediumText: {
    fontSize: 20,
  },  
  bigText: {

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