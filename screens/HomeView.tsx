import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../config/firebase";
import { get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Home() {
    const [name, setName] = useState('');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const name = auth.currentUser?.email;
            setName(name ? name : 'hiba');
        } else {
            // User is signed out
            // ...
        }
    });

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#373B2C" />
            <View style={styles.header}>
                <Text style={[styles.boldFont, styles.headerWelcome]}>Üdv,</Text>
                <Text style={[styles.regularFont, styles.headerName]}>{name}</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#B4FB01',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    headerWelcome: {
        color: '#373B2C',
        fontSize: 40,
        margin: 0
    },
    headerName: {
        fontSize: 28,
        margin: 0
    }
})