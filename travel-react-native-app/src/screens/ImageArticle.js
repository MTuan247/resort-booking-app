import { Avatar, Box, Pressable, Divider, HStack, Heading, Image, ScrollView, Text, VStack, Center } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, useWindowDimensions  } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const windowHeight = Dimensions.get('window').height;

const TabBar = ({tabs, setTab, activeTab}) => {

  return <ScrollView horizontal={true}>
    {
      tabs.map(tab => {
        return (
          <Pressable onPress={() => setTab(tab.key)} key={tab.key}>
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

  const [tabs] = useState([
    { key: 'first', title: 'Hồ đá' },
    { key: 'second', title: 'Khu vui chơi' },
  ]);

  const [tab, setTab] = useState(tabs[0].key);

  return (
    <Box style={styles.container}>
      <TabBar setTab={setTab} activeTab={tab} tabs={tabs} />
      
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
    borderBottomWidth: 1
  }
});
