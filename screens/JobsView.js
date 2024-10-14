import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';
import common from '../styles/common';

export default function Jobs({ navigation, route }) {
    //const [loading, setLoading] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [jobSum, setJobSum] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

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

                setJobs(jobsWithCategoryData);
                setJobSum(jobsWithCategoryData.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobData();
        fetchCategories();
    }, []);

    const filteredJobs = selectedCategory
        ? jobs.filter(job => job.data.category_id === selectedCategory)
        : jobs;


    const renderJobItem = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('JobDetails', { jobData: item.data, jobCategory: item.category, jobId: item.id })}>
            <View style={[styles.jobCard, common.borderStyle]}>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, common.boldFont, common.darkBrownColor]}>{item.data.company}</Text>
                    <Text style={[styles.jobTitles, common.lightFont, common.darkBrownColor]}>{item.category ? item.category.name : 'No category!'}</Text>
                </View>
                <View style={styles.jobOtherPart}>
                    <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{item.data.name}</Text>
                    <Text style={[styles.jobTitles, common.regularFont, common.darkBrownColor]}>{item.data.city}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    /*(categories.map((category, index) =>
        <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(prevCategory => prevCategory === category.id ? null : category.id)}>
            <View key={category.id} style={[styles.categoryCard, index === 0 && styles.firstCategoryCard]}>
                <Text style={[styles.categoryTitles, styles.boldFont]}>{category.data.name}</Text>
            </View>
        </TouchableOpacity>

    ))*/

    return (
        <View style={common.main}>
            <StatusBar backgroundColor='#373B2C' barStyle={'light-content'}/>
            <View style={[styles.header, common.borderStyle]}>
                <Text style={[common.boldFont, styles.headerWelcome, common.darkBrownColor]}>Aktuális munkáink</Text>
                <Text style={[common.regularFont, styles.headerName, common.darkBrownColor]}>Aktív: {jobSum} db</Text>
                <FlatList>

                </FlatList>
                <View style={styles.categories}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            (categories.map((category) =>
                                <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(prevCategory => prevCategory === category.id ? null : category.id)}>
                                    <View key={category.id} style={[styles.categoryCard]}>
                                        <Text style={[styles.categoryTitles, common.boldFont]}>{category.data.name}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={styles.jobs}>
                <FlatList
                    data={filteredJobs}
                    renderItem={renderJobItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    headerWelcome: {
        fontSize: 30,
        margin: 0,
        color: '#373B2C'
    },
    headerName: {
        fontSize: 25,
        margin: 0
    },
    categories: {
        width: '100%',
        flexDirection: 'column',
        paddingTop: 10
    },
    categoryCard: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#687A3C',
        marginTop: 5,
        marginRight: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
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
    categoryTitles: {
        fontSize: 18,
        color: '#FFFFFF'
    },
});


/*<ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                    {
                        (filteredJobs.map((job) =>
                            <TouchableOpacity key={job.id} onPress={() => navigation.navigate('JobDetails', { jobData: job.data, jobCategory: job.category })}>
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
                </ScrollView>*/