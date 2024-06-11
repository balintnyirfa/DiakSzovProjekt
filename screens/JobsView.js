import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';

export default function Jobs({ navigation }) {
    //const [loading, setLoading] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [jobSum, setJobSum] = useState(0);

    const fetchJobData = async () => {
        try {
            //setLoading(true);

            const q = await query(collection(db, 'jobs'));

            await onSnapshot(q, (querySnapshot) => {
                setJobs(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
                setJobSum(querySnapshot.size);
            });
            //setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobData();
    });

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#373B2C" />
            <View style={[styles.header, styles.borderStyle]}>
                <Text style={[styles.boldFont, styles.headerWelcome]}>Aktuális munkáink</Text>
                <Text style={[styles.regularFont, styles.headerName]}>Aktív: {jobSum} db</Text>
            </View>
            <View style={styles.jobs}>
                <ScrollView>
                    {
                        //loading ? 
                        //(
                        //    <View>
                        //        <Text>Loading...</Text>
                        //    </View>) : 
                        (jobs.map((job) =>
                            <TouchableOpacity key={job.id} onPress={() => navigation.navigate('JobDetails', { jobData: job.data })}>
                                <View key={job.id} style={[styles.jobCard, styles.borderStyle]}>
                                    <View style={styles.jobNamePart}>
                                        <Text style={[styles.jobTitles, styles.boldFont]}>{job.data.name}</Text>
                                    </View>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.city}</Text>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.city}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
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
        color: '#373B2C',
    },
    headerWelcome: {
        fontSize: 38,
        margin: 0,
        color: '#373B2C'
    },
    headerName: {
        fontSize: 28,
        margin: 0
    },
    jobs: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    jobCard: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },
    jobNamePart: {
        width: '100%'
    },
    jobOtherPart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '100%'
    },
    jobTitles: {
        fontSize: 22,
        color: '#373B2C'
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
});