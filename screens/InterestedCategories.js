import React, { useEffect, useState } from "react";

import common from "../styles/common";
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import uuid from 'react-native-uuid';

export default function InterestedCategories({ navigation }) {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const [categories, setCategories] = useState('');

    const fetchCategories = async () => {
        try {
            const q = query(collection(db, 'job_categories'));
            const querySnapshot = await getDocs(q);
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }));

            setCategories(categoriesData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const addToPreferedCategories = async (id) => {
        try {
            const categoryId = uuid.v4();
            const newData = {
                user_id: userId,
                category_id: id
            }
            setDoc(doc(db, 'preferred_categories', categoryId), newData)
                .then(() => {
                    Alert.alert('Siker!', 'Kategória mentve!')
                })
        } catch (error) {
            console.log(error)
        }
    }

    const renderCategories = ({ item }) => {
        return (
            <View style={[styles.category]}>
                <Text style={[common.darkBrownColor, common.regularFont, common.regularSize]}>{item.data.name}</Text>
                <View style={common.divider}></View>
                <TouchableOpacity onPress={() => addToPreferedCategories(item.id)}>
                    <Text style={[common.redColor, common.regularFont, common.regularSize]}>Hozzáad</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text style={[common.boldFont, common.darkBrownColor]}>Vissza</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[common.boldFont, common.bigSize, common.darkBrownColor]}>Bérkalkulátor</Text>
                </View>
            </View>
            <View style={[styles.bottomView]}>
                <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>Válaszd ki azokat a kategóriákat, amelyek számodra érdekesek lehetnek!</Text>
                <FlatList
                    data={categories}
                    renderItem={renderCategories}
                //keyExtractor={(item, index) => `${item.id}-${index}`}
                //refreshing={refreshing}
                //onRefresh={onRefresh} 
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        fontSize: 200,
        backgroundColor: '#B4FB01',
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
    bottomView: {
        width: '100%',
        flexDirection: 'Column',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    category: {
        flexDirection: "row"
    },
})