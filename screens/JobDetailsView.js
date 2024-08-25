import { getAuth } from "firebase/auth";
import { setDoc, query, collection, getDocs, setCategories, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, StatusBar, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';

export default function JobDetails({ navigation, route }) {
    const { jobData } = route.params;
    const auth = getAuth();

    const createAlert = () => {
        Alert.alert('Siker!', 'Sikeres jelentkezés!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    };

    const applyForJob = async () => {
        try {
            const userId = auth.currentUser?.uid || '';
            const applicationId = uuid.v4(); // Generate a unique ID for the application
            const newApply = {
                email: auth.currentUser?.email,
                jobName: jobData.name,
                companyName: jobData.company,
                accepted: false,
                appliedAt: new Date(),
                userId: userId,
                //jobId: jobData?.id,
            };
            setDoc(doc(db, 'applicants', applicationId), newApply)
                .then(() => {
                    createAlert();
                    navigation.navigate('Jobs');
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#373B2C" />
            <View style={[styles.header, styles.borderStyle]}>
                <Text style={[styles.boldFont, styles.headerText]}>{jobData.company}</Text>
                <Text style={[styles.regularFont, styles.headerName]}>{jobData.city}</Text>
                <Pressable style={[styles.applyButton]} onPress={applyForJob}>
                    <Text style={[styles.applyButtonText, styles.boldFont]}>JELENTKEZEK</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.jobs}>
                    <View style={[styles.jobCard, styles.boxes, styles.borderStyle]}>
                        <Text style={[styles.boldFont, styles.jobTitles]}>Pozíció: </Text>
                        <Text style={[styles.regularFont, styles.jobTitles]}>{jobData.name}</Text>
                    </View>
                    <View style={[styles.jobCard, styles.boxes, styles.borderStyle]}>
                        <Text style={[styles.boldFont, styles.jobTitles]}>Fizetés: </Text>
                        <Text style={[styles.regularFont, styles.jobTitles]}>{jobData.payment} Forint/óra</Text>
                    </View>
                    <View style={[styles.jobCard, styles.boxes, styles.borderStyle]}>
                        <Text style={[styles.boldFont, styles.jobTitles]}>Kategória:</Text>
                        <Text style={[styles.regularFont, styles.jobTitles]}>Név</Text>
                    </View>
                    <View style={[styles.boxes, styles.borderStyle, styles.jobCard]}>
                        <Text style={[styles.boldFont, styles.headerText]}>Leírás</Text>
                        <Text style={[styles.regularFont, styles.jobTitles]}>{jobData.description}</Text>
                    </View>
                </View>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnButton]} onPress={() => navigation.navigate('Jobs')}>
                        <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={[styles.returnBtnText, styles.boldFont]}>Vissza</Text>
                    </Pressable>
                </View>
            </ScrollView>


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
    scrollView: {
        width: '100%'
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    headerText: {
        fontSize: 38,
        margin: 0,
        color: '#373B2C'
    },
    headerName: {
        fontSize: 28,
        margin: 0
    },
    boxes: {
        width: '100%',
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        paddingVertical: 12
    },
    jobs: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    jobCard: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    jobTitles: {
        fontSize: 22,
        color: '#373B2C'
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    returnBox: {
        width: '100%',
        padding: 20
    },
    arrow: {
        height: 30,
        width: 30,
    },
    returnButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '27%'
    },
    returnBtnText: {
        color: '#373B2C',
        fontSize: 16,
    },
    applyButton: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#687A3C",
        borderRadius: 15,
        marginTop: 22,
        paddingVertical: 8
    },
    applyButtonText: {
        fontSize: 22,
        color: '#FFFFFF'
    }
})