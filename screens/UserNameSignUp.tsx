import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert } from "react-native";
import { db } from "../config/firebase";

export default function UserNameSignUp({ navigation }: { navigation: any }) {
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [birthday, setBirthday] = useState('');
    const auth = getAuth();

    const saveUsername = async (name: any, telephone: any, birthday: any) => {
        try {
            const newUser = {
                id: auth.currentUser?.uid,
                name: name,
                email: auth.currentUser?.email,
                telephone: telephone,
                birthdate: birthday
            };
            const userId = auth.currentUser?.uid || '';
            setDoc(doc(db, 'users', userId), newUser)
                .then(() => {
                    navigation.navigate('HomePage');
                });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#B4FB01" />
            <View style={styles.whiteBox}>
                <Text style={[styles.header, styles.boldFont]}>KÖVETKEZŐ</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.importantText, styles.regularFont]}>Add meg a további adataid a regisztráció befejezéséhez!</Text>
                    <Text style={[styles.inputText, styles.regularFont]}>Név</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setName(text)}
                        value={name} />
                    <Text style={[styles.inputText, styles.regularFont]}>Telefon</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setTelephone(text)}
                        value={telephone} />
                    <Text style={[styles.inputText, styles.regularFont]}>Születésnap</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setBirthday(text)}
                        value={birthday} />
                </View>
                <Pressable style={styles.loginBtn} onPress={() => saveUsername(name, telephone, birthday)}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>BEFEJEZÉS</Text>
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
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#B4FB01',
    },
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
        color: '#000',
        marginBottom: 8,
    },
    inputField: {
        borderRadius: 6,
        width: '100%',
        backgroundColor: '#E0E0E0',
        //marginBottom: 12,
    },
    passwordText: {
        color: '#D34F73',
        fontSize: 12
    },
    loginBtn: {
        backgroundColor: '#373B2C',
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
        color: '#93B92E',
        fontSize: 16,
    },
    borderStyle: { 
        borderColor: '#373B2C',
        borderWidth: 2,
    }
});