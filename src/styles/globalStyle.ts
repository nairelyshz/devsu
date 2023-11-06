import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;
const fontScale = PixelRatio.getFontScale();

export const colors = {
  primary: '#ffdd04',
  blue: '#2d3460',
  gray: '#efeff0',
  danger: '#d50708',
};
export function normalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return size / fontScale;
  }
}

export const textStyle = StyleSheet.create({
  xs: {
    fontSize: normalize(12),
  },
  sm: {
    fontSize: normalize(14),
  },
  base: {
    fontSize: normalize(16),
  },
  lg: {
    fontSize: normalize(18),
  },
  xl: {
    fontSize: normalize(20),
  },

  '1x': {
    fontSize: normalize(22),
  },

  '2x': {
    fontSize: normalize(25),
  },
});

export const generalStyle = StyleSheet.create({
  pageStyle: {
    paddingHorizontal: normalize(16),
    backgroundColor: 'white',
    height: '100%',
    paddingVertical: 40,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export const formStyle = StyleSheet.create({
  formInput: {
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 7,
  },
});
