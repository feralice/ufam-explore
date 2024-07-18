import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  message: {
    marginTop: 5,
    fontSize: 13,
  },
});
