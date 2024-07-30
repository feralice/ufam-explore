import { StyleSheet } from 'react-native';

export const feedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 5,
  },
  bottomSelectionContainer: {
    paddingHorizontal: 60,
    paddingBottom: 20,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fab: {
    borderRadius: 50,
    backgroundColor: 'darkblue',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    shadowColor: 'darkblue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
