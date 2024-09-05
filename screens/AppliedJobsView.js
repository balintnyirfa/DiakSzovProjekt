import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

export default function AppliedJobs({ navigation }) {
    const auth = getAuth();
    //const user = auth.currentUser;
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

    const renderAppliedJobs = ({ item }) => (
        <View>
            <View>
                <Text>{item.data.jobName}</Text>
                <Text>{item.data.userId}</Text>
            </View>
        </View>
    );

    return (
        <View style={StyleSheet.main}>
            <View style={[styles.topView, styles.borderStyle]}>
                <Text style={[styles.boldFont, styles.bigSize]}>Jelentkezéseim</Text>
                <Text style={[styles.regularFont, styles.mediumSize]}>Munkák száma: {applicationSum} db</Text>
            </View>
            <FlatList
                data={application}
                renderItem={renderAppliedJobs}
                keyExtractor={item => item.id}
            />
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
    topView: {
        width: '100%',
        //marginBottom: 10,
        paddingVertical: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        color: '#373B2C',
    },
    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
});