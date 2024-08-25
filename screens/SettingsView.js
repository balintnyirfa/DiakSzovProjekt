import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

export default function Settings({ navigation }) {
    //const user = auth.currentUser;
    const auth = getAuth();

    const handlePicChange = () => {
        //Profilkép csere
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('Welcome');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.main}>
            <View style={[styles.topView, styles.borderStyle]}>
                <Image
                    source={{
                        uri: 'https://i.postimg.cc/xTCvWQqh/profile.png',
                    }}
                    style={[styles.profileImage, styles.borderStyle]} />
                <Text style={[styles.boldFont, styles.nameText]}>Bálint</Text>
            </View>
            <View style={[styles.bottomView]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.topSection, styles.borderStyle]}>
                        <Text style={[styles.header, styles.boldFont]}>Adataim</Text>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Fiók adatok</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Értesítések</Text>
                        </Pressable>
                        <Pressable onPress={handleLogout}>
                            <Text style={[styles.text, styles.regularFont]}>Kijelentkezés</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.section, styles.borderStyle]}>
                        <Text style={[styles.header, styles.boldFont]}>Egyéb</Text>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Munkáim</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Érdeklődési köreim</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Jelenlétim</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={[styles.text, styles.regularFont]}>Bérkalkulátor</Text>
                        </Pressable>
                    </View>
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
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        fontSize: 200,
        backgroundColor: '#B4FB01',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: '#E1E1E1'
    },
    nameText: {
        fontSize: 32,
        color: '#373B2C'
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
    }
})