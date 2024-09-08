import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, limit, onSnapshot, query, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedbackComponent, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config/firebase';


export default function Home({ navigation }) {
    const [name, setName] = useState('');
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                setName(userDocSnap.data().name);
            } else {
                console.log('No such document!');
            }
        } else {
            // User is signed out
        }
    });


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, 'job_categories'));
                const querySnapshot = await getDocs(q);
                const categoriesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                setCategories(categoriesData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchJobData = async () => {
            try {
                const q = query(collection(db, 'jobs'));
                const querySnapshot = await getDocs(q);
                const jobsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                const jobsWithCategoryData = await Promise.all(jobsData.map(async job => {
                    const categoryDoc = await getDoc(doc(db, 'job_categories', job.data.category_id));
                    const categoryData = categoryDoc.exists() ? categoryDoc.data() : null;
                    return { ...job, category: categoryData };
                }));

                const latestTwoJobs = jobsWithCategoryData
                    .sort((a, b) => b.data.created_at - a.data.created_at)
                    .slice(0, 2);

                setJobs(latestTwoJobs);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobData();
        fetchCategories();
    }, []);

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#373B2C' barStyle={'light-content'}/>
            <ScrollView style={{width: '100%', flex: 1}}>
                <View style={styles.header}>
                    <Text style={[styles.boldFont, styles.headerWelcome]}>Üdv,</Text>
                    <Text style={[styles.regularFont, styles.headerName]}>{name}</Text>
                </View>
                <View style={styles.jobs}>
                    <Text style={[styles.boldFont, styles.title]}>Friss munkáink</Text>
                    {
                        (jobs.map((job) =>
                            <TouchableOpacity key={job.id} onPress={() => navigation.navigate('JobDetails', { jobData: job.data, jobCategory: job.category, jobId: job.id })}>
                                <View key={job.id} style={[styles.jobCard, styles.borderStyle]}>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.boldFont]}>{job.data.company}</Text>
                                        <Text style={[styles.jobTitles, styles.lightFont]}>{job.category.name}</Text>
                                    </View>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.name}</Text>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.city}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView >
        </View >
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