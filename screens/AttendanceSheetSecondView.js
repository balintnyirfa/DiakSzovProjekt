import React from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AttendanceSheetSecond({ navigation, route }) {
    const { jobData } = route.params;
    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text>Vissza</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[styles.boldFont, styles.bigSize]}>Rögzítés</Text>
                </View>
            </View>
            <View style={[styles.jobs]}>
                <TextInput
                    style={[styles.inputField, styles.borderStyle]}/>
                <TextInput
                    style={[styles.inputField, styles.borderStyle]}/>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>MENTÉS</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 10,
    },
    switchContainerInside: {
        flexDirection: 'row',
        alignItems: 'center',
    },
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
    regularSize: {
        fontSize: 17
    },
    mediumSize: {
        fontSize: 22
    },
    bigSize: {
        fontSize: 30
    },
    whiteText: {
        color: '#FFFFFF',
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    longText: {
        textAlign: "left",
        marginBottom: 10
    },
    main: {
        flex: 1,
        alignItems: 'center',
        fontSize: 200,
        backgroundColor: '#B4FB01',
    },
    topView: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    jobs: {
        width: '100%',
        flexDirection: 'Column',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },
    inputFieldB: {
        marginBottom: 3,
    },
    loginBtn: {
        backgroundColor: '#687A3C',
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 70,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    loginBtnText: {
        color: '#FFF',
        fontSize: 20
    },
});