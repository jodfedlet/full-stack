import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import styles from './style';
import logoImg from '../../assets/logo.png';
export default function Detail(){
    const navigation = useNavigation();
    const message = 'Hello Teste de mensagem';

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:'Herói do cado em questão',
            recipients:['fedletpierre15@gmail.com'],
            body:message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5549999669170&text=${message}`);
    }

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={navigateBack}
                >
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentPorperty, {marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD:</Text>

                <Text style={styles.incidentPorperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                <Text style={styles.incidentPorperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00:</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                       <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                       <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
} 