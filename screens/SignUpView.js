import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

import common from '../styles/common';


export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Hiba!', 'Nem adtál meg email-t vagy jelszót! ');
            return;
        }

        if (!regex.test(email)) {
            Alert.alert('Hiba!', 'Kérlek adj meg egy érvényes email címet!');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Hiba!', 'A jelszónak legalább 8 karakter hosszúnak kell lennie!');
            return;
        }

        if (email && password) {
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredentials.user;
                navigation.navigate('Login');
                return user;
            } catch (error) {
                Alert.alert('Hiba!', 'Ezzel az email címmel már regisztráltak!');
                console.log(error);
            }
        }
    }

    return (
        <View style={common.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.whiteBox, common.borderStyle]}>
                <Text style={[styles.header, common.boldFont, common.darkBrownColor]}>REGISZTRÁCIÓ</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Email cím</Text>
                    <TextInput
                        style={[common.inputField, common.darkBrownColor]}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Jelszó</Text>
                    <TextInput
                        style={[common.inputField, styles.inputFieldB, common.darkBrownColor]}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
                    <Text style={[styles.loginBtnText, common.boldFont]}>REGISZTRÁLOK</Text>
                </TouchableOpacity>
                <View style={styles.returnBox}>
                    <TouchableOpacity style={[styles.returnButton, styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/zGPDCCrc/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={[styles.returnBtnText, common.boldFont]}>Vissza</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({    
    whiteBox: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    insideBox: {
        width: '100%',
        paddingVertical: 30,
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    header: {
        fontSize: 24,
    },
    inputText: {
        fontSize: 20,
        marginBottom: 8,
    },
    
    inputFieldB: {
        marginBottom: 3,
    },
    passwordText: {
        color: '#D34F73',
        fontSize: 12
    },
    loginBtn: {
        backgroundColor: '#687A3C',
        borderRadius: 20,
        marginBottom: 70,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    loginBtnText: {
        color: '#FFF',
        fontSize: 20
    },
    returnBox: {
        width: '100%',
    },
    arrow: {
        height: 30,
        width: 30,
    },
    returnButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '27%'
    },
    returnBtnText: {
        color: '#93B92E',
        fontSize: 16,
    },
});
