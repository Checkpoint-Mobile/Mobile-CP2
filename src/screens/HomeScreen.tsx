
import React, { useCallback, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ContactList, { SimpleContact } from '../components/ContactList';
import { styles } from '../styles/styles';

export default function HomeScreen() {
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState<SimpleContact[]>([]);
  const [showContacts, setShowContacts] = useState(false);

  const requestAndLoadContacts = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da permissão para acessar seus contatos.');
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
      pageSize: 2000
    });
    const simplified: SimpleContact[] = (data || []).map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phoneNumbers && c.phoneNumbers.length > 0 ? c.phoneNumbers[0].number || null : null
    }));
    setContacts(simplified);
    setShowContacts(true);
  }, []);

  const makeCall = useCallback(async (target?: string) => {
    const number = target || phone;
    if (!number) {
      Alert.alert('Informe um número', 'Digite um número de telefone ou selecione um contato.');
      return;
    }
    const url = `tel:${number.replace(/\s|\(|\)|-/g, '')}`;
    const supported = await Linking.canOpenURL(url);
    if (!supported) return Alert.alert('Não suportado', 'Seu dispositivo não pode fazer ligações.');
    await Linking.openURL(url);
  }, [phone]);

  const openWhatsApp = useCallback(async (target?: string) => {
    const number = target || phone;
    if (!number) {
      Alert.alert('Informe um número', 'Digite um número de telefone ou selecione um contato.');
      return;
    }
    const cleaned = number.replace(/\D/g, '');
    const wa = `whatsapp://send?phone=${cleaned}&text=${encodeURIComponent('Olá!')}`;
    const supported = await Linking.canOpenURL(wa);
    if (!supported) {
      Alert.alert('WhatsApp não encontrado', 'Instale o WhatsApp para usar este recurso.');
      return;
    }
    await Linking.openURL(wa);
  }, [phone]);

  const shareSomething = useCallback(async () => {
    try {
      const content = 'Compartilhado via Expo Sharing (TS) — exemplo do curso.';
      const fileUri = FileSystem.cacheDirectory + 'exemplo.txt';
      await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
      const available = await Sharing.isAvailableAsync();
      if (!available) return Alert.alert('Indisponível', 'O compartilhamento não está disponível neste dispositivo.');
      await Sharing.shareAsync(fileUri);
    } catch (e) {
      Alert.alert('Erro ao compartilhar', String(e));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissões & Plugins Nativos (Expo + TS)</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={requestAndLoadContacts}>
          <Text style={styles.buttonText}>Abrir lista de contatos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.listText}>Número de telefone (com DDD):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 11999999999"
          placeholderTextColor="#64748b"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.button} onPress={() => makeCall()}>
          <Text style={styles.buttonText}>Fazer ligação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#16a34a' }]} onPress={() => openWhatsApp()}>
          <Text style={styles.buttonText}>Abrir WhatsApp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={shareSomething}>
          <Text style={styles.buttonText}>Compartilhar (expo-sharing)</Text>
        </TouchableOpacity>
      </View>

      <ContactList
        visible={showContacts}
        contacts={contacts}
        onClose={() => setShowContacts(false)}
        onPressContact={(c) => {
          setPhone(c.phone || '');
          setShowContacts(false);
        }}
      />
    </View>
  );
}
