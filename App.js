/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
// import Button from '@ant-design/react-native/lib/button';
import {Provider} from '@ant-design/react-native';
import Provinces from './components/address';

const App = () => {
  return (
    <Provider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Provinces />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    // marginHorizontal: 16,
    marginLeft: 15,
    flexDirection: 'row',
  },
});

export default App;
