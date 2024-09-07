import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { db } from "../config/firebase";
import { getAuth, updateEmail } from "firebase/auth";

export default function UserUpdateView({ navigation }) {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const user = auth.currentUser;
    const [userData, setUserData] = useState([]);

    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState();
    const [telephone, setTelephone] = useState('');
    const [postalCode, setPostalCode] = useState(0);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const [idCardNum, setIdCardNum] = useState('');
    const [tajNum, setTajNum] = useState('');
    const [studentIdNum, setStudentIdNum] = useState('');
    const [taxIdNum, setTaxIdNum] = useState('');
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.log('User is not authenticated');
                return;
            }

            try {
                const userDoc = doc(db, 'users', userId);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setEmail(data.email || '');
                    setBirthdate(data.birthdate ? data.birthdate.toDate().toLocaleDateString('hu-HU') : '');
                    setTelephone(data.telephone || '');
                    setPostalCode(data.postalCode || '');
                    setCity(data.city || '');
                    setAddress(data.address || '');

                    setIdCardNum(data.idCardNum || '');
                    setTajNum(data.tajNum || '');
                    setStudentIdNum(data.studentIdNum || '');
                    setTaxIdNum(data.taxIdNum || '');
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userId]);

    const updatePersonalData = async () => {
        if (isEditing) {
            console.log('Szerkeszthető!')
            try {
                const userDoc = doc(db, 'users', userId);
                await updateDoc(userDoc, {
                    email,
                    birthdate,
                    telephone,
                    address
                });
                console.log("Document successfully updated!");
            } catch (error) {
                console.log("Error updating document: ", error);
            }
            setIsEditing(!isEditing);
        }
        setIsEditing(!isEditing);
    };

    const otherData = async () => {
        if (isEditing) {
            console.log('Szerkeszthető!')
            try {
                const userDoc = doc(db, 'users', userId);
                await updateDoc(userDoc, {
                    idCardNum,
                    tajNum,
                    studentIdNum,
                    taxIdNum
                });
                console.log("Document successfully updated!");
            } catch (error) {
                console.log("Error updating document: ", error);
            }
            setIsEditing(!isEditing);
        }
        setIsEditing(!isEditing);
    };

    return (
        <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.topView]}>
                    <Pressable style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text>Vissza</Text>
                    </Pressable>
                </View>
                <View style={styles.pictureBox}>
                    <Image source={{ uri: 'https://i.postimg.cc/xTCvWQqh/profile.png', }} style={[styles.profileImage, styles.borderStyle]} />
                    <Pressable>
                        <Text style={[styles.regularFont, styles.regularSize]}>Kép módosítás</Text>
                    </Pressable>
                </View>
                <View style={[styles.boxes]}>
                    <View style={[styles.box, styles.greenBox, styles.borderStyle]}>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('PasswordReset')}>
                            <Text style={[styles.boldFont, styles.mediumSize, styles.whiteText]}>Jelszó módosítás</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.box, styles.borderStyle]}>
                        <Text style={[styles.boldFont, styles.mediumSize, styles.header]}>Személyes adatok</Text>
                        <Text style={[styles.regularFont, styles.regularSize]}>Email cím</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='email-address'
                            onChangeText={text => setEmail(text)}
                            value={email}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize]}>Születési dátum</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setBirthdate(text)}
                            value={birthdate}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize]}>Telefonszám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='phone-pad'
                            onChangeText={text => setTelephone(text)}
                            value={telephone}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize]}>Lakcím</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={number => setPostalCode(number)}
                            value={postalCode}
                            editable={isEditing} />
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setCity(text)}
                            value={city}
                            editable={isEditing} />
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setAddress(text)}
                            value={address}
                            editable={isEditing} />
                        <Pressable style={[styles.button, styles.modifyButtons]} onPress={updatePersonalData}>
                            <Text style={[styles.boldFont, styles.mediumSize, styles.whiteText]}>MÓDOSÍTÁS</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.box, styles.borderStyle, styles.greenBox]}>
                        <Text style={[styles.boldFont, styles.mediumSize, styles.header, styles.whiteText]}>Egyéb adatok</Text>
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Személyi szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setIdCardNum(text)}
                            value={idCardNum}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>TAJ szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setTajNum(text)}
                            value={tajNum}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Diák igazolvány szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setStudentIdNum(text)}
                            value={studentIdNum}
                            editable={isEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Adószám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setTaxIdNum(text)}
                            value={taxIdNum}
                            editable={isEditing} />
                        <Pressable style={[styles.button, styles.modifyButtons, { backgroundColor: '#B4FB01' }]} onPress={otherData}>
                            <Text style={[styles.boldFont, styles.mediumSize, { color: '#373B2C' }]}>MÓDOSÍTÁS</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
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
        color: '#373B2C'
    },
    header: {
        marginBottom: 13
    },
    regularSize: {
        fontSize: 17
    },
    mediumSize: {
        fontSize: 22,
    },
    whiteText: {
        color: '#FFFFFF',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField: {
        marginVertical: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 15
    },

    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    main: {
        flex: 1,
        width: '100%',
        //alignItems: 'center',
        //fontSize: 200,
        backgroundColor: '#B4FB01',
    },
    topView: {
        width: '100%',
        padding: 10
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    pictureBox: {
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 120,
        height: 120,
        marginBottom: 5,
        borderRadius: 100,
        backgroundColor: '#E1E1E1'
    },
    boxes: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    greenBox: {
        backgroundColor: '#373B2C'
    },
    box: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 30
    },
    modifyButtons: {
        width: '80%',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#687A3C',
    }
})