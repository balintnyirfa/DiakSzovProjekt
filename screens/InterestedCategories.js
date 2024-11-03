import React, { useEffect, useState } from "react";

import common from "../styles/common";
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import uuid from 'react-native-uuid';
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

export default function InterestedCategories({ navigation }) {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [preferredCategories, setPreferredCategories] = useState([])

    const fetchCategories = async () => {
        try {
            const q = query(collection(db, 'job_categories'));
            const querySnapshot = await getDocs(q);
            const categoriesData = querySnapshot.docs.map(doc => ({
                value: doc.id,
                label: doc.data().name,
            }));

            setCategories(categoriesData)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPreferredCategories = async () => {
        const q = query(collection(db, 'preferred_categories'));
        const querySnapshot = await getDocs(q);
        const preferredCategories = querySnapshot.docs.map(doc => doc.data().selected_categories).flat();

        setPreferredCategories(preferredCategories)
        console.log(preferredCategories)
    }

    const renderCategories = () => {
        return (item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={[styles.selectedCategory, common.borderStyle]}>
                    <Text style={[common.regularFont, common.regularSize, common.darkBrownColor,]}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        fetchCategories();
    }, [])

    const addToPreferedCategories = async () => {
        try {
            const newData = {
                selected_categories: selectedCategories,
            }
            setDoc(doc(db, 'preferred_categories', userId), newData)
                .then(() => {
                    Alert.alert('Siker!', 'Kategória mentve!')
                })
        } catch (error) {
            console.log(error)
        }
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
                    <Text style={[common.boldFont, common.bigSize, common.darkBrownColor]}>Érdeklődési köreim</Text>
                </View>
            </View>
            <View style={[styles.bottomView]}>
                <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>Válaszd ki azokat a kategóriákat, amelyek számodra érdekesek lehetnek!</Text>
                <View style={[styles.box, common.borderStyle]}>
                    <MultiSelect
                        style={[styles.dropdown, common.inputField, common.darkBrownColor]}
                        placeholderStyle={[common.placeHolderColor, common.regularFont, common.darkBrownColor]}
                        selectedTextStyle={[common.darkBrownColor, common.regularFont, common.boldFont]}
                        data={categories}
                        labelField="label"
                        valueField="value"
                        placeholder="Válassz kategóriát..."
                        value={selectedCategories}
                        renderItem={(item) => (
                            <View style={styles.item}>
                                <Text style={[common.regularFont, common.darkBrownColor, common.regularSize]}>{item.label}</Text>
                            </View>
                        )}
                        renderSelectedItem={(item, unSelect) => {
                            return (
                                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                    <View style={[styles.selectedCategory, common.borderStyle]}>
                                        <Text style={[common.regularFont, common.regularSize, common.darkBrownColor,]}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>)
                        }}
                        onChange={item => {
                            setSelectedCategories(item);
                        }} />
                    <TouchableOpacity style={[styles.button]} onPress={() => addToPreferedCategories(selectedCategories)}>
                        <Text style={[common.boldFont, common.regularSize, common.whiteText]}>MENTÉS</Text>
                    </TouchableOpacity>
                </View>
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
    box: {
        width: '100%',
        marginVertical: 15,
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 30,
        backgroundColor: '#373B2C'
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#687A3C',
    },
    category: {
        flexDirection: "row"
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 0,
    },
    dropdownList: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    item: {
        paddingHorizontal: 7,
        paddingVertical: 5,
    },
    selectedCategory: {
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        marginRight: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center"
    }
})