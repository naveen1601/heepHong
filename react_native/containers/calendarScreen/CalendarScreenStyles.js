import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    ActivityIndicatorStyle: {
        // flex: 1,
        // justifyContent: 'space-evenly',
        // height: '100%' 
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
        color: $primary.black
    },
    arrowIcon: {
        color: $primary.black,
        paddingTop: 7
    },

    caseContainer: {
        flexDirection: 'row',
        // borderWidth:1,
        paddingTop: 7
    },
    buttonConatiner: {
        flexDirection: 'row',
    },

    caseName: {
        paddingHorizontal: 4,
        paddingTop: 1,
        fontSize: $primary.baseFontSize + 2,
        // flexWrap: 'wrap'
    },

    calendarHeader: {
        flexDirection: 'row',
        // padding: 10,
        justifyContent: 'space-around',
        flexWrap: 'wrap',        
    }

    // flatButton: {
    //     color: $primary.flatButtonColor,
    //     fontSize: $primary.flatButtonFontSize,
    //     textDecorationLine: 'underline'
    //   }

}