import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Font } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { withNamespaces, I18nextProvider } from "react-i18next";
import { Provider as PaperProvider } from "react-native-paper";
import i18n from "./i18n";
import configureStore from "./state/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
const WrappedStack = ({ t }) => (
  <AppNavigator persistenceKey={navigationPersistenceKey} screenProps={{ t }} />
);

const ReloadAppOnLanguageChange = withNamespaces("common", {
  bindI18n: "languageChanged",
  bindStore: false,
  wait: true
})(WrappedStack);

const { store, persistor } = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <PaperProvider>
                <View style={styles.container}>
                  {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                  <ReloadAppOnLanguageChange />
                </View>
              </PaperProvider>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () =>
    Font.loadAsync({
      MaterialIcons: require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    });

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error); // eslint-disable-line
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
