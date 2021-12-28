import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut:() => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
}

{/*AuthProviderProps got a child that is going to be sandwiched by the AuthContext.Provider*/}
type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@gopizza:users';

{/*Says that the initial value is that type*/}
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [isLogging, setIsLogging] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function signIn(email: string, password: string){
      if(!email || !password){
          return Alert.alert('Login', 'Informe o e-mail e a senha')
      }
      setIsLogging(true);

      auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
         firestore()
         .collection('user')
         .doc(account.user.uid)
         .get()
         .then(async profile =>
            {
                const {name, isAdmin} = profile.data() as User;

                if(profile.exists){
                    const userData = {
                        id: account.user.uid,
                        name,
                        isAdmin
                    };
                    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
                    setUser(userData);
                }
            })
            .catch(() => Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário.'))
      })
      .catch(error => {
          const {code} = error;

          if(code === 'auth/user-not-found' || code === 'auth/wrong-password'){
              return Alert.alert('Login', 'E-mail e/ou senha inválida.');
          }else {
              return Alert.alert('Login', 'Não foi possível realizar o login.')
          }
      }).finally(() => setIsLogging(false));
    }

    async function loadUserStorageData() {
        setIsLogging(true);

        const storedUser = await AsyncStorage.getItem(USER_COLLECTION);


        if(storedUser) {
            const userData = JSON.parse(storedUser) as User;
            setUser(userData);
        }

        setIsLogging(false);
    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);
    }

    async function forgotPassword(email: string) {
        if(!email) {
            return Alert.alert('Redefinir Senha', 'Informe o e-mail');
        }

        auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para redefinir sua senha'))
        .catch(() => Alert.alert('Redefinir senha', 'Não foi possível enviar o e-mail para redefinir a senha'))
    }

    useEffect(() => {
       loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider
        value={{
            signIn,
            signOut,
            forgotPassword,
            isLogging,
            user
        }}
        >
            {children}

        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth};
