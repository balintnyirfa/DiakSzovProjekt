import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../config/firebase";

import common from "../styles/common";

export default function AttendanceSheetFirst({ navigation }) {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const [application, setApplication] = useState([]);
    const [applicationSum, setApplicationSum] = useState(0);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const q = query(collection(db, 'applicants'));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                const filteredData = data.filter(item => item.data.user_id === userId && item.data.accepted === true);

                setApplication(filteredData);
                setApplicationSum(filteredData.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppliedJobs();
    }, [userId]);

    const renderAppliedJobs = ({ item }) => {
        const appliedAtDate = item.data.applied_at.toDate();
        const formattedDate = appliedAtDate.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const acceptedText = item.data.accepted ? 'Elfogadva' : 'Nincs elfogadva';

        return (
            <TouchableOpacity style={[common.itemBoxBase, common.borderStyle]} onPress={() => navigation.navigate('AttendanceSheetSecond', { jobData: item.data })}>
                <View style={common.itemBoxSides}>
                    <Text style={[styles.jobTitles, common.boldFont, common.darkBrownColor]}>{item.data.job_name}</Text>
                    <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{acceptedText}</Text>
                </View>
                <View style={common.itemBoxSides}>
                    <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{item.data.company_name}</Text>
                    <Text style={[styles.jobTitles, common.lightFont, common.darkBrownColor]}>{formattedDate}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={common.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <Pressable style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text style={[common.boldFont, common.darkBrownColor]}>Vissza</Text>
                </Pressable>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[common.boldFont, common.bigSize, common.darkBrownColor]}>Jelenlétim</Text>
                </View>
            </View>
            <View style={styles.jobs}>
                <Text style={[common.regularFont, common.regularSize, styles.longText, common.darkBrownColor]}>Kattints arra a munkára, ahol dolgoztál és rögzítsd az óráid!</Text>
                <FlatList
                    data={application}
                    renderItem={renderAppliedJobs}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    jobs: {
        flex: 1,
        width: '100%',
        flexDirection: 'Column',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    topView: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    jobTitles: {
        fontSize: 18,
        color: '#373B2C'
    },
    longText: {
        textAlign: "left",
        marginBottom: 10
    }
});