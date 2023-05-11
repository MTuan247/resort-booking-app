import { Box, Center, Modal, HStack, Icon, Divider, VStack, ScrollView, Heading } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import BaseInput from '../base/BaseInput';

import DateRangePicker from "rn-select-date-range";
import moment from "moment";

export default function DateRange({ selectedRange, setRange, visible, setVisible }) {

  const onSetRange = (range) => {
    setRange(range);
  }

  return (
    <>
      <Modal size={"full"} isOpen={visible} onClose={() => setVisible(false)}>
        <Modal.Content>
          <Modal.Body>
            <DateRangePicker
              onSelectDateRange={(range) => {
                onSetRange(range);
              }}
              onConfirm={() => setVisible(false)}
              blockSingleDateSelection={true}
              responseFormat="DD/MM/YYYY"
              minDate={moment()}
              ln="en"
              selectedDateContainerStyle={styles.selectedDateContainerStyle}
              selectedDateStyle={styles.selectedDateStyle}
              confirmBtnTitle="Đồng ý"
              clearBtnTitle="Xóa"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );

};

const styles = StyleSheet.create({

});
