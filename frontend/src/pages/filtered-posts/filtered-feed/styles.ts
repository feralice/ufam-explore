import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A6EA8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  filterButtonSelected: {
    backgroundColor: '#4A6EA8',
  },
  filterText: {
    color: '#4A6EA8',
    marginRight: 5,
  },
  filterTextSelected: {
    color: '#FFF',
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  clearButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  fetchButton: {
    backgroundColor: '#002E7D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  fetchButtonText: {
    color: '#FFF',
    fontSize: 16,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#002E7D',
    width: '80%',
    textAlign: 'center',
  },
});
