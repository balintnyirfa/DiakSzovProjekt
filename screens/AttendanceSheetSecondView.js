import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth, db } from "../config/firebase";
import uuid from 'react-native-uuid';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

export default function AttendanceSheetSecond({ navigation, route }) {
    const { jobData } = route.params;

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
                //setApplicationSum(filteredData.length);
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
            <View style={[styles.borderStyle]}>
                <View>
                    <Text style={[styles.boldFont]}>{item.data.work_date}</Text>
                </View>
                <View>
                    <Text style={[styles.regularFont]}>{formattedCheckIn}</Text>
                    <Text style={[styles.regularFont]}>{formattedCheckOut}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text>Vissza</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[styles.boldFont, styles.bigSize]}>Rögzítés</Text>
                </View>
            </View>
            <View style={[styles.jobs]}>
                <Text>Dátum</Text>
                <Pressable onPress={showDatePicker}>
                    <TextInput
                        style={[styles.inputField, styles.borderStyle]}
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
                <Text>Mettől</Text>
                <Pressable onPress={showCheckInTimePicker}>
                    <TextInput
                        style={[styles.inputField, styles.borderStyle]}
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


                <Text>Meddig</Text>
                <Pressable onPress={showCheckOutTimePicker}>
                    <TextInput
                        style={[styles.inputField, styles.borderStyle]}
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

                <TouchableOpacity style={styles.loginBtn} onPress={uploadAttendance}>
                    <Text style={[styles.loginBtnText, styles.boldFont]}>MENTÉS</Text>
                </TouchableOpacity>
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
    longText: {
        textAlign: "left",
        marginBottom: 10
    },
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
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 30,
        width: 30,
    },
    jobs: {
        width: '100%',
        flexDirection: 'Column',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
        color: "#373B2C"
    },
    inputFieldB: {
        marginBottom: 3,
    },
    loginBtn: {
        backgroundColor: '#687A3C',
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 70,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    loginBtnText: {
        color: '#FFF',
        fontSize: 20
    },
});