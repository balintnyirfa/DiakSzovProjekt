import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image } from "react-native";
import { auth } from "../config/firebase";

export default function Login({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#DBBEA1" />
            <View style={styles.whiteBox}>
                <Text style={[styles.header, styles.boldFont]}>BEJELENTKEZÉS</Text>
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
                    <Pressable onPress={() => navigation.navigate('PasswordReset')}>
                        <Text style={[styles.passwordText, styles.regularFont]}>Elfelejtettem a jelszavam</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>BEJELENTKEZEK</Text>
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