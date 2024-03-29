import React from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image } from "react-native";

const Login = () => {
    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#DBBEA1" />
            <View style={styles.whiteBox}>
                <Text style={styles.header}>BEJELENTKEZÉS</Text>
                <View style={styles.insideBox}>
                    <Text style={styles.inputText}>Email cím</Text>
                    <TextInput
                        style={styles.inputField} />
                    <Text style={styles.inputText}>Jelszó</Text>
                    <TextInput
                        style={[styles.inputField, styles.inputFieldB]} />
                    <Pressable>
                        <Text style={styles.passwordText}>Elfelejtettem a jelszavam</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.loginBtn}>
                    <Text style={styles.loginBtnText}>BEJELENTKEZEK</Text>
                </Pressable>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnBtn, styles.returnBox]}>
                        <Image source={{ uri: 'https://i.postimg.cc/6Tx0KqGn/arrow-sm-left-svgrepo-com.png' }} style={styles.arrow} />
                        <Text style={styles.returnBtnText}>Vissza</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        fontWeight: 'bold'
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
        fontWeight: 'bold',
        fontSize: 20
    },
    returnBox: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: '#242431',
        width: '100%',
    },
    arrow: {
        height: 30,
        width: 30,
    },
    returnBtn: {
    },
    returnBtnText: {
        color: '#D34F73',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default Login;