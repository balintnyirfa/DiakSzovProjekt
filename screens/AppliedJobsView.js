import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

export default function AppliedJobs({ navigation }) {
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

                const filteredData = data.filter(item => item.data.userId === userId);

                setApplication(filteredData);
                setApplicationSum(filteredData.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppliedJobs();
    }, [userId]);

    const renderAppliedJobs = ({ item }) => {
        const appliedAtDate = item.data.appliedAt.toDate();
        const formattedDate = appliedAtDate.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const acceptedText = item.data.accepted ? 'Accepted' : 'Not Accepted';

        return (
            <View style={[styles.jobCard, styles.borderStyle]}>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, styles.boldFont]}>{item.data.jobName}</Text>
                    <Text style={[styles.jobTitles, styles.regularFont]}>{acceptedText}</Text>
                </View>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, styles.regularFont]}>{item.data.companyName}</Text>
                    <Text style={[styles.jobTitles, styles.lightFont]}>{formattedDate}</Text>
                </View>
            </View>
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
                    <Text style={[styles.boldFont, styles.bigSize]}>Jelentkezéseim</Text>
                    <Text style={[styles.regularFont, styles.mediumSize]}>Munkák száma: {applicationSum} db</Text>
                </View>
            </View>
            <View style={styles.jobs}>
                <FlatList
                    data={application}
                    renderItem={renderAppliedJobs}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    );
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
    }
});