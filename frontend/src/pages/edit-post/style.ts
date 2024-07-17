import { StyleSheet } from 'react-native';
import { deviceWidth } from '../../utils/get-device-width';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkblue',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 139, 0.2)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'darkblue',
    padding: 10,
    marginVertical: 10,
    color: 'darkblue',
    width: '100%',
  },
  textArea: {
    height: 200,
  },
  imagem: {
    width: '100%',
    height: (deviceWidth * 2) / 3,
    borderRadius: 10,
    marginVertical: 10,
  },
  icones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    width: '100%',
  },
  iconWithLabel: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: 'darkblue',
    marginTop: 2,
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  EditButton: {
    backgroundColor: 'darkblue',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '60%',
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  publicarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    width: deviceWidth * 0.4,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  imagePicker: {
    backgroundColor: 'rgba(0, 0, 139, 0.1)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePickerText: {
    color: '#333',
    fontSize: 16,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerButton: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  eventInfoContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 139, 0.1)',
    borderRadius: 10,
    width: '100%',
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
