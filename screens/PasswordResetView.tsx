import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, Alert } from "react-native";

export default function PasswordReset({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const auth = getAuth();

    const createAlert = () =>
        Alert.alert('Siker!', 'Hamarosan érkezik az email!', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    const handlePwdReset = async () => {
        /*fetchSignInMethodsForEmail(auth, email).then((result) => {
            console.log(result);
        });*/
        sendPasswordResetEmail(auth, email)
            .then(() => {
                createAlert();
                console.log('Reset email sent!');
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#DBBEA1" />
            <View style={styles.whiteBox}>
                <Text style={[styles.header, styles.boldFont]}>ÁLLÍTSD VISSZA A JELSZAVAD</Text>
                <View style={styles.insideBox}>
                    <Text style={[styles.importantText, styles.regularFont]}>Fontos! Olyan email címet adj meg, amivel a profilodat regisztráltad!</Text>
                    <Text style={[styles.inputText, styles.regularFont]}>Email</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={text => setEmail(text)}
                        value={email} />
                </View>
                <Pressable style={styles.loginBtn} onPress={handlePwdReset}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>KÜLDÉS</Text>
                </Pressable>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnButton, styles.returnButton]} onPress={() => navigation.navigate('Login')}>
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
        paddingTop: 40,
        paddingBottom: 50,
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    header: {
        fontSize: 24,
        color: '#000',
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
        width: '100%',
        backgroundColor: '#D2D2D2',
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

//export default Login;