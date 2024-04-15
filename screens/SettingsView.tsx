import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function Settings () {    
    const handleLogOut = async () => {
        await signOut(auth);
    }
    
    return (
        <View>
            <Pressable onPress={handleLogOut}>
                <Text>KIJELENTKEZÉS</Text>
            </Pressable>
        </View>
    );
}