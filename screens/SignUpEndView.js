import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpEnd({ navigation }) {

    const [idCardNum, setIdCardNum] = useState('');
    const [studentIdNum, setStudentIdNum] = useState('');
    const [taxIdNum, setTaxIdNum] = useState('');
    const [tajNum, setTajNum] = useState('');

    const auth = getAuth();

    const taxIdRegex = /^([0-9]{10})$/;
    const tajRegex = /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{3})\d{3}-(?!0{3})\d{3}$/;
    const idCardRegex = /^([0-9]{6})([A-Z]{2})$/;
    const studentIdRegex = /^([0-9]{11})$/;

    const saveData = async () => {
        if (!idCardNum || !studentIdNum || !taxIdNum || !tajNum) {
            Alert.alert('Hiba!', 'Minden mezőt ki kell töltened!');
            return;
        }

        if (!idCardRegex.test(idCardNum)) {
            Alert.alert('Hiba!', 'Rossz személyi számot adtál meg!');
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

        try {
            const newUser = {
                user_id: auth.currentUser?.uid,
                id_card_num: idCardNum,
                student_id_num: studentIdNum,
                tax_id_num: taxIdNum,
                taj_num: tajNum
            };
            const userId = auth.currentUser?.uid || '';
            setDoc(doc(db, 'user_data', userId), newUser)
                .then(() => {
                    navigation.navigate('HomePage');
                });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'light-content'} />
            <View style={[styles.whiteBox, styles.borderStyle]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.header, styles.boldFont]}>BEFEJEZÉS</Text>
                    <Text style={[styles.importantText, styles.regularFont]}>Add meg az alábbi adatokat a regisztráció befejezéséhez!</Text>
                    <View style={styles.insideBox}>
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
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Pressable style={styles.loginBtn} onPress={() => saveData()}>
                            <Text style={[styles.loginBtnText, styles.boldFont]}>KÖVETKEZŐ</Text>
                        </Pressable>
                    </View>
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
        paddingTop: 20,
        paddingBottom: 30,
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
        marginTop: 25
    },
    inputText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
    },
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
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
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
});