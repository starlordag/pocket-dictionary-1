import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      text:'',
      displayText:'',
    }
  }

  getWord=(word)=>{
    var searchKeyword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject=response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCatigory = wordData.wordtype
        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCatigory":lexicalCatigory
        })
      }
      else{
        this.setState({
          "word":this.state.text,
          "definition":"not found"
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaProvider>
        <Header
        backgroundColor = {'purple'}
        centerComponent = {{text:'Pocket Dictionary',style:{color:'#fff',fontSize:20}}}/>
        <TextInput
        style = {styles.inputBox}
        onChangeText = {(text) =>{
          this.setState({
            text:text,
            isSearchPresed:false,
            word: "Loading...",
            lexicalCatigory:"",
            examples:[],
            definition:""
          })
        }}
          value = {this.state.text}/>
          <TouchableOpacity style = {styles.goButton}
          onPress = {() => {
            this.setState({isSearchPresed:true});
            this.getWord(this.state.text)
          }}>
          <Text style = {styles.buttonText}>Search</Text>
           </TouchableOpacity>
          <Text style = {styles.displayText}>{this.state.displayText}</Text>
        </SafeAreaProvider>
        
        <View style={{flexDirection:'row'}}>
          <Text style = {styles.detailsTitle}>Word :{""}</Text>
          <Text style = {{fontSize:15}}>{this.state.word}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text>Type : {""}</Text>
          <Text style = {{fontSize:15}}>{this.state.lexicalCatigory}</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',marginBottom:300}}>
          <Text style = {styles.detailsTitle}>Definition :{""}</Text>
          <Text style = {{fontSize:15}}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox:{
    marginTop:25,
    marginLeft:0,
    width:'80%',
    alignSelf:'center',
    heigh:40,
    textAlign:'center',
    borderWidth:4,
    outline:'none'
  },
  buttonText:{
    marginLeft:10,
    marginTop: 15,
    fontSize: 25,
    alignSelf:'center',
    fontWeight:'bold'
  },
  displayText:{
    textAlign:'center',
    fontSize:30
  },
});
