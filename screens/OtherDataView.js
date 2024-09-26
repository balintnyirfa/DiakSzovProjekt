import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { db } from '../config/firebase';

export default function OtherDataView({ navigation, route }) {
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const [birthday, setBirthday] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthday;
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

    const formattedBirthday = birthday.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    const auth = getAuth();

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{4,6}$/;

    const saveData = async () => {
        if (!name || !telephone || !birthday) {
            Alert.alert('Hiba!', 'Minden mezőt ki kell töltened!');
            return;
        }

        if (!phoneRegex.test(telephone)) {
            Alert.alert('Hiba!', 'Nem megfelelő telefonszámot adtál meg!');
            return;
        }

        if (postalCode.length !== 4) {
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
                postal_code: postalCode,
                city: city,
                address: address
            };
            const userId = auth.currentUser?.uid || '';
            setDoc(doc(db, 'users', userId), newUser)
                .then(() => {
                    navigation.navigate('SignUpEnd');
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' />
            <View style={[styles.whiteBox, styles.borderStyle]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.header, styles.boldFont]}>KÖVETKEZŐ</Text>
                    <Text style={[styles.importantText, styles.regularFont]}>Add meg a személyes adataid a regisztrációd folytatásához!</Text>
                    <View style={[styles.insideBox]}>
                        <Text style={[styles.inputText, styles.regularFont]}>Név</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            autoCapitalize='words'
                            onChangeText={text => setName(text)}
                            placeholder='Teljes neved'
                            value={name} />

                        <Text style={[styles.inputText, styles.regularFont]}>Telefon</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='phone-pad'
                            onChangeText={text => setTelephone(text)}
                            placeholder='pl. 06112223333'
                            value={telephone} />

                        <Text style={[styles.inputText, styles.regularFont]}>Születésnap</Text>
                        <Pressable style={{ width: '100%' }} onPress={showDatepicker}>
                            <TextInput
                                style={styles.inputField}
                                editable={false}
                                value={formattedBirthday}
                                placeholder='Válassz dátumot!'
                                onChangeText={text => setBirthday(text)} />
                        </Pressable>
                        {
                            show && (
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    value={birthday}
                                    mode={mode}
                                    display='spinner'
                                    minimumDate={new Date(1980, 1, 1)}
                                    onChange={onChange} />
                            )
                        }

                        <Text style={[styles.inputText, styles.regularFont]}>Lakcím</Text>
                        <View style={[styles.postalCity]}>
                            <TextInput
                                style={[styles.inputField, { flex: 1 }]}
                                keyboardType='number-pad'
                                onChangeText={text => setPostalCode(text)}
                                placeholder='Irsz.'
                                value={postalCode.toString()} />
                            <TextInput
                                style={[styles.inputField, { marginLeft: 10, flex: 4 }]}
                                keyboardType='default'
                                onChangeText={text => setCity(text)}
                                placeholder='Település'
                                value={city} />
                        </View>
                        <TextInput
                            style={[styles.inputField]}
                            keyboardType='default'
                            onChangeText={text => setAddress(text)}
                            placeholder='Közterület'
                            value={address} />

                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Pressable style={styles.loginBtn} onPress={() => saveData()}>
                            <Text style={[styles.loginBtnText, styles.boldFont]}>BEFEJEZÉS</Text>
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
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },

    main: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#B4FB01',
    },
    whiteBox: {
        width: '100%',
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
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },
    inputText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
    },
    postalCity: {
        flexDirection: 'row'
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
});