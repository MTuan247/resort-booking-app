import { Box, Center, Modal, HStack, Icon, Divider, VStack, ScrollView, Heading } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import BaseInput from '../base/BaseInput';
import locationApi from '../../common/api/location';

export default function SelectLocation({ visible, setVisible, onSelect }) {

  const [locations, setLocation] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    load();
  }, []);

  /**
   * Load dữ liệu
   */
  const load = async (name) => {
    locationApi.search({ location_name: name }).then(res => {
      setLocation(res.data);
    });
  }

  /**
   * Xử lý tìm kiếm
   * @param {*} text 
   */
  const handleSearch = (text) => {
    load(text);
  }

  /**
   * Chọn địa điểm
   * @param {*} location 
   */
  const selectLocation = (location) => {
    onSelect(location);
    setVisible(false);
  }

  return (
    <>
      <Modal size={"full"} isOpen={visible} onClose={() => setVisible(false)}>
        <Modal.Content flex={1}>
          <Modal.Body>
            <HStack marginBottom={4}>
              <Pressable onPress={() => setVisible(false)}>
                <Icon as={Ionicons} size={10} name='close-outline'></Icon>
              </Pressable>
              <BaseInput
                InputLeftElement={
                  <Icon
                    m="2" ml="3" size="6" color={global.theme.COLORS.BLACK}
                    as={<Ionicons name="search-outline" />}
                  />
                }
                marginLeft={2} placeholder="Nhập địa điểm" flex={1}
                fontSize={16}
                value={search}
                onChangeText={(text) => {setSearch(text)}}
                onSubmitEditing={(e) => {handleSearch(e.nativeEvent?.text)}}
              ></BaseInput>
            </HStack>
            <Divider></Divider>

            <ScrollView>
              {
                locations.map(location => {
                  return (
                    <Pressable onPress={() => selectLocation(location)} key={location.location_id}>
                      <HStack alignItems={"center"} marginTop={4}>
                        <Center borderRadius={4} height={12} width={12} bg={global.theme.COLORS.LIGHTGRAY}>
                          <Icon color={global.theme.COLORS.DARKGRAY} as={Ionicons} name='location-sharp'></Icon>
                        </Center>
                        <VStack marginLeft={4}>
                          <Heading fontSize={18} fontWeight={500}>{location.location_name}</Heading>
                        </VStack>
                      </HStack>
                    </Pressable>
                  )
                })
              }
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );

};

const styles = StyleSheet.create({

});
