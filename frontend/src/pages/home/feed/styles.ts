import { StyleSheet } from 'react-native';

export const feedStyles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 70, paddingBottom: 5 },

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
    position: 'absolute',
    right: 0,
    bottom: 0,
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
