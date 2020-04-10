import React , { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import Styles from './style';

export default function Incidents(){
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const navigation = useNavigation();
    
    function navigationToDetails(){
        navigation.navigate('Details');
    }

    async function loadIncidents(){
        const response = await api.get('incidents');
        setIncidents(response.data);
        setTotal(response.headers['X-total-count']);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={logoImg} />
                <Text style={Styles.headerText}>
                    Total de <Text tyle={Styles.headerTextBold}>{total} casos</Text> 
                </Text>
            </View>

            <Text tyle={Styles.title}>Bem-vindo!</Text>
            <Text tyle={Styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
       
            <FlatList
                data={incidents}
                style={Styles.incidentList}
                showsVerticalScrollIndicator={false}
                keyExtractor={incident => String(incident.id)}
                renderItem={({ item: incident })=>(
                    <View style={Styles.incident}>
                        <Text style={Styles.incidentPorperty}>ONG:</Text>
                        <Text style={Styles.incidentValue}>{incident.name}</Text>

                        <Text style={Styles.incidentPorperty}>CASO:</Text>
                        <Text style={Styles.incidentValue}>{incident.description}</Text>

                        <Text style={Styles.incidentPorperty}>VALOR:</Text>
                        <Text style={Styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity 
                            style={Styles.detailsButton} 
                            onPress={navigationToDetails}
                        >
                            <Text style={Styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
} 