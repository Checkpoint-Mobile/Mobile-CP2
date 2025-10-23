
import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export type SimpleContact = { id: string; name?: string | null; phone?: string | null };

type Props = {
  visible: boolean;
  contacts: SimpleContact[];
  onClose: () => void;
  onPressContact: (c: SimpleContact) => void;
};

export default function ContactList({ visible, contacts, onClose, onPressContact }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { paddingTop: 48 }]}>
        <Text style={styles.title}>Contatos</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => onPressContact(item)}>
              <Text style={styles.listText}>
                {item.name || 'Sem nome'} {item.phone ? `- ${item.phone}` : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
