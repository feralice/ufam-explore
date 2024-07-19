import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  safeAreaView: {
    flex: 1,
    zIndex: 4,
  },
  popup: {
    borderRadius: 8,
    borderColor: 'darkblue',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 4,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    zIndex: 4,
  },
  optionText: {
    zIndex: 4,
    color: 'darkblue',
  },
});
