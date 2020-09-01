import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    moreContainer:{
        //backgroundColor: $primary.white,
        height:'100%'
    },

    headerSection:{
        backgroundColor: $primary.white,
        paddingVertical:50,
        paddingHorizontal:15,
        flexDirection: 'row',
    },
    languageBodySection:{
        flexDirection: 'row',
        borderBottomWidth:1,
        paddingTop:20,
        borderColor:$primary.grayColors._900
    },
    VersionBodySection:{
        flexDirection: 'row',
        borderBottomWidth:1,
        paddingVertical:25,
        borderColor:$primary.grayColors._900
    },
    bodySectionValueConatiner:{
        // textAlign:'center',
        width:'50%',
        // paddingRight:30
    },
    bodySectionValue:{
        textAlign:'right',
        paddingRight:20,
        // marginRight:10,
        fontSize: 16
    },
    arrowIcon:{
        textAlign:'right',
        top :3,
        paddingRight:15,

        // android:{ paddingTop: 0 },
        // ios:{ paddingTop: 0 }
    },
    bodySectionKey:{
        flexDirection: 'row',
        width:'50%',
        paddingLeft: 10,

    },
    nameSection:{
        paddingLeft:15,
        paddingTop:12,
    },
    headerNameText:{
        fontSize:18,
        flexWrap: 'wrap'
    },
    headerEmailText:{
        fontSize:16,
        flexWrap: 'wrap',
        color:$primary.grayColors._800
    },
    languageAndVersion:{
        marginTop: 20,
        backgroundColor: $primary.white,
        paddingBottom: 100,
    },

    logoutSection:{
        marginTop:10,
        paddingVertical:20,
        backgroundColor: $primary.white,
    },

    logoutText:{
        fontSize:16,
        textAlign:'center',
    },

    icon_head:{
        width:70,
        resizeMode: 'contain',
        height: 70,
    },
    body_icon:{
        resizeMode: 'contain',
        width:22,
        height: 22,
    },
    bodyIconTextContainer:{
        paddingLeft: 10,

    },
    bodyIconText:{
        fontSize: 16,
    }
}