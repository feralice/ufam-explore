import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#002E7D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#00186DDA',
  },
  filterText: {
    color: '#002E7D',
  },
  filterTextSelected: {
    color: '#FFF',
  },
  fetchButton: {
    marginVertical: 10,
    backgroundColor: '#002E7D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  fetchButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#7E7E7E',
    fontSize: 16,
    textAlign: 'center',
  },
  postContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 16,
  },
});
