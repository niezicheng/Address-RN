import React, {createRef} from 'react';
import {View, Text, TouchableHighlight, SectionList} from 'react-native';
import {Toast} from '@ant-design/react-native';
// import Constants from 'expo-constants';
import {findIndex} from 'lodash';
import jsonData from './data/provinces.json';
import sliderData from './data/letter.json';
import styles from './styles';

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Address = () => {
  const sectionRef = createRef();

  const scrollToLocation = (indexKey) => {
    Toast.info(indexKey);
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
      <SectionList
        ref={sectionRef}
        sections={jsonData}
        keyExtractor={(item, index) => item + index}
        initialNumToRender={6}
        renderItem={({item, index}) => (
          <Item key={`item_${index}`} title={item} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <View style={styles.sliderNav}>{sliderDataView}</View>
    </>
  );
};

export default Address;
