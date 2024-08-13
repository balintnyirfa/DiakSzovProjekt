import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert } from "react-native";
import { db } from "../config/firebase";

export default function OtherDataView({ navigation, route }) {
    const {name, telephone, birthday} = route.param;

    const [idCardNum, setIdCardNum] = useState('');
    const [studentIdNum, setStudentIdNum] = useState('');
    const [taxIdNum, setTaxIdNum] = useState('');
    const [tajNum, setTajNum] = useState('');
    const [address, setAddress] = useState('');

    const auth = getAuth();

    const saveOtherData = async () => {
        try {
            const newUser = {
                id: auth.currentUser?.uid,
                name: name,
                email: auth.currentUser?.email,
                telephone: telephone,
                birthdate: birthday
            };
            const newData = {
                id: auth.currentUser?.uid,
                idCardNum: idCardNum,
                studentIdNum: studentIdNum,
                taxIdNum: taxIdNum,
                tajNum: tajNum,
                address: address
            };
            const userId = auth.currentUser?.uid || '';
            setDoc(doc(db, 'users', userId), newUser);
            setDoc(doc(db, 'student_data', userId), newData)
                .then(() => {
                    navigation.navigate('Homepage');
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#B4FB01" />
            <View style={styles.whiteBox}>
                <Text style={[styles.header, styles.boldFont]}>BEFEJEZÉS</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.importantText, styles.regularFont]}>És már csak egy lépés van hátra!</Text>
                    <Text style={[styles.inputText, styles.regularFont]}>Személyi igazolvány szám</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setIdCardNum(text)}
                        value={idCardNum} />
                    <Text style={[styles.inputText, styles.regularFont]}>Diákigazolvány szám</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setStudentIdNum(text)}
                        value={studentIdNum} />
                    <Text style={[styles.inputText, styles.regularFont]}>Adószám</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setTaxIdNum(text)}
                        value={taxIdNum} />
                    <Text style={[styles.inputText, styles.regularFont]}>TAJ szám</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setTajNum(text)}
                        value={tajNum} />
                    <Text style={[styles.inputText, styles.regularFont]}>Lakcím</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setAddress(text)}
                        value={address} />
                </View>
                <Pressable style={styles.loginBtn} onPress={() => saveOtherData()}>
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