import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Settings({navigation}) {
    const [name, setName] = useState('Bálint');

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const [isEditable, setIsEditable] = useState(false);
    const [buttonText, setbuttonText] = useState('Szerkesztés');

    //const auth = getAuth();
    const user = auth.currentUser;

    const handlePicChange = () => {
        //PRofilkép csere
    }

    const handleUpdate = () => {
        setIsEditable(previousValue => !previousValue);
        if (isEditable) {
            //Szerkesztés
            setbuttonText('Szerkesztés');
            console.log('Szerkesztés');
        } else {
            //Mentés
            setbuttonText('Mentés');
            console.log('Mentés');

            if (user) {
                /*const updatedUser = {
                    displayName: newName,
                    email: newEmail,
                    phoneNumber: newPhone,
                };*/
                updateCurrentUser(auth, user).then(() => {
                    console.log('Sikeres mentés');
                }).catch((error) => {
                    console.log('Hiba történt: ', error);
                });
            } else {
                console.log('Nincs felhasználó');
            }

        }

    }

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate('Welcome');
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.main}>
            <View style={styles.topView}>
                <Image
                    source={{
                        uri: 'https://i.postimg.cc/xTCvWQqh/profile.png',
                    }}
                    style={[styles.profileImage, styles.borderStyle]} />
                <Text style={[styles.boldFont, styles.nameText]}>{name}</Text>
            </View>
            <View style={[styles.bottomView, styles.borderStyle]}>
                <ScrollView>
                    <Text style={[styles.header, styles.boldFont]}>Adataim</Text>
                    <Text style={[styles.text, styles.regularFont]}>Változtasd meg az adataidat!</Text>
                    <TextInput
                        style={styles.inputField} placeholder="Név"
                        editable={isEditable}
                        defaultValue='Nevem' />
                    <TextInput
                        style={styles.inputField} placeholder="Email cím"
                        keyboardType='email-address'
                        editable={isEditable}
                        defaultValue='Email címem' />
                    <TextInput
                        style={styles.inputField} placeholder="Telefonszám"
                        keyboardType='phone-pad'
                        editable={isEditable}
                        defaultValue='Telefonszámom' />
                    <Pressable onPress={handleUpdate} style={[styles.loginBtn]}>
                        <Text style={[styles.loginBtnText, styles.boldFont]}>{buttonText}</Text>
                    </Pressable>
                    <Pressable onPress={handleLogout} style={[styles.loginBtn]}>
                        <Text style={[styles.loginBtnText, styles.boldFont]}>KIJELENTKEZÉS</Text>
                    </Pressable>
                </ScrollView>
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
        alignItems: 'center',
        fontSize: 200,
        backgroundColor: '#B4FB01',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#E1E1E1'
    },
    nameText: {
        fontSize: 32,
        color: '#373B2C'
    },
    topView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#B4FB01',
    },
    bottomView: {
        flex: 3,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    //picSwapButtonView: {
    //    width: '100%',
    //    alignItems: 'flex-end',
    //},
    header: {
        fontSize: 32,
        color: '#373B2C'
    },
    text: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },
    inputField: {
        borderRadius: 6,
        width: '100%',
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },
    loginBtn: {
        backgroundColor: '#687A3C',
        borderRadius: 6,
        marginBottom: 70,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    loginBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
})