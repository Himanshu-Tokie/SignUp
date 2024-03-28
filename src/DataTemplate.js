import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from './datePicker';
import App from './PhoneNumber';

function Template({text, changeState,isConfirmPassword}) {
  const DOB = useRef(false);
  const number = useRef(false);
  const security = useRef(false);
  const contact = useRef('default');
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [focus, setFocus] = useState(false);
  const [emptyText, setEmptyText] = useState(false);
  const [err, setErr] = useState(false);
  function check(input) {
    let regex;
    switch (text) {
      case 'First Name':
      case 'Last Name':
        regex = /^[A-Za-z]+$/;
        break;
      case 'Email ID':
        regex = /^[(\w\d\.\/\_)+]+@[\w+]+(\.[\w+]{2,})+$/i;
        break;
      case 'Password':
      case 'Confirm Password':
        regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}$/;
        break;
      default:
        regex = /.*/; // Default to allow any input
        break;
    }
    ok = regex.test(input);
    if(text=='Confirm Password'){
      if(isConfirmPassword===input){
        setPasswordAlert(false)
      }
      else
      setPasswordAlert(true)
    }
    if ((ok || input=='') &&input.length<30) {
      if(input=='')setEmptyText(true);
      if(input!='')setEmptyText(false);
      
      changeState(input);
      setErr(false);
    } else {
      setEmptyText(false);
      setErr(true);
    }
  }

  function changeFocus() {
    if (text === 'Password') setFocus(true);
  }

  if (text === 'Phone Number') {contact.current = 'number-pad';number.current = true;}
  else if (text === 'Date of Birth') DOB.current = true;
  else if (text === 'Password' || text === 'Confirm Password')
    security.current = true;

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
        
        <View>
          {DOB.current ? (
            <View style={styles.textInput}><DatePicker changeState={changeState} theme={'dark'}></DatePicker></View>  
          ) : (number.current?(<App changeState={changeState} setErr={setErr}/>):(
            <TextInput
              style={styles.textInput}
              onChangeText={check}
              placeholder={text}
              color="white"
              onFocus={changeFocus}
              placeholderTextColor="grey"
              secureTextEntry={security.current}
              keyboardType={contact.current}
              autoCapitalize={security.current? 'none':'words'}
              >
              
            </TextInput>
          ))}
        </View>

        {focus && (
          <Text style={styles.alertText}>
            Minimum Length required 8 digits including an uppercase, a
            lowercase, special character.
          </Text>
        )}

        {err && text !== 'Date of Birth' && text !== 'Confirm Password' &&(
          <View>
            <Text style={styles.errText}>*Invalid {text}</Text>
          </View>
        )}
        {
          passwordAlert && <Text style={styles.errText}>*Password doesn't match</Text>
        }

        {
          emptyText && <Text style={styles.errText}>*Fill {text}</Text>
        }
      </View>
    </>
  );
}

export default Template;

let styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 20,
    padding: 10,
    textAlign:"left",
    
  },
  errText: {
    color: 'red',
    fontWeight: '400',
  },
  alertText: {
    color: 'grey',
  },
});
