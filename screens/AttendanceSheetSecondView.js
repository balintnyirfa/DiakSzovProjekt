import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth, db } from "../config/firebase";
import uuid from 'react-native-uuid';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";

import common from "../styles/common";

export default function AttendanceSheetSecond({ navigation, route }) {
    const { jobData } = route.params;

    const [actualMonth, setActualMonth] = useState(new Date().getMonth().toLocaleString('default', { month: 'long' }));

    const [attendance, setAttendance] = useState([]);

    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const [workDate, setWorkDate] = useState(new Date());
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [totalHours, setTotalHours] = useState(0);

    const [showWorkDate, setShowWorkDate] = useState(false);
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || workDate;
        setShowWorkDate(false);
        setWorkDate(currentDate);
    };

    const onChangeCheckInTime = (event, selectedDate) => {
        const currentDate = selectedDate || checkIn;
        setShowCheckInPicker(false);
        setCheckIn(currentDate);
    };

    const onChangeCheckOutTime = (event, selectedDate) => {
        const currentDate = selectedDate || checkOut;
        setShowCheckOutPicker(false);
        setCheckOut(currentDate);
    };

    const showDatePicker = () => {
        setShowWorkDate(true);
    };

    const showCheckInTimePicker = () => {
        setShowCheckInPicker(true);
        setShowCheckOutPicker(false);
    };

    const showCheckOutTimePicker = () => {
        setShowCheckOutPicker(true);
        setShowCheckInPicker(false);
    };

    const formattedWorkDate = workDate.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedCheckIn = checkIn.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formattedCheckOut = checkOut.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const uploadAlert = () => {
        Alert.alert('Siker!', 'Sikeres rögzítés!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    };

    const timeValidationAlert = () => {
        Alert.alert('Hiba!', 'A kijelentkezési időnek későbbinek kell lennie, mint a bejelentkezési idő!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    };

    const uploadAttendance = async () => {
        if (checkOut <= checkIn) {
            timeValidationAlert();
            return; s
        }

        try {
            const attendanceId = uuid.v4();
            const newAttendance = {
                employee_id: userId,
                work_date: formattedWorkDate,
                check_in: checkIn,
                check_out: checkOut
            }
            setDoc(doc(db, "attendance", attendanceId), newAttendance)
                .then(() => {
                    uploadAlert();
                });
        } catch (error) {
            console.log('Failed upload: ', error)
        }
    }

    const deleteAttendance = async (attendanceId) => {
        try {
            await deleteDoc(doc(db, 'attendance', attendanceId));
            Alert.alert('Siker!', 'A törlés megtörtént!')
        } catch (error) {
            console.log('Error',error);
        }
    }

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const q = query(collection(db, 'attendance'));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                const filteredData = data.filter(item => item.data.employee_id === userId);

                console.log(filteredData.length)
                setAttendance(filteredData);
            } catch (error) {
                console.log("Error while fetching attendance sheet: ", error)
            }
        }

        fetchAttendance();
    }, [])

    const renderAttendance = ({ item }) => {
        const checkIn = item.data.check_in.toDate();
        const checkOut = item.data.check_out.toDate();

        const formattedCheckIn = checkIn.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const formattedCheckOut = checkOut.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        return (
            <View style={[styles.jobCard, common.borderStyle]}>
                <View style={styles.lefty}>
                    <View style={styles.jobOtherPart}>
                        <Text style={[common.boldFont, common.regularSize, common.darkBrownColor]}>{item.data.work_date}</Text>
                    </View>
                    <View style={styles.jobOtherPart}>
                        <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>{formattedCheckIn}-tól</Text>
                        <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>{formattedCheckOut}-ig</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.righty}>
                    <TouchableOpacity onPress={() => deleteAttendance(item.id)}>
                        <Text style={[common.boldFont, common.regularSize, styles.deleteBtn]}>TÖRLÉS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View showsVerticalScrollIndicator={false} style={styles.halfWhen}>
                <View style={[styles.topView]}>
                    <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                        <Text style={[common.boldFont, common.darkBrownColor]}>Vissza</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={[common.boldFont, common.bigSize, common.darkBrownColor]}>Rögzítés</Text>
                    </View>
                    <View style={styles.actualMonth}>
                        <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>Aktuális hónap: {actualMonth}</Text>
                    </View>
                </View>
                <View style={[styles.boxes]}>
                    <View style={[styles.box, common.borderStyle, styles.greenBox]}>
                        <Text style={[common.regularFont, common.regularSize, common.whiteText]}>Dátum</Text>
                        <Pressable onPress={showDatePicker}>
                            <TextInput
                                style={[styles.inputField, common.borderStyle, common.darkBrownColor]}
                                editable={false}
                                value={formattedWorkDate}
                                placeholder="Válassz napot!" />
                        </Pressable>
                        {
                            showWorkDate && (
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    value={workDate}
                                    mode="date"
                                    display="spinner"
                                    minimumDate={new Date(2000, 1, 1)}
                                    onChange={onChangeDate} />
                            )
                        }
                        <View style={styles.when}>
                            <View style={[styles.halfWhen]}>
                                <Text style={[common.regularFont, common.regularSize, common.whiteText]}>Mettől?</Text>
                                <Pressable onPress={showCheckInTimePicker}>
                                    <TextInput
                                        style={[styles.inputField, common.borderStyle, common.darkBrownColor]}
                                        editable={false}
                                        value={formattedCheckIn}
                                    />
                                </Pressable>
                                {showCheckInPicker && (
                                    <DateTimePicker
                                        testID="checkInTimePicker"
                                        value={checkIn}
                                        mode="time"
                                        display="spinner"
                                        onChange={onChangeCheckInTime}
                                    />
                                )}
                            </View>
                            <View style={[styles.halfWhen, { marginLeft: 10 }]}>
                                <Text style={[common.regularFont, common.regularSize, common.whiteText]}>Meddig?</Text>
                                <Pressable onPress={showCheckOutTimePicker}>
                                    <TextInput
                                        style={[styles.inputField, common.borderStyle, common.darkBrownColor]}
                                        editable={false}
                                        value={formattedCheckOut}
                                    />
                                </Pressable>
                                {showCheckOutPicker && (
                                    <DateTimePicker
                                        testID="checkOutTimePicker"
                                        value={checkOut}
                                        mode="time"
                                        display="spinner"
                                        onChange={onChangeCheckOutTime}
                                    />
                                )}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={uploadAttendance}>
                            <Text style={[styles.buttonText, common.boldFont]}>MENTÉS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.jobs}>
                <FlatList
                    data={attendance}
                    renderItem={renderAttendance}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: 1,
        backgroundColor: '#373B2C',
        marginHorizontal: 20,
    },
    deleteBtn: {
        color: '#F5443F'
    },
    lefty: {
        flex: 3
    },
    righty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    actualMonth: {
        width: "100%",
        alignItems: "center",
    },
    when: {
        flexDirection: 'row'
    },
    halfWhen: {
        flex: 1
    },
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        color: "#000",
        marginTop: 8,
        marginBottom: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 10,
    },
    switchContainerInside: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
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
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    jobs: {
        flex: 1,
        width: '100%',
        flexDirection: 'Column',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    boxes: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    box: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 30
    },
    greenBox: {
        backgroundColor: '#373B2C'
    },
    jobCard: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },
    jobOtherPart: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        width: '100%'
    },
    inputFieldB: {
        marginBottom: 3,
    },
    button: {
        backgroundColor: '#687A3C',
        alignItems: "center",
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    },
});