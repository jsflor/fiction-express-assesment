import { useFonts } from 'expo-font';

export const loadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/Fonts/Montserrat/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/Fonts/Montserrat/Montserrat-Regular.ttf'),
    'Merriweather-Bold': require('../assets/Fonts/Merriweather/Merriweather-Bold.ttf'),
    'Merriweather-Regular': require('../assets/Fonts/Merriweather/Merriweather-Regular.ttf'),
  });

  return { fontsLoaded };
};
