import React from 'react'
import { Container, Content, Title, Brand } from './styles';
import brandImg from '../../assets/brand.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/indes';
import { KeyboardAvoidingView, Platform } from 'react-native';

export function SignIn() {
    return (
       <Container>
           <KeyboardAvoidingView
           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
           >
            <Content>

                <Brand source={brandImg}/>

                <Title>Login</Title>
           <Input
           placeholder='E-mail'
           type="secondary"
           autoCorrect={false}
           autoCapitalize='none'
           />

            <Input
           placeholder='Senha'
           type="secondary"
           secureTextEntry
          
           />

           <Button
           title="Entrar"
           type="secondary"
           />
           </Content>
          </KeyboardAvoidingView>
       </Container>
    );
}
