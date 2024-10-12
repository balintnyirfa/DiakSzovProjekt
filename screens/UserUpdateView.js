import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';
import { getAuth, updateEmail } from 'firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';

export default function UserUpdateView({ navigation }) {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const user = auth.currentUser;
    const [userData, setUserData] = useState([]);
    const [userOtherData, setUserOtherData] = useState([]);

    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState();
    const [telephone, setTelephone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const [idCardNum, setIdCardNum] = useState('');
    const [tajNum, setTajNum] = useState('');
    const [studentIdNum, setStudentIdNum] = useState('');
    const [taxIdNum, setTaxIdNum] = useState('');

    const [profileImage, setProfileImage] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [isOtherEditing, setIsOtherEditing] = useState(false);

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
                    setBirthdate(data.birthdate || '');
                    setTelephone(data.telephone || '');
                    setPostalCode(data.postal_code || '');
                    setCity(data.city || '');
                    setAddress(data.address || '');
                    //setProfileImage(data.profileImage || '');
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchOtherData = async () => {
            if (!userId) {
                console.log('User is not authenticated');
                return;
            }

            try {
                const userOtherDoc = doc(db, 'user_data', userId);
                const docOtherSnap = await getDoc(userOtherDoc);

                if (docOtherSnap.exists()) {
                    const data = docOtherSnap.data();
                    setUserOtherData(data);

                    setIdCardNum(data.id_card_num || '');
                    setTajNum(data.taj_num || '');
                    setStudentIdNum(data.student_id_num || '');
                    setTaxIdNum(data.tax_id_num || '');
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchProfileImage = async () => {
            try {
                const storage = getStorage();
                const reference = ref(storage, `profileImages/${userId}/profile.jpg`);
                getDownloadURL(reference).then((url) => {
                    setProfileImage(url);
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
        fetchOtherData();
        fetchProfileImage();
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
                    postalCode,
                    city,
                    address
                });
                Alert.alert('Siker!', 'Frissítetted az adataid!');
                console.log('Document successfully updated!');
            } catch (error) {
                console.log('Error updating document: ', error);
            }
            setIsEditing(!isEditing);
        }
        setIsEditing(!isEditing);
    };

    const otherData = async () => {
        if (isOtherEditing) {
            console.log('Szerkeszthető!')
            try {
                const userDoc = doc(db, 'user_data', userId);
                await updateDoc(userDoc, {
                    idCardNum,
                    tajNum,
                    studentIdNum,
                    taxIdNum
                });
                Alert.alert('Siker!', 'Frissítetted az adataid!');
                console.log('Document successfully updated!');
            } catch (error) {
                console.log('Error updating document: ', error);
            }
            setIsOtherEditing(!isOtherEditing);
        }
        setIsOtherEditing(!isOtherEditing);
    };

    const uploadImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo' });
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uploadUrl = result.assets[0].uri;
                const storage = getStorage();
                //let filename = `${userId}/${result.assets[0].fileName}`;
                let filename = `${userId}/profile.jpg`;
                const uploadRef = ref(storage, `profileImages/${filename}`);

                try {
                    const response = await fetch(uploadUrl);
                    const blob = await response.blob();
                    await uploadBytes(uploadRef, blob);
                    const url = await getDownloadURL(uploadRef);
                    setProfileImage(url);
                } catch (error) {
                    console.log("Error 2: ", error)
                    return;
                }
            }
        } catch (error) {
            console.log('Error 1:', error);
            return;
        };
    };

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.topView]}>
                    <Pressable style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={styles.fontColor}>Vissza</Text>
                    </Pressable>
                </View>
                <View style={styles.pictureBox}>
                    <Image
                        source={profileImage ? { uri: profileImage } : require("../assets/images/profile.png")}
                        style={[styles.profileImage, styles.borderStyle]} />
                    <TouchableOpacity onPress={uploadImage}>
                        <Text style={[styles.regularFont, styles.regularSize]}>Kép módosítás</Text>
                    </TouchableOpacity>
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
                        <View style={[styles.postalCity]}>
                            <TextInput
                                style={[styles.inputField, { flex: 1 }]}
                                keyboardType='number-pad'
                                onChangeText={text => setPostalCode(text)}
                                value={postalCode.toString()}
                                editable={isEditing} />
                            <TextInput
                                style={[styles.inputField, { marginLeft: 10, flex: 4 }]}
                                keyboardType='default'
                                onChangeText={text => setCity(text)}
                                value={city}
                                editable={isEditing} />
                        </View>
                        <TextInput
                            style={[styles.inputField, { marginTop: 0 }]}
                            keyboardType='default'
                            onChangeText={text => setAddress(text)}
                            value={address}
                            editable={isEditing} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Pressable style={[styles.button, styles.modifyButtons]} onPress={updatePersonalData}>
                                <Text style={[styles.boldFont, styles.mediumSize, styles.whiteText]}>MÓDOSÍTÁS</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.box, styles.borderStyle, styles.greenBox]}>
                        <Text style={[styles.boldFont, styles.mediumSize, styles.header, styles.whiteText]}>Egyéb adatok</Text>
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Személyi szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='default'
                            onChangeText={text => setIdCardNum(text)}
                            value={idCardNum}
                            editable={isOtherEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>TAJ szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setTajNum(text)}
                            value={tajNum}
                            editable={isOtherEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Diák igazolvány szám</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType='number-pad'
                            onChangeText={text => setStudentIdNum(text)}
                            value={studentIdNum}
                            editable={isOtherEditing} />
                        <Text style={[styles.regularFont, styles.regularSize, styles.whiteText]}>Adószám</Text>
                        <TextInput
                            style={[styles.inputField]}
                            keyboardType='number-pad'
                            onChangeText={text => setTaxIdNum(text)}
                            value={taxIdNum}
                            editable={isOtherEditing} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Pressable style={[styles.button, styles.modifyButtons, { backgroundColor: '#B4FB01' }]} onPress={otherData}>
                                <Text style={[styles.boldFont, styles.mediumSize, { color: '#373B2C' }]}>MÓDOSÍTÁS</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
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
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        color: "#000",
        marginTop: 8,
        marginBottom: 12,
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
    },
    postalCity: {
        flexDirection: 'row'
    },
})