import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


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
        <View style={styles.main}>
            <StatusBar backgroundColor="#B4FB01" />
            <View style={[styles.whiteBox, styles.borderStyle]}>
                <Text style={[styles.header, styles.boldFont]}>REGISZTRÁCIÓ</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.inputText, styles.regularFont]}>Email cím</Text>
                    <TextInput
                        style={styles.inputField}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text style={[styles.inputText, styles.regularFont]}>Jelszó</Text>
                    <TextInput
                        style={[styles.inputField, styles.inputFieldB]}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password} />
                </View>
                <Pressable style={styles.loginBtn} onPress={handleSignUp}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>REGISZTRÁLOK</Text>
                </Pressable>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnButton, styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/zGPDCCrc/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
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
        color: '#000',
        marginBottom: 8,
    },
    inputField: {
        borderRadius: 6,
        width: '100%',
        backgroundColor: '#E0E0E0',
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
