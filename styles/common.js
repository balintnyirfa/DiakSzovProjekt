import { StyleSheet } from "react-native";

const common = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#B4FB01',
    },   

    borderStyle: {
        borderColor: '#373B2C',
        borderWidth: 2,
    },

    // Font family types
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

    // Font sizes
    regularSize: {
        fontSize: 17
    },
    mediumSize: {
        fontSize: 22,
    },
    bigSize: {
        fontSize: 30
    },

    // Font colors
    whiteText: {
        color: '#FFFFFF',
    },
    brightGreenText: {
        color: "#B4FB01",
    },
    darkBrownColor: {
        color: "#373B2C",
    },
    redColor: {
        color: '#F5443F'
    },

    // Input field styles
    inputField: {
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },
    placeHolderColor: {
        color: '#606E3C',
    },

    // For rectangular boxes for listing items
    itemBoxBase: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
    },

    itemBoxSides:{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        width: '100%',
    },

    // If item boxes have dividers and buttons then use styles below
    itemBoxWithTwoColumns: {
        flexDirection: "row"
    },

    itemBoxLeftSide: {
        flex: 3,
    },

    itemBoxRightSide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    divider: {
        width: 1,
        backgroundColor: '#373B2C',
        marginHorizontal: 20,
    },
})

export default common;