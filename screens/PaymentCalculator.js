import React, { useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

import common from "../styles/common";

export default function PaymentCalculator({ navigation }) {
    const [is25Selected, set25IsSelected] = useState(false);
    const [workHours, setWorkHours] = useState(0);
    const [tax, setTax] = useState(0);
    const [gross, setGross] = useState(0);
    const [net, setNet] = useState(0);

    const calculatePayment = () => {
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
            <View style={[styles.jobs]}>
                <Text style={[common.regularFont, common.regularSize, styles.longText, common.darkBrownColor]}>Számold ki, hogy mennyi lesz a várható béred!</Text>
                <Text style={[common.boldFont, common.regularSize, common.darkBrownColor, { paddingBottom: 5 }]}>Ledolgozott órák</Text>
                <TextInput
                    style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                    keyboardType="number-pad"
                    onChangeText={text => setWorkHours(text)}
                    value={String(workHours)} />
                <Text style={[common.boldFont, common.regularSize, common.darkBrownColor, { paddingBottom: 5 }]}>Bruttó bér</Text>
                <TextInput
                    style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                    keyboardType="number-pad"
                    onChangeText={text => setGross(text)}
                    value={String(gross)} />
                <Text style={[common.boldFont, common.regularSize, common.darkBrownColor, { paddingBottom: 5 }]}>Várható fizetés</Text>
                <TextInput
                    style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                    editable={false}
                    onChangeText={text => setNet(text)}
                    value={String(net)} />
            </View>
            <View style={styles.switchContainer}>
                <View style={styles.switchContainerInside}>
                    <Text style={[common.regularFont, common.darkBrownColor]}>25 év feletti vagyok (15%)</Text>
                    <Switch
                        value={is25Selected}
                        onValueChange={set25IsSelected} />
                </View>
                <TouchableOpacity>
                    <Pressable onPress={calculatePayment}>
                        <Text style={[common.regularFont, common.boldFont, common.darkBrownColor]}>SZÁMOL</Text>
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
    inputFieldB: {
        marginBottom: 3,
    },
});