import { setDoc, query, doc, getDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, StatusBar, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';
import common from "../styles/common";

export default function JobDetails({ navigation, route }) {
    const { jobData, jobCategory, jobId } = route.params;
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const createAlert = () => {
        Alert.alert('Siker!', 'Sikeres jelentkezés!');
    };

    const checkIfApplied = async () => {
        const q = query(
            (db, 'applicants'),
            where('user_id', '==', userId),
            where('job_id', '==', jobId));
        const querySnapshot = await getDoc(q);
        console.log(querySnapshot.size());
    }

    const applyForJob = async () => {
        try {
            const userId = auth.currentUser?.uid || '';
            const applicationId = uuid.v4();
            const newApply = {
                email: auth.currentUser?.email,
                job_id: jobId,
                job_name: jobData.name,
                company_name: jobData.company,
                accepted: false,
                applied_at: new Date(),
                user_id: userId
            };
            setDoc(doc(db, 'applicants', applicationId), newApply)
                .then(() => {
                    createAlert();
                    navigation.navigate('Jobs');
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={common.main}>
            <StatusBar backgroundColor='#373B2C' barStyle={'light-content'} />
            <View style={[styles.header, common.borderStyle]}>
                <Text style={[common.boldFont, styles.headerText, common.darkBrownColor]}>{jobData.company}</Text>
                <Text style={[common.regularFont, styles.headerName, common.darkBrownColor]}>{jobData.city}</Text>
                <Pressable style={[styles.applyButton]} onPress={applyForJob}>
                    <Text style={[styles.applyButtonText, common.boldFont]}>JELENTKEZEK</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.jobs}>
                    <View style={[styles.jobCard, styles.boxes, common.borderStyle]}>
                        <Text style={[common.boldFont, styles.jobTitles, common.darkBrownColor]}>Pozíció: </Text>
                        <Text style={[common.regularFont, styles.jobTitles, common.darkBrownColor]}>{jobData.name}</Text>
                    </View>
                    <View style={[styles.jobCard, styles.boxes, common.borderStyle]}>
                        <Text style={[common.boldFont, styles.jobTitles, common.darkBrownColor]}>Fizetés: </Text>
                        <Text style={[common.regularFont, styles.jobTitles, common.darkBrownColor]}>{jobData.payment} Forint/óra</Text>
                    </View>
                    <View style={[styles.jobCard, styles.boxes, common.borderStyle]}>
                        <Text style={[common.boldFont, styles.jobTitles, common.darkBrownColor]}>Kategória:</Text>
                        <Text style={[common.regularFont, styles.jobTitles, common.darkBrownColor]}>{jobCategory.name}</Text>
                    </View>
                    <View style={[styles.boxes, common.borderStyle, styles.jobCard]}>
                        <Text style={[common.boldFont, styles.headerText, common.darkBrownColor]}>Leírás</Text>
                        <Text style={[common.regularFont, styles.jobTitles, common.darkBrownColor]}>{jobData.description}</Text>
                    </View>
                </View>
                <View style={styles.returnBox}>
                    <Pressable style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={[styles.returnBtnText, common.boldFont]}>Vissza</Text>
                    </Pressable>
                </View>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
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