import { StyleSheet } from 'react-native';
import { deviceWidth } from '../../../utils/get-device-width';

const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#white',
  },
  cardContainer: {
    width: deviceWidth * (0.8 + proporcao),
    backgroundColor: '#FFF',
    borderRadius: radius,
    borderColor: 'darkblue',
    borderWidth: 1,
    margin: deviceWidth * 0.06,
    marginTop: 40,
    padding: 10,
  },
  imageStyle: {
    height: 250,
    width: '100%',
    borderRadius: radius,
    opacity: 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    gap: 10,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 'auto',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  alignItems: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingLeft: 10,
  },
  loadingIndicator: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  eventInfoContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventAssociate: {
    display: 'flex',
    fontSize: 14,
    marginBottom: 5,
  },
});
