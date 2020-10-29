import React,  { Component, createRef } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Button from "../baseComponents/button/Button";

class NativeToWeb extends Component {

    constructor(props){
        super();
        this.webviewRef = createRef();
        this.state = {
            name: 'Bangalore'
        };
    }
 //webviewRef = React.useRef(null);
 data = [
    "Javascript",
    "React",
  ];
//   runFirst='Naveen,,,,';
 runFirst = ()=>{
    let stateName =  this.state.name;
    return (`
      document.body.style.backgroundColor = 'green';
        window.postMessage('${this.state.name}', "*");
      true; // note: this is required, or you'll sometimes get silent failures
    `)};

  onMessage =(event)=> {
      alert(JSON.stringify(event.nativeEvent.data));
    }

   LoadingIndicatorView=() =>{
    return (
        <ActivityIndicator color='#f59042' size='large' style={styles.ActivityIndicatorStyle}/>
    );
  }

  handleClickn =()=>{
      this.setState({
          name: 'abhi'
      });
      //this.webviewRef && this.webviewRef.current.reload();
      const sentToWebView= {
          case: 7519,
          calendarType: 'week',
          todayView: false
      } 
      let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
      this.webviewRef.current.injectJavaScript(injectedData);
  }
  render(){
  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            html: `<body style="display:flex;justify-content:center;flex-direction:column;align-items:center">
                      <h2>React native webview</h2>
                      <h2>React native webview data transfer between Native to web</h2>
                      <button style="color:green; height:100;width:300;font-size:30px"
                        onclick="myFunction()">Close webview</button>
                      <p id="demo"></p>
                      <script>
                       var newData = []; 
                       window.addEventListener("message", function({data}) {
                        alert(JSON.stringify(data));
                    //    newData.push(data.data) 
                    //    var i, len, text;
                    //    for (i = 0, len = newData.length, text = ""; i < len; i++) {
                    //    text += newData[i] + "<br>";
                    //    }
                    //    document.getElementById("demo").innerHTML = text;
                      });
                      function myFunction() {
                      window.ReactNativeWebView.postMessage('Hello')
                      }
                    </script>
           </body>`,
          }}
        //   key={this.state.name}
          renderLoading={this.LoadingIndicatorView}
          startInLoadingState={true}
          ref={this.webviewRef}
          onMessage={this.onMessage}
          injectedJavaScript={ this.runFirst()}
        />
        <Button
            onPress={this.handleClickn}
            text='ssss'
            secondaryButton={true}
        />
      </SafeAreaView>
    </>
  );}
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    height:'100%'
  },
  flexContainer: {
    flex:1, 
  },
});
export default NativeToWeb;