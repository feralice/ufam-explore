import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 20,
  },
  header: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'darkblue',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: 'gray',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  boxInput: {
    backgroundColor: 'rgba(0, 0, 139, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkblue',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 15,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    color: 'darkblue',
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  passwordMismatch: {
    color: 'red',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 4,
  },
  confirmPasswordInput: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
});
