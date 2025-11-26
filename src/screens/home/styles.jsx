import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: sizes.h1 * 2,
    fontFamily: 'TitleFont',
    margin: 15,
    color: colors.black,
  },
  fab: {
    backgroundColor: colors.teal,
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    backgroundColor: colors.lightGrey,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    fontSize: sizes.h3,
    color: colors.black,
  },
});

export default styles;

