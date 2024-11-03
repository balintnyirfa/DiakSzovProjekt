import React from "react";
import { Image, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import common from "../styles/common";

export default function Contact({ navigation }) {
    return (
        <View style={styles.main}>
            <StatusBar backgroundColor='#B4FB01' barStyle={'dark-content'} />
            <View style={[styles.topView]}>
                <TouchableOpacity style={[styles.returnButton]} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: 'https://i.postimg.cc/mkjYJVQY/arrow-sm-left-svgrepo-com-1.png' }} style={styles.arrow} />
                    <Text style={[common.boldFont, common.darkBrownColor]}>Vissza</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={[common.boldFont, common.bigSize, common.darkBrownColor]}>Kapcsolat</Text>
                </View>
            </View>
            <View style={[styles.boxes]}>
                <Text style={[common.regularFont, common.regularSize, styles.longText, common.darkBrownColor]}>Vedd fel a kapcsolatot velünk az alábbi elérhetőségek egyikén keresztül!</Text>
                <View style={[styles.box, common.borderStyle]}>
                    <Text style={[common.boldFont, common.regularSize, common.whiteText]}>Email</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@diakmesterek.hu')}>
                        <Text style={[common.regularFont, common.regularSize, common.whiteText]}>support@diakmesterek.hu</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.box, styles.whiteBox, common.borderStyle]}>
                    <Text style={[common.boldFont, common.regularSize, common.darkBrownColor]}>Telefon</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:06307130453')}>
                        <Text style={[common.regularFont, common.regularSize, common.darkBrownColor]}>06 30/713-0453</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.box, common.borderStyle]}>
                    <Text style={[common.boldFont, common.regularSize, common.whiteText]}>Facebook</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
                        <Text style={[common.regularFont, common.regularSize, common.whiteText]}>Ugrás az oldalunkra!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 18,
        backgroundColor: '#373B2C',
        borderRadius: 30
    },
    whiteBox: {
        backgroundColor: '#FFFFFF',
    },
})