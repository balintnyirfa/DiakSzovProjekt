import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';

export default function Jobs({ navigation, route }) {
    //const [loading, setLoading] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [jobSum, setJobSum] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch categories from Firestore
                const q = query(collection(db, 'job_categories'));
                const querySnapshot = await getDocs(q);
                const categoriesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                // Update state with categories data
                setCategories(categoriesData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchJobData = async () => {
            try {
                // Fetch jobs from Firestore
                const q = query(collection(db, 'jobs'));
                const querySnapshot = await getDocs(q);
                const jobsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                // For each job, fetch its category and combine the data
                const jobsWithCategoryData = await Promise.all(jobsData.map(async job => {
                    const categoryDoc = await getDoc(doc(db, 'job_categories', job.data.category_id));
                    const categoryData = categoryDoc.exists() ? categoryDoc.data() : null;
                    console.log(`Job ID: ${job.id}, Category Data: ${categoryData ? categoryData.name : 'No Category'}`);
                    return { ...job, category: categoryData };
                }));

                // Update state with combined data
                setJobs(jobsWithCategoryData);
                setJobSum(jobsWithCategoryData.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobData();
        fetchCategories();
    }, []);

    // Filter jobs based on selected category
    const filteredJobs = selectedCategory
        ? jobs.filter(job => job.data.category_id === selectedCategory)
        : jobs;

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#373B2C" />
            <View style={[styles.header, styles.borderStyle]}>
                <Text style={[styles.boldFont, styles.headerWelcome]}>Aktuális munkáink</Text>
                <Text style={[styles.regularFont, styles.headerName]}>Aktív: {jobSum} db</Text>
            </View>
            <View style={styles.categories}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        (categories.map((category, index) =>
                            <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(prevCategory => prevCategory === category.id ? null : category.id)}>
                                <View key={category.id} style={[styles.categoryCard, styles.borderStyle, index === 0 && styles.firstCategoryCard]}>
                                    <Text style={[styles.jobTitles, styles.boldFont]}>{category.data.name}</Text>
                                </View>
                            </TouchableOpacity>

                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.jobs}>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                    {
                        /*loading ?
                            (
                            <View>
                            <Text>Loading...</Text>
                            </View>) :
                        */
                        (filteredJobs.map((job) =>
                            <TouchableOpacity key={job.id} onPress={() => navigation.navigate('JobDetails', { jobData: job.data })}>
                                <View key={job.id} style={[styles.jobCard, styles.borderStyle]}>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.boldFont]}>{job.data.company}</Text>
                                        <Text style={[styles.jobTitles, styles.lightFont]}>{job.category ? job.category.name : 'No category!'}</Text>
                                    </View>
                                    <View style={styles.jobOtherPart}>
                                        <Text style={[styles.jobTitles, styles.regularFont]}>{job.data.name}</Text>
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
    categories: {
        width: '100%',
        flexDirection: 'column',
        paddingVertical: 10
    },
    firstCategoryCard: {        
        width: 200,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    categoryCard: {
        width: 200,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginHorizontal: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    jobs: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
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