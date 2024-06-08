import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import firestore, { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';

export default function Jobs() {
    const [jobs, setJobs] = useState<{ id: string; }[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchJobs = async () => {
        const db = getFirestore();
        const jobsCol = collection(db, 'jobs');
        const jobSnapshot = await getDocs(jobsCol);
        const jobsList = jobSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setJobs(jobsList);
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const renderItem = ({ item }: { item: { id: string } }) => (
        <View>
            <Text>{item.id}</Text>
            {/* Display other job data here */}
        </View>
    );

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#373B2C" />
            <View style={[styles.header, styles.borderStyle]}>
                <Text style={[styles.boldFont, styles.headerWelcome]}>Aktuális munkáink</Text>
                <Text style={[styles.regularFont, styles.headerName]}>Aktív: X db</Text>
            </View>
            {loading ? <Text>Loading...</Text> : 
                <FlatList
                    data={jobs}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            }
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
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
});