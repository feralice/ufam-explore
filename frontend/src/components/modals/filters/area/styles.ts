import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    areaItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
    },
    areaText: {
      fontSize: 16,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#002E7D',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });