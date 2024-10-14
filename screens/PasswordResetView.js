import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert, TouchableOpacity } from 'react-native';
import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import common from '../styles/common';

export default function PasswordReset({ navigation }) {
    const [email, setEmail] = useState('');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const createAlert = () =>
        Alert.alert('Siker!', 'Hamarosan érkezik az email!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    const handlePwdReset = async () => {
        if (!email) {
            Alert.alert('Hiba!', 'Nem adtál meg email-t vagy jelszót! ');
            return;
        }

        if (!regex.test(email)) {
            Alert.alert('Hiba!', 'Kérlek adj meg egy érvényes email címet!');
            return;
        }

        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    createAlert();
                    console.log('Reset email sent!');
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        } catch (error) {

        }
    }

    return (
        <View style={common.main}>
            <StatusBar backgroundColor='#B4FB01' />
            <View style={[styles.whiteBox, common.borderStyle]}>
                <Text style={[styles.header, common.boldFont, common.darkBrownColor]}>ÁLLÍTSD VISSZA A JELSZAVAD</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.importantText, common.regularFont, common.darkBrownColor]}>Fontos! Olyan email címet adj meg, amivel a profilodat regisztráltad!</Text>
                    <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Email</Text>
                    <TextInput
                        style={[common.inputField, common.darkBrownColor]}
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                        value={email} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handlePwdReset}>
                    <Text style={[styles.loginBtnText, common.boldFont]}>KÜLDÉS</Text>
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
};

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
        paddingTop: 40,
        paddingBottom: 50,
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    header: {
        fontSize: 24,
        color: '#373B2C',
        textAlign: 'center'
    },
    importantText: {
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 25
    },
    inputText: {
        fontSize: 18,
        marginBottom: 8,
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