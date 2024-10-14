import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { BackHandler, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config/firebase';
import common from '../styles/common';

export default function Home({ navigation }) {
    const [name, setName] = useState('');
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const backAction = () => {
            // Prevent the default behavior of going back
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

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
            console.log('User is logged out!');
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
        <View style={common.main}>
            <StatusBar backgroundColor='#373B2C' barStyle={'light-content'}/>
            <ScrollView style={{width: '100%', flex: 1}}>
                <View style={styles.header}>
                    <Text style={[common.boldFont, styles.headerWelcome, common.darkBrownColor]}>Üdv,</Text>
                    <Text style={[common.regularFont, styles.headerName, common.darkBrownColor]}>{name}</Text>
                </View>
                <View style={styles.jobs}>
                    <Text style={[common.boldFont, styles.title, common.darkBrownColor]}>Friss munkáink</Text>
                    {
                        (jobs.map((job) =>
                            <TouchableOpacity key={job.id} onPress={() => navigation.navigate('JobDetails', { jobData: job.data, jobCategory: job.category, jobId: job.id })}>
                                <View key={job.id} style={[styles.jobCard, common.borderStyle]}>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, common.boldFont, common.darkBrownColor]}>{job.data.company}</Text>
                                        <Text style={[styles.jobTitles, common.lightFont, common.darkBrownColor]}>{job.category.name}</Text>
                                    </View>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{job.data.name}</Text>
                                        <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{job.data.city}</Text>
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
})