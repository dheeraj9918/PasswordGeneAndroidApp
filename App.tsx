import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInputComponent, TextInput } from 'react-native';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'should be min 4 characters')
    .max(16, 'should be max 16 characters')
    .required('should be required')
});

const App = () => {
  const [password, setPassword] = useState('');

  const [isGeneratePassword, setGeneratePassword] = useState(false);
  const [isLowercase, setLowercase] = useState(true);
  const [isUppercase, setUppercase] = useState(false);
  const [isNumber, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatedPasswordString = (passwordLength: number) => {
    let characterList = '';

    const UpperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const NumericValue = '0123456789';
    const symbols = '~`!@#$%^&*()';

    if(isUppercase){
      characterList += UpperCaseChars;
    }
    if(isLowercase){
      characterList += LowerCaseChars;
    }
    if(isNumber){
      characterList += NumericValue;
    }
    if(symbol){
      characterList += symbols;
    }

    const passwordResult = createPassword(characterList,passwordLength);
    setPassword(passwordResult);
    setGeneratePassword(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
      let result = '';
      for (let i = 0; i < passwordLength; i++){
        const characterIndex = Math.round(Math.random() * characters.length);
        result += characters.charAt(characterIndex);
      }
      return result;
  };

  const resetPasswordState = () => {
          setPassword('');
          setGeneratePassword(false);
          setLowercase(true);
          setUppercase(false);
          setNumber(false);
          setSymbol(false);
          
  };

  return (
    <ScrollView style = {{height: '100%', backgroundColor:"black"}} keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={Styles.appContainer} >
        <View style={Styles.formContainer}>
          <Text style={Styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              generatedPasswordString(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                <View style={Styles.inputRaper}>
                  <View style={Styles.inputColumn}>
                    <Text style={Styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={Styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={Styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex . 8 "
                    keyboardType='numeric'
                  />
                </View>
                <View style={Styles.inputRaper}>
                  <Text style = {Styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                  disableBuiltInState
                  isChecked= {isLowercase}
                  onPress={()=>setLowercase(!isLowercase)}
                  fillColor='#29AB87'
                  />
                </View>
                <View style={Styles.inputRaper}>
                <Text style = {Styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                  disableBuiltInState
                  isChecked= {isUppercase}
                  onPress={()=>setUppercase(!isUppercase)}
                  fillColor='#29AB87'
                  />
                </View>
                <View style={Styles.inputRaper}>
                <Text style = {Styles.heading}>Include Number</Text>
                  <BouncyCheckbox
                  disableBuiltInState
                  isChecked= {isNumber}
                  onPress={()=>setNumber(!isNumber)}
                  fillColor='#29AB87'
                  />
                </View>
                <View style={Styles.inputRaper}>
                <Text style = {Styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                  disableBuiltInState
                  isChecked= {symbol}
                  onPress={()=>setSymbol(!symbol)}
                  fillColor='#29AB87'
                  />
                </View>
                <View style={Styles.fromAction}>
                  <TouchableOpacity
                  disabled = {!isValid}
                  style = {Styles.primarybtn}
                  onPress={()=>{
                    handleSubmit();
                  }}
                  >
                    <Text>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={Styles.secondrybtn}
                  onPress={()=>{
                    handleReset();
                    resetPasswordState();
                  }}
                  >
                    <Text>Reset</Text>
                    </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isGeneratePassword ? (
          <View style = {[Styles.card, Styles.cardElevated]}>
            <Text style = {Styles.subscript}>Result:</Text>
            <Text style = {Styles.description}>Long Press to copy</Text>
            <Text selectable ={true} style = {Styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRaper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputColumn: {
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
  },
  fromAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primarybtn: {
    backgroundColor: '#29AB87',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  secondrybtn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  card: {
    width:338,
    height:200,
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  cardElevated: {
    elevation: 5,
  },
  subscript: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
  generatedPassword: {
    fontSize: 16,
    marginTop: 10,
  },
});




export default App;