import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import common from '../styles/common';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Settings({ navigation }) {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const [profileImage, setProfileImage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
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

        const fetchUserData = async () => {
            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                setName(userDocSnap.data().name);
            } else {
                console.log('No such document!');
            }
        }
        fetchUserData();
        fetchProfileImage();
    }, [userId])

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('Welcome');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={common.main}>
            <StatusBar backgroundColor="#373B2C" barStyle={'light-content'} />
            <View style={[styles.topView, common.borderStyle]}>
                <Image
                    source={profileImage ? { uri: profileImage } : require("../assets/images/profile.png")}
                    style={[styles.profileImage, common.borderStyle]} />
                <Text style={[common.boldFont, styles.nameText]}>{name}</Text>
            </View>
            <View style={[styles.bottomView]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.topSection, common.borderStyle]}>
                        <Text style={[styles.header, common.boldFont]}>Adataim</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('UserUpdate')}>
                            <Text style={[styles.text, common.regularFont]}>Fiók adatok</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.text, common.regularFont]}>Kapcsolat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={[styles.text, common.regularFont]}>Kijelentkezés</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.section, common.borderStyle]}>
                        <Text style={[styles.header, common.boldFont]}>Egyéb</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AppliedJobs')}>
                            <Text style={[styles.text, common.regularFont]}>Munkáim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AttendanceSheetFirst')}>
                            <Text style={[styles.text, common.regularFont]}>Jelenlétim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('InterestedCategories')}>
                            <Text style={[styles.text, common.regularFont]}>Érdeklődési köreim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PaymentCalculator')}>
                            <Text style={[styles.text, common.regularFont]}>Bérkalkulátor</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: '#E1E1E1',
    },
    nameText: {
        fontSize: 32,
        color: '#373B2C',
    },
    topView: {
        width: '100%',
        //marginBottom: 10,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    bottomView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 30,
    },
    header: {
        fontSize: 32,
        color: '#373B2C',
    },
    text: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },
    topSection: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },
    section: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
});
