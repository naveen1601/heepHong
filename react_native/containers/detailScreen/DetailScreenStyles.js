import $_ from "../../settings/styles/DefaultPrimarySettings";

export default {

    detailContainer: {
        backgroundColor: $_.white,
        height:'100%'
    },

    subDiscriptionBox:{
        flexDirection: 'row',
        paddingHorizontal:40,
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
        fontSize: $_.baseFontSize+4
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
        marginTop: 40
    }

}