import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../config/firebase";

export default function AttendanceSheetFirst({ navigation }) {
    const auth = getAuth();
    //const user = auth.currentUser; asdasd
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
            <TouchableOpacity style={[styles.jobCard, styles.borderStyle]} onPress={() => navigation.navigate('AttendanceSheetSecond', { jobData: item.data })}>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, styles.boldFont]}>{item.data.job_name}</Text>
                    <Text style={[styles.jobTitles, styles.regularFont]}>{acceptedText}</Text>
                </View>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, styles.regularFont]}>{item.data.company_name}</Text>
                    <Text style={[styles.jobTitles, styles.lightFont]}>{formattedDate}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <Pressable style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text>Vissza</Text>
                </Pressable>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[styles.boldFont, styles.bigSize]}>Jelenlétim</Text>
                </View>
            </View>
            <View style={styles.jobs}>
                <Text style={[styles.regularFont, styles.regularSize, styles.longText]}>Kattints arra a munkára, ahol dolgoztál és rögzítsd az óráid!</Text>
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
    regularSize: {
        fontSize: 17
    },
    mediumSize: {
        fontSize: 22
    },
    bigSize: {
        fontSize: 30
    },
    whiteText: {
        color: '#FFFFFF',
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
    jobCard: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },
    jobOtherPart: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        width: '100%'
    },
    jobTitles: {
        fontSize: 18,
        color: '#373B2C'
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },
    longText: {
        textAlign: "left",
        marginBottom: 10
    }
});