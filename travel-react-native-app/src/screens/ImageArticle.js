import { Avatar, Box, Pressable, Divider, HStack, Heading, Image, ScrollView, Text, VStack, Center } from 'native-base';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Dimensions, useWindowDimensions  } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const TabBar = ({tabs, setTab, activeTab}) => {

  return <ScrollView horizontal={true}>
    {
      tabs.map(tab => {
        return (
          <Pressable onPress={() => setTab(tab)} key={tab.key}>
            <Center height={50} style={tab.key == activeTab ? styles.activeTab : styles.tab} width={100}>
              <Text textAlign={"center"}>{tab.title}</Text>
            </Center>
          </Pressable>
        )
      })
    }
  </ScrollView>
}

export default function ImageArticle({ route, navigation }) {

  const param = route.params;

  useFocusEffect(
    useCallback(() => {
      let tabs = param.item.articles.map(article => {
        article.key = article.article_id;
        return article;
      })
      setTabs(tabs)
      if (tabs.length) {
        setTab(tabs[0])
      }
      return;
    }, [])
  );

  const [tabs, setTabs] = useState([
    { key: 'first', title: 'Hồ đá' },
    { key: 'second', title: 'Khu vui chơi' },
  ]);

  const [tab, setTab] = useState({});

  return (
    <Box style={styles.container}>
      <TabBar setTab={setTab} activeTab={tab.key} tabs={tabs} />
      <ScrollView>
      {
        tab?.images && tab.images.map(image => {
          return (
            <Image height={300} resizeMethod='scale' alt={image.image_id} key={image.image_id} source={{
              uri: image.src
            }}></Image>
          )
        })
      }
      </ScrollView>
      
    </Box>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  tab: {
    borderBottomColor: global.theme.COLORS.BORDER,
    borderBottomWidth: 1
  },
  activeTab: {
    borderBottomColor: global.theme.COLORS.PRIMARY,
    color: global.theme.COLORS.PRIMARY,
    borderBottomWidth: 1
  }
});
