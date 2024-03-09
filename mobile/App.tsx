import 'react-native-gesture-handler';
import { RootNavigation } from './src/ui/navigation';
import { store } from './src/ui/store/store';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config'; // Optional if you want to use default theme
import { loadFonts } from './src/utils/fonts';
import { View, Text } from 'react-native';

function EntryPoint() {
  const { fontsLoaded } = loadFonts();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  return <RootNavigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <EntryPoint />
      </GluestackUIProvider>
    </Provider>
  );
}
