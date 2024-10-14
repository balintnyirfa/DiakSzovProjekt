import { StyleSheet } from "react-native";

const common = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#B4FB01',
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
        fontSize: 22,
    },
    bigSize: {
        fontSize: 30
    },
    whiteText: {
        color: '#FFFFFF',
    },
    brightGreenText: {
        color: "#B4FB01",
    },
    darkBrownColor: {
        color: "#373B2C",
    },

    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },

    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    }
})

export default common;