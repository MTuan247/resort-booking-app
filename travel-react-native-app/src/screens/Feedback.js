import { Box, FlatList, HStack, Heading, Icon, Input, Pressable, Progress, ScrollView, Text, TextArea, VStack } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Rating from '../components/reuse/Rating';
import commentApi from '../common/api/comment';

export default function FeedbackScreen({route}) {

  const [title, setTitle] = useState();
  const [comment, setComment] = useState();

  const titleRef = useRef();
  const commentRef = useRef();

  const [titleError, setTitleError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [titleErrorMsg, setTitleErrorMsg] = useState();
  const [commentErrorMsg, setCommentErrorMsg] = useState();

  const [starRating, setStarRating] = useState(5);

  const param = route.params;

  /**
   * Validate required
   * @param {*} value 
   * @param {*} fn 
   */
  const validateRequired = (value, setValid, setMsg, label) => {
    setValid(!value);
    setMsg(!value ? label + ' không được phép để trống.' : null);

    return value;
  }

  useFocusEffect(
    useCallback(() => {
      load();
      return;
    }, [])
  );

  /**
   * Load dữ liệu
   */
  const load = async () => {
    console.log(param.item);
  }

  const navigation = useNavigation();

  const postFeedback = () => {
    if (!validateRequired(title, setTitleError, setTitleErrorMsg, 'Tiêu đề')) {
      titleRef.current.focus();
      return;
    }
    
    if (!validateRequired(comment, setCommentError, setCommentErrorMsg, 'Nội dung đánh giá')) {
      commentRef.current.focus();
      return;
    }

    commentApi.post({
      Model: {
        title: title,
        comment: comment,
        resort_id: param.item.resort_id,
        score: starRating
      }
    })

    Alert.alert('Thông báo', 'Gửi đánh giá thành công', [
      { text: 'Đồng ý', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <VStack flex={1}>
      <ScrollView flex={1} margin={4}>
        
        <Text marginTop={2} color={global.theme.COLORS.DARKGRAY}>Tiêu đề</Text>
        <Input onEndEditing={() => validateRequired(title, setTitleError, setTitleErrorMsg, 'Tiêu đề')} isInvalid={titleError} ref={titleRef} fontSize={16} height={10} variant="underlined" value={title} onChangeText={text => setTitle(text)}></Input>
        <Text marginTop={2} fontSize={12} color={global.theme.COLORS.RED}>{titleErrorMsg}</Text>

        <Text marginTop={8} marginBottom={2} color={global.theme.COLORS.DARKGRAY}>Nội dung đánh giá</Text>
        <TextArea borderColor={global.theme.COLORS.BLACK} borderWidth={0.5} onEndEditing={() => validateRequired(comment, setCommentError, setCommentErrorMsg, 'Nội dung đánh giá')} isInvalid={commentError} ref={commentRef} placeholder='Nhập nội dung' fontSize={16} height={10} value={comment} onChangeText={text => setComment(text)}></TextArea>
        <Text marginTop={2} fontSize={12} color={global.theme.COLORS.RED}>{commentErrorMsg}</Text>

        <Text marginTop={8} marginBottom={2} color={global.theme.COLORS.DARKGRAY}>Điểm đánh giá</Text>
        <Rating starRating={starRating} setStarRating={setStarRating} />

      </ScrollView>

      <Pressable onPress={() => postFeedback()} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} marginY={4} marginX={4} marginTop={4} borderRadius={8} padding={3} backgroundColor={global.theme.COLORS.PRIMARY}>
        <Text fontSize={18} fontWeight={500} color={global.theme.COLORS.WHITE}>Gửi đánh giá</Text>
      </Pressable>
    </VStack>
  )
}

const styles = StyleSheet.create({
});
