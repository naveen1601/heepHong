import $_ from "../../settings/styles/DefaultPrimarySettings";

export default {

    detailContainer: {
        backgroundColor: $_.white,
        // height:'100%',
        // width: '100%'
    },

    subDiscriptionBox:{
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical:10,
    },

    subDiscriptionLabel:{
        width: 90,
        paddingRight: 10,
        flexWrap: 'wrap',
        fontSize: $_.baseFontSize+4,
        color: $_.grayColors._300,
    },
    subDiscriptionText:{
        flexWrap: 'wrap',
        fontSize: $_.baseFontSize+4,
        // borderWidth: 1,
        width: '60%',
    },
    headerSection:{
        backgroundColor: $_.primaryColor,
        fontSize: $_.baseFontSize+4,
        padding:10
    },
    headerText:{
        color: $_.white,
        fontSize: $_.baseFontSize+4,
    },
    descriptionSection:{
        marginTop: 40,
        borderWidth:1,
        // marginHorizontal:30,
        borderColor: $_.grayColors._900,
        paddingBottom: 30,
        paddingTop: 10

    },
    subDiscriptionTextImp:{
        color: $_.primaryColor
    },
    detailAndArrow: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    arrowIcon:{
        justifyContent:'center',
        color: $_.grayColors._600,
        padding: 10
    }
    

}