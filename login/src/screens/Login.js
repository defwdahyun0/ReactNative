import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';
import { Image, Input } from '../components'; 
//import { images } from './utils/images' //백엔드에서 이미지 불러오기
//import {TouchableWithoutFeedback, Keyboard} from 'react-native'; //키보드 감추는 기능
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; //키보드 스크롤 기능
import { validateEmail, removeWhitespace} from '../utils/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'; //화면짤림문제해결, 노치 디자인 대응, padding값 얻기,useSafeAreaInsets Hook

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(); //키보드 next(tab)로 아이디 입력창에서 비밀번호 입력창으로 이동 가능
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };
  const _handleLoginButtonPress = () => {};

  return (
    <Container insets={insets}>
      <Image />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange} 
          onSubmitEditing={() => (_handleLoginButtonPress)}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={()=>{}}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
    </Container>
  );
};

export default Login;

/*
const Login = ({ navigation }) => {
  return (
    <Container>
      <Image imageStyle={{borderRadius: 8}}/>
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  );
};

export default Login;
*/