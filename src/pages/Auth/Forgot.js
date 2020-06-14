import React from 'react'
import { IonLoading, IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from '@ionic/react'
import NavHeader from '../../components/Header/NavHeader'
import { toast } from '../../helpers/toast'
import useForm from '../../hooks/useForm'
import firebase from '../../firebase'
import validatePasswordReset from '../../validators/validatePasswordReset'

const INITIAL_STATE = {
    email: "",
}

const Forgot = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting} = useForm(
        INITIAL_STATE, validatePasswordReset, handleResetPassword)
    const [busy, setBusy] = React.useState(false);
    async function handleResetPassword() {
        const { email } = values;
        try {
            await firebase.resetPassword(email);
            toast("Email with pasword reset link was sent successfully!");
            props.history.push("/")
        } catch (err) {
            console.error('Password Reset Error', err);
            toast(err.message);
        }
        setBusy(false);
    }
    return (
        <IonPage>
            <NavHeader title="Password Reset" />
            <IonLoading message={"Please wait..."} isOpen={busy} />
            <IonContent>
                <IonItem lines="null">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disable={isSubmitting}>
                            Get Reset Link
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Forgot
