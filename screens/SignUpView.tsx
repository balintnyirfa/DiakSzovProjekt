import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert } from "react-native";
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { addDoc, doc } from 'firebase/firestore';

export default function SignUp({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log("Sign up error: ", error);
            }
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#DBBEA1" />
            <View style={styles.whiteBox}>
                <Text style={[styles.header, styles.boldFont]}>REGISZTRÁCIÓ</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.inputText, styles.regularFont]}>Email cím</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text style={[styles.inputText, styles.regularFont]}>Jelszó</Text>
                    <TextInput
                        style={[styles.inputField, styles.inputFieldB]}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <Text style={[styles.inputText, styles.regularFont]}>Jelszó újra</Text>
                    <TextInput
                        style={[styles.inputField, styles.inputFieldB]}
                        secureTextEntry
                        onChangeText={text => setConfirmPassword(text)}
                        value={confirmPassword} />
                </View>
                <Pressable style={styles.loginBtn} onPress={handleSignUp}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>REGISZTRÁLOK</Text>
                </Pressable>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnButton, styles.returnButton]} onPress={() => navigation.navigate('Welcome')}>
                        <Image source={{ uri: 'https://i.postimg.cc/6Tx0KqGn/arrow-sm-left-svgrepo-com.png' }} style={styles.arrow} />
                        <Text style={[styles.returnBtnText, styles.boldFont]}>Vissza</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

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
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#DBBEA1',
    },
    whiteBox: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1E1E1',
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
        color: '#000',
    },
    inputText: {
        fontSize: 20,
        color: '#000',
        marginBottom: 8,
    },
    inputField: {
        width: '100%',
        backgroundColor: '#D2D2D2',
        marginBottom: 12,
    },
    inputFieldB: {
        marginBottom: 3,
    },
    passwordText: {
        color: '#D34F73',
        fontSize: 12
    },
    loginBtn: {
        backgroundColor: '#3F292B',
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
        //backgroundColor: '#242431',
        width: '100%',
    },
    arrow: {
        height: 30,
        width: 30,
    },
    returnButton: {
        //backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '27%'
    },
    returnBtnText: {
        color: '#D34F73',
        fontSize: 16,
    }
});
