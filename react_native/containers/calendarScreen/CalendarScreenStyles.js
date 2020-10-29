import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    calendarContainer:{
        flex: 1,
        backgroundColor: $primary.white,
        height:'100%'
    },
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

    calendarHeader: {
        flexDirection: 'row',
        // padding: 10,
        justifyContent: 'space-around',
        flexWrap: 'wrap',   
        // borderWidth:1,

    }

}