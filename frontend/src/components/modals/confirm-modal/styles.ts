import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  modalButtonConfirm: {
    backgroundColor: '#00186DDA',
  },
  modalButtonTextCancel: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalButtonTextConfirm: {
    color: 'white',
    fontWeight: 'bold',
  },
});
