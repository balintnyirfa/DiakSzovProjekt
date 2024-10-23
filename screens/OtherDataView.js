import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import { db } from '../config/firebase';

import common from '../styles/common';

export default function OtherDataView({ navigation, route }) {
    const auth = getAuth();

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

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{4,6}$/;

    const data = [
        { label: 'Férfi', value: 'Férfi' },
        { label: 'Nő', value: 'Nő' },
    ];

    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderGenders = item => {
        return (
            <View style={styles.dropdownList}>
                <Text style={[common.darkBrownColor, common.regularFont]}>{item.label}</Text>
            </View>
        );
    };

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
                gender: gender,
                email: auth.currentUser?.email,
                telephone: telephone,
                birthdate: formattedBirthday,
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
        <View style={common.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={styles.illustrationBox}></View>
            <View style={[styles.whiteBox, common.borderStyle]}>
                <Text style={[styles.header, common.boldFont, common.darkBrownColor]}>KÖVETKEZŐ</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.insideBox}>
                        <Text style={[styles.importantText, common.regularFont, common.darkBrownColor]}>Add meg a személyes adataid a regisztrációd folytatásához!</Text>
                        <View style={[styles.insideBox]}>
                            <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Név</Text>
                            <TextInput
                                style={[common.inputField, common.darkBrownColor, common.regularFont]}
                                keyboardType='default'
                                autoCapitalize='words'
                                onChangeText={text => setName(text)}
                                placeholder='Teljes neved'
                                placeholderTextColor={'#606E3C'}
                                value={name} />

                            <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Nem</Text>
                            <Dropdown
                                style={[styles.dropdown, common.inputField, common.darkBrownColor]}
                                placeholderStyle={[common.placeHolderColor, common.regularFont]}
                                selectedTextStyle={[common.darkBrownColor, common.regularFont]}
                                data={data}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Válassz nemet...' : '...'}
                                value={gender}
                                renderItem={renderGenders}
                                onChange={item => {
                                    setGender(item.value);
                                    setIsFocus(false);
                                }}
                            />

                            <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Telefon</Text>
                            <TextInput
                                style={[common.inputField, common.darkBrownColor, common.regularFont]}
                                keyboardType='phone-pad'
                                onChangeText={text => setTelephone(text)}
                                placeholder='pl. 06301234567'
                                placeholderTextColor={'#606E3C'}
                                value={telephone} />

                            <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Születésnap</Text>
                            <Pressable style={{ width: '100%' }} onPress={showDatepicker}>
                                <TextInput
                                    style={[common.inputField, common.darkBrownColor, common.regularFont]}
                                    editable={false}
                                    value={formattedBirthday}
                                    placeholder='Válassz dátumot!'
                                    placeholderTextColor={'#606E3C'}
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

                            <Text style={[styles.inputText, common.regularFont, common.darkBrownColor]}>Lakcím</Text>
                            <View style={[styles.postalCity]}>
                                <TextInput
                                    style={[common.inputField, common.darkBrownColor, common.regularFont, { flex: 1 }]}
                                    keyboardType='number-pad'
                                    onChangeText={text => setPostalCode(text)}
                                    placeholder='Irsz.'
                                    placeholderTextColor={'#606E3C'}
                                    value={postalCode.toString()} />
                                <TextInput
                                    style={[common.inputField, common.darkBrownColor, common.regularFont, { marginLeft: 10, flex: 4 }]}
                                    keyboardType='default'
                                    onChangeText={text => setCity(text)}
                                    placeholder='Település'
                                    placeholderTextColor={'#606E3C'}
                                    value={city} />
                            </View>
                            <TextInput
                                style={[common.inputField, common.darkBrownColor, common.regularFont]}
                                keyboardType='default'
                                onChangeText={text => setAddress(text)}
                                placeholder='Közterület'
                                placeholderTextColor={'#606E3C'}
                                value={address} />

                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Pressable style={styles.button} onPress={() => saveData()}>
                                <Text style={[styles.buttonText, common.boldFont]}>TOVÁBB</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    illustrationBox: {
        flex: 1,
    },
    whiteBox: {
        flex: 2,
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
        marginTop: 15
    },
    inputText: {
        fontSize: 18,
        marginBottom: 8,
    },
    postalCity: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#687A3C',
        borderRadius: 20,
        marginBottom: 70,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 0,
    },
    dropdownList: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    }
});