
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#0f172a'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 12,
    color: '#e2e8f0'
  },
  button: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  listText: {
    color: '#e2e8f0'
  },
  section: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111827'
  }
});
