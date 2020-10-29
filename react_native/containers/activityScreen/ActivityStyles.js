import $_ from "../../settings/styles/DefaultPrimarySettings"

export default {

    // ActivityIndicatorStyle: {
    //     flex: 1,
    //     justifyContent: 'space-evenly'
    // }
    activityContainer:{
        backgroundColor: $_.white,
        height:'100%'
    },

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
        flexDirection:'row',
        paddingHorizontal:15,
        paddingBottom:25,
        borderBottomColor: $_.grayColors._900,
        borderBottomWidth: 2,
        alignItems: 'center'
    },
    activityBodyText:{
        fontSize: $_.baseFontSize+4,
        marginLeft: 10,
        // position: 'relative'
    },
    activityTime:{
        alignSelf: 'flex-end',
        flexDirection:'row',
        paddingHorizontal:15,
        paddingTop:8,
    },
    activityTimeText:{
        color:'#7F7F7F',
    },
    unreadNotificationArea:{
        width: 10,
        height: 10,
        borderRadius: 10/2,
    },
    unreadNotification:{
        backgroundColor:'#C1272D'
    },
    arrowIcon: {
        color: $_.black,
        // android:{ paddingTop: 20 },
        // ios:{ paddingTop: 5 }
        paddingTop:15
    },
    nextNotificationArrow:{
        // borderWidth:1,
        alignItems: 'center'
    },
    activityHeader:{
        alignItems: 'center',
        padding:20
    },
    activityHeaderText:{
        fontSize: $_.baseFontSize+6,
        
    },


}