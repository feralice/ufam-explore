import { StyleSheet } from 'react-native';
import { deviceWidth } from '../../../utils/get-device-width';

const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 80,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    zIndex: 1,
  },
  cardContainer: {
    width: deviceWidth * (0.82 + proporcao),
    backgroundColor: '#FFF',
    borderRadius: radius,
    borderColor: 'darkblue',
    borderWidth: 1,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePerfil: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  postContent: {
    marginBottom: 15,
  },
  imageStyle: {
    height: 250,
    width: '100%',
    borderRadius: radius,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
    marginBottom: 15,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  loadingIndicator: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  eventInfoContainer: {
    padding: 15,
    borderRadius: radius,
    backgroundColor: '#F5F5F5',
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  eventSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  eventText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  addToCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addToCalendarText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'blue',
  },
  fullImageContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
