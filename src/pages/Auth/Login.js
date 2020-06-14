import React from 'react'
import { IonLoading, IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonRouterLink } from '@ionic/react'
import NavHeader from '../../components/Header/NavHeader'
import { toast } from '../../helpers/toast'
import useForm from '../../hooks/useForm'
import firebase from '../../firebase'
import validateLogin from '../../validators/validateLogin'

const INITIAL_STATE = {
    email: "",
    password: ""
}

const Login = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting} = useForm(
        INITIAL_STATE, validateLogin, authenitcateUser)
    const [busy, setBusy] = React.useState(false);
    async function authenitcateUser() {
        const { email, password } = values;
        try {
            await firebase.login(email, password);
            toast("You have logged in successfully!");
            props.history.push("/")
        } catch (err) {
            console.error('Authentication Error', err);
            toast(err.message);
        }
        setBusy(false);
    }
    return (
        <IonPage>
            <NavHeader title="Log In" />
            <IonLoading message={"Please wait..."} isOpen={busy} />
            <IonContent>
                <IonItem lines="null">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={values.password} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" onClick={handleSubmit} disable={isSubmitting} expand="block">
                            Log In
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="ion-text-center ion-padding-vertical">
                        <IonRouterLink routerLink={'/forgot'}>
                            Forgot Password?
                        </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Login
