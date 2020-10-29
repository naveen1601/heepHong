import $_ from "../../settings/styles/DefaultPrimarySettings"

export default {

    // ActivityIndicatorStyle: {
    //     flex: 1,
    //     justifyContent: 'space-evenly'
    // }

    todayHeaderSection:{
        backgroundColor: $_.primaryColor,
    },
    todayHeaderText:{
        color: $_.white,
    },
    headerSection:{
        backgroundColor: '#c9c9c9',
        padding:10        
    },
    headerText:{
        color: $_.black,
        fontSize: $_.baseFontSize+2,
    },
    activityBody:{
        paddingHorizontal:15,
        paddingVertical:25,
        borderBottomColor: $_.grayColors._900,
        borderBottomWidth: 2,
        alignItems: 'flex-start'
        
    },
    activityBodyText:{       
        paddingVertical:25,
        fontSize: $_.baseFontSize+4,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        // position: 'relative'
    },


}