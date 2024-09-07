import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Alert, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function SignUpEnd({ navigation }) {
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');

    const [birthday, setBirthday] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setBirthday(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [idCardNum, setIdCardNum] = useState('');
    const [studentIdNum, setStudentIdNum] = useState('');
    const [taxIdNum, setTaxIdNum] = useState('');
    const [tajNum, setTajNum] = useState('');
    const [postalCode, setPostalCode] = useState(0);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const auth = getAuth();

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{4,6}$/;
    const taxIdRegex = /^([0-9]{10})$/;
    const tajRegex = /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{3})\d{3}-(?!0{3})\d{3}$/;
    const idCardRegex = /^([0-9]{6})([A-Z]{2})$/;
    const studentIdRegex = /^([0-9]{11})$/;

    const saveData = async () => {
        if (!name || !telephone || !birthday || !idCardNum || !studentIdNum || !taxIdNum || !tajNum || !address) {
            Alert.alert('Hiba!', 'Minden mezőt ki kell töltened!');
            return;
        }

        if (!idCardRegex.test(idCardNum)) {
            Alert.alert('Hiba!', 'Rossz személyi számot adtál meg!');
            return;
        }

        if (!phoneRegex.test(telephone)) {
            Alert.alert('Hiba!', 'Nem megfelelő telefonszámot adtál meg!');
            return;
        }

        if (!taxIdRegex.test(taxIdNum)) {
            Alert.alert('Hiba!', 'Az adószámnak 10 számjegyűnek kell lennie!');
            return;
        }

        if (!studentIdRegex.test(studentIdNum)) {
            Alert.alert('Hiba!', 'Nem megfelelő diák ig. számot adtál meg!');
            return;
        }

        if (!tajRegex.test(tajNum)) {
            Alert.alert('Hiba!', 'Nem megfelelő TAJ számot adtál meg! (pl. 111-222-333)');
            return;
        }

        if (postalCode.length != 4) {
            Alert.alert('Hiba!', 'Az irányítószámnak 4 számjegyűnek kell lennie!');
            return;
        }

        try {
            const newUser = {
                id: auth.currentUser?.uid,
                name: name,
                email: auth.currentUser?.email,
                telephone: telephone,
                birthdate: birthday,
                idCardNum: idCardNum,
                studentIdNum: studentIdNum,
                taxIdNum: taxIdNum,
                tajNum: tajNum,
                postalCode: postalCode,
                city: city,
                address: address
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
                <Text style={[styles.header, styles.boldFont]}>BEFEJEZÉS</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.insideBox}>
                        <Text style={[styles.importantText, styles.regularFont]}>Add meg a további adataid a regisztráció befejezéséhez!</Text>

                        <Text style={[styles.inputText, styles.regularFont]}>Név</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            autoCapitalize='words'
                            onChangeText={text => setName(text)}
                            value={name} />

                        <Text style={[styles.inputText, styles.regularFont]}>Telefon</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='phone-pad'
                            onChangeText={text => setTelephone(text)}
                            value={telephone} />

                        <Text style={[styles.inputText, styles.regularFont]}>Születésnap</Text>
                        <Pressable style={{ width: '100%' }} onPress={showDatepicker}>
                            <TextInput
                                style={styles.inputField}
                                editable={false}
                                value={birthday.toLocaleDateString()}
                                placeholder='Válassz dátumot!'
                                onChangeText={text => setBirthday(text)} />
                        </Pressable>
                        {
                            show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={birthday}
                                    mode={mode}
                                    display='spinner'
                                    minimumDate={new Date(1980, 1, 1)}
                                    onChange={onChange} />
                            )
                        }

                        <Text style={[styles.inputText, styles.regularFont]}>Személyi igazolvány szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setIdCardNum(text)}
                            value={idCardNum} />

                        <Text style={[styles.inputText, styles.regularFont]}>Diákigazolvány szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setStudentIdNum(text)}
                            value={studentIdNum} />

                        <Text style={[styles.inputText, styles.regularFont]}>Adószám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setTaxIdNum(text)}
                            value={taxIdNum} />

                        <Text style={[styles.inputText, styles.regularFont]}>TAJ szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setTajNum(text)}
                            value={tajNum} />

                        <Text style={[styles.inputText, styles.regularFont]}>Lakcím</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={number => setPostalCode(number)}
                            value={postalCode} />
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setCity(text)}
                            value={city} />
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setAddress(text)}
                            value={address} />
                    </View>
                    <Pressable style={styles.loginBtn} onPress={() => saveData()}>
                        <Text style={[styles.loginBtnText, styles.boldFont]}>KÖVETKEZŐ</Text>
                    </Pressable>
                </ScrollView>
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
        flex: 3,
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