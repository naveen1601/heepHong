import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    ActivityIndicatorStyle: {
        // flex: 1,
        // justifyContent: 'space-evenly',
        height: '100%' 
    },

    unSelectedButton: {
        // color: $primary.tertiaryColor,
        color: $primary.black,
        textDecorationLine: 'none',
        fontSize: $primary.baseFontSize + 2
    },
    selectedButton: {
        fontSize: $primary.baseFontSize + 2
    },
    userIcon: {
        color: $primary.black,
        paddingRight:5,
        android:{ paddingTop: 16 }
    },
    arrowIcon: {
        color: $primary.black,
        android:{ paddingTop: 20 },
        ios:{ paddingTop: 5 }
    },

    todayIcon:{
        android:{ paddingTop: 15 },
        ios:{ top: -3 }
    },

    caseContainer: {
        flexDirection: 'row',
        ios:{ paddingTop: 10 }

    },
    buttonConatiner: {
        flexDirection: 'row',
    },

    // caseName: {
    //     paddingHorizontal: 4,
    //     paddingTop: 1,
    //     fontSize: $primary.baseFontSize + 2,
    //     // flexWrap: 'wrap'
    // },

    calendarHeader: {
        flexDirection: 'row',
        // padding: 10,
        justifyContent: 'space-around',
        flexWrap: 'wrap',   
        // borderWidth:1,

    }

    // flatButton: {
    //     color: $primary.flatButtonColor,
    //     fontSize: $primary.flatButtonFontSize,
    //     textDecorationLine: 'underline'
    //   }

}