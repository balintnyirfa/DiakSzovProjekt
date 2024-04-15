import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../config/firebase";
import { get } from "firebase/database";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Home() {
    const [name, setName] = useState('');
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const email = user.email;
            const name = "Bálint";
            setName(email ? email : '');
        } else {
            // User is signed out
            // ...
        }
    });

    return (
        <View style={styles.main}>            
            <StatusBar backgroundColor="#E1E1E1"/>
            <View style={styles.header}>
                <Text style={[styles.boldFont, styles.headerWelcome]}>Üdv,</Text>
                <TextInput
                    style={[styles.regularFont, styles.headerName]}
                    editable={false}
                    onChangeText={text => setName(text)}
                    value={name} />
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
        backgroundColor: '#DBBEA1',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        backgroundColor: '#E1E1E1',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerWelcome: {
        fontSize: 40,
        margin: 0
    },
    headerName: {
        fontSize: 28,
        margin: 0
    }
})