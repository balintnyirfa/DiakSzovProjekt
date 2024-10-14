import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common from '../styles/common';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState(null);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        checkUser();
    }, []);


    const handleLogin = async () => {
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
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await AsyncStorage.setItem('user', JSON.stringify(user));

                const userDoc = doc(db, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDoc);

                const userOtherDoc = doc(db, 'user_data', user.uid);
                const userOtherDocSnapshot = await getDoc(userOtherDoc);

                if (!userDocSnapshot.exists()) {
                    navigation.navigate('OtherData');
                } else if (!userOtherDocSnapshot.exists()) {
                    navigation.navigate('SignUpEnd');
                } else {
                    navigation.navigate('HomePage');
                }

                return user;
            } catch (error) {
                Alert.alert('Hiba!', 'Rossz email vagy jelszó!');
                console.log(error);
            }
        }
    }

    return (
        <KeyboardAvoidingView style={common.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.whiteBox, common.borderStyle]}>
                <Text style={[styles.header, common.boldFont, common.darkBrownColor]}>BEJELENTKEZÉS</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Email cím</Text>
                    <TextInput
                        style={[common.inputField, common.darkBrownColor]}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text style={[styles.inputText, styles.regularFont, common.darkBrownColor]}>Jelszó</Text>
                    <TextInput
                        style={[common.inputField, styles.inputFieldB, common.darkBrownColor]}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                        <Text style={[styles.passwordText, common.regularFont, common.darkBrownColor]}>Elfelejtettem a jelszavam</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={[styles.loginBtnText, common.boldFont]}>BEJELENTKEZEK</Text>
                </TouchableOpacity>
                <View style={styles.returnBox}>
                    <TouchableOpacity style={[styles.returnButton, styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/zGPDCCrc/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={[styles.returnBtnText, common.boldFont]}>Vissza</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        paddingVertical: 30,
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    header: {
        fontSize: 24,
        color: '#373B2C',
    },
    inputText: {
        fontSize: 20,
        marginBottom: 8,
    },
    inputFieldB: {
        marginBottom: 3,
    },
    passwordText: {
        color: '#373B2C',
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