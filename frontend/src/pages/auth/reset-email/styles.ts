import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 18,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'darkblue',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  boxInput: {
    backgroundColor: 'rgba(0, 0, 139, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'darkblue',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  inputField: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 4,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
