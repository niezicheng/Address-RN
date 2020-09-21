import React, {createRef, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// import Constants from 'expo-constants';
import {findIndex} from 'lodash';
import jsonData from './provinces.json';
import sliderData from './letter.json';
import styles from './style';

const Item = ({provincesName}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{provincesName}</Text>
    </View>
  );
};

export default () => {
  const sectionRef = createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState(jsonData);
  const [footerStatus, setFooterStatus] = useState(0);

  // 根据对应索引滑动定位
  const scrollToLocation = (indexKey) => {
    const sectionIndex = findIndex(addressData, (item) => {
      return item.title === indexKey;
    });
    if (sectionRef && sectionRef.current && sectionIndex !== -1) {
      sectionRef.current.scrollToLocation({sectionIndex, itemIndex: 0});
    }
  };

  // 侧边索引定位
  const sliderDataView = sliderData.map((titleKey) => {
    let isDisabled = false;
    const sectionIndex = findIndex(addressData, (item) => {
      return item.title === titleKey;
    });
    if (sectionIndex === -1) {
      isDisabled = true;
    }
    return (
      <TouchableOpacity
        key={titleKey}
        activeOpacity={0.8}
        onPress={() => {
          scrollToLocation(titleKey);
        }}>
        <Text style={[styles.letterStyle, isDisabled && styles.disableStyle]}>
          {titleKey}
        </Text>
      </TouchableOpacity>
    );
  });

  // 上拉刷新执行函数
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  // 下拉加载更多的数据信息
  const loadMoreData = () => {
    // setFooterStatus(1);
    setFooterStatus(2);
    // setFooterStatus(0);
  };

  // 底部加载更多样式
  const renderFooterMoreLoading = () => {
    if (footerStatus === 1) {
      return (
        <View style={styles.loadingMore}>
          <ActivityIndicator
            // style={}
            size="large"
            color="red"
            animating={true}
          />
          <Text style={styles.footerText}>正在加载...</Text>
        </View>
      );
    }
    if (footerStatus === 2) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.footerText}>已经到底了...</Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingMore}>
        <Text style={styles.footerText} />
      </View>
    );
  };

  return (
    <>
      <SectionList
        ref={sectionRef}
        sections={addressData} // 数据源
        keyExtractor={(item, index) => item + index} // 只设置每行 item 的 key 值
        renderItem={({item, index}) => (
          <Item key={`item_${index}`} provincesName={item} /> // 每个 section 中的 单个 item 列表项
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text> // 每个 section 部分头部渲染
        )}
        // 下拉刷行
        // refreshing={isLoading}
        // onRefresh={() => {
        //   refreshData();
        // }}
        refreshControl={
          <RefreshControl
            title="Loading" // android 中无效
            colors={['red']} // android
            tintColor="red" // ios
            titleColor="red"
            refreshing={isLoading}
            onRefresh={() => {
              refreshData();
            }}
          />
        }
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          loadMoreData();
        }}
        ListFooterComponent={() => renderFooterMoreLoading()}
        stickySectionHeadersEnabled={true}
      />
      <View style={styles.sliderNav}>{sliderDataView}</View>
    </>
  );
};
