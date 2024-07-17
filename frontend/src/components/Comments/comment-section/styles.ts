import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  CommentsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  BoxInputComment: {
    flex: 1,
    height: 40,
    marginRight: 5,
    backgroundColor: '#EFEFEF',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
