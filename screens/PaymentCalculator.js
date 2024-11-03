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
        const currentTax = is25Selected ? 0.15 : 0;
        finalPayment -= (payment * currentTax);
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
            <View style={[styles.boxes]}>
                <Text style={[common.regularFont, common.regularSize, styles.longText, common.darkBrownColor]}>Számold ki, hogy mennyi lesz a várható béred!</Text>
                <View style={[styles.box, common.borderStyle]}>
                    <Text style={[common.regularFont, common.regularSize, common.whiteText, { paddingBottom: 5 }]}>Ledolgozott órák</Text>
                    <TextInput
                        style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                        keyboardType="number-pad"
                        onChangeText={text => setWorkHours(text)}
                        value={String(workHours)} />
                    <Text style={[common.regularFont, common.regularSize, common.whiteText, { paddingBottom: 5 }]}>Bruttó bér</Text>
                    <TextInput
                        style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                        keyboardType="number-pad"
                        onChangeText={text => setGross(text)}
                        value={String(gross)} />
                    <Text style={[common.regularFont, common.regularSize, common.whiteText, { paddingBottom: 5 }]}>Várható fizetés</Text>
                    <TextInput
                        style={[common.inputField, common.borderStyle, common.darkBrownColor]}
                        editable={false}
                        onChangeText={text => setNet(text)}
                        value={String(net)} />
                    <View style={styles.switchContainer}>
                        <View style={styles.switchContainerInside}>
                            <Text style={[common.regularFont, common.whiteText]}>25 év feletti vagyok (15%)</Text>
                            <Switch
                                value={is25Selected}
                                onValueChange={set25IsSelected} />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Pressable onPress={calculatePayment} style={[styles.button, styles.modifyButtons]}>
                            <Text style={[common.regularFont, common.boldFont, common.whiteText]}>SZÁMOL</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    modifyButtons: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#687A3C',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 17,
    },
    switchContainerInside: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    longText: {
        textAlign: "center",
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
    boxes: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    box: {
        width: '100%',
        marginVertical: 5,
        paddingTop: 10,
        paddingHorizontal: 18,
        paddingBottom: 18,
        backgroundColor: '#373B2C',
        borderRadius: 30
    },
    inputFieldB: {
        marginBottom: 3,
    },
});