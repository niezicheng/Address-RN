/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SectionList,
  TouchableHighlight,
  Toast,
} from 'react-native';
// import Constants from 'expo-constants';
import {findIndex} from 'lodash';
import jsonData from './provinces.json';
import sliderData from './letter.json';

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const App = () => {
  const sectionRef = createRef();

  const scrollToLocation = (indexKey) => {
    // Toast.info(indexKey);
    const sectionIndex = findIndex(jsonData, (item) => {
      return item.title === indexKey;
    });
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollToLocation({sectionIndex, itemIndex: 0});
    }
  };

  const sliderDataView = sliderData.map((item) => {
    return (
      <TouchableHighlight
        key={item}
        onPress={() => {
          scrollToLocation(item);
        }}>
        <Text style={styles.letterStyle}>{item}</Text>
      </TouchableHighlight>
    );
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <SectionList
          ref={sectionRef}
          sections={jsonData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <Item key={`item_${index}`} title={item} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <View style={styles.sliderNav}>{sliderDataView}</View>
      </SafeAreaView>
    </>
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  sliderNav: {
    width: 20,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  letterStyle: {
    padding: 3,
  },
});

export default App;
