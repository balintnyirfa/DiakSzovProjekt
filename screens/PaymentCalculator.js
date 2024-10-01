import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PaymentCalculator({ navigation }) {
    const [is25Selected, set25IsSelected] = useState(false);
    const [workHours, setWorkHours] = useState(0);
    const [tax, setTax] = useState(0);
    const [gross, setGross] = useState(0);
    const [net, setNet] = useState(0);

    function calculatePayment() {
        let payment = workHours * gross;
        let finalPayment = payment;
        if (is25Selected) {
            setTax(0.15);
        } else {
            setTax(0);
        }
        finalPayment -= (payment * tax);
        setNet(finalPayment);
    };
    //useEffect(() => {
    //
    //    calculatePayment();
    //}, [workHours, gross, is25Selected]);



    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text>Vissza</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[styles.boldFont, styles.bigSize]}>Bérkalkulátor</Text>
                </View>
            </View>
            <View style={[styles.jobs]}>
                <Text style={[styles.regularFont, styles.regularSize, styles.longText]}>Számold ki, hogy mennyi lesz a várható béred!</Text>
                <Text style={[styles.boldFont, styles.regularSize, { paddingBottom: 5 }]}>Ledolgozott órák</Text>
                <TextInput
                    style={[styles.inputField, styles.borderStyle]}
                    keyboardType="number-pad"
                    onChangeText={text => setWorkHours(text)}
                    value={String(workHours)} />
                <Text style={[styles.boldFont, styles.regularSize, { paddingBottom: 5 }]}>Bruttó bér</Text>
                <TextInput
                    style={[styles.inputField, styles.borderStyle]}
                    keyboardType="number-pad"
                    onChangeText={text => setGross(text)}
                    value={String(gross)} />
                <Text style={[styles.boldFont, styles.regularSize, { paddingBottom: 5 }]}>Várható fizetés</Text>
                <TextInput
                    style={[styles.inputField, styles.borderStyle]}
                    editable={false}
                    onChangeText={text => setNet(text)}
                    value={String(net)} />
            </View>
            <View style={styles.switchContainer}>
                <View style={styles.switchContainerInside}>
                    <Text style={[styles.regularFont]}>25 év feletti vagyok (15%)</Text>
                    <Switch
                        value={is25Selected}
                        onValueChange={set25IsSelected} />
                </View>
                <TouchableOpacity>
                    <Pressable onPress={calculatePayment}>
                        <Text style={[styles.regularFont, styles.boldFont]}>SZÁMOL</Text>
                    </Pressable>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    },
    inputFieldB: {
        marginBottom: 3,
    },
});