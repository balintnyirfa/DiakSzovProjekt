import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, db } from "../config/firebase";


export default function Home({ navigation }) {
    const [name, setName] = useState('');

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                setName(userDocSnap.data().name);
            } else {
                console.log("No such document!");
            }
        } else {
            // User is signed out
            // ...
        }
    });

    const [jobs, setJobs] = useState([]);

    const [jobSum, setJobSum] = useState(0);

    const fetchJobData = async () => {
        try {
            //setLoading(true);

            const q = await query(collection(db, 'jobs'), limit(2));

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
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.boldFont, styles.headerWelcome]}>Üdv,</Text>
                    <Text style={[styles.regularFont, styles.headerName]}>{name}</Text>
                </View>
                <View style={styles.jobs}>
                    <Text style={[styles.boldFont, styles.title]}>Friss munkáink</Text>
                    {
                        //loading ? 
                        //(
                        //    <View>
                        //        <Text>Loading...</Text>
                        //    </View>) : 
                        (jobs.map((job) =>
                                <View key={job.id} style={[styles.jobCard, styles.borderStyle]}>
                                    <View style={styles.jobNamePart}>
                                        <Text style={[styles.jobTitles, styles.boldFont]}>{job.data.company}</Text>
                                    </View>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.name}</Text>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.city}</Text>
                                    </View>
                                </View>
                        ))
                    }
                </View>
                <View style={styles.jobs}>
                    <Text style={[styles.boldFont, styles.title]}>Hírek</Text>
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
    },
    title: {
        fontSize: 27,
        marginBottom: 10,
        color: '#373B2C'
    },
    jobs: {
        width: '100%',
        paddingHorizontal: 15,
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
})