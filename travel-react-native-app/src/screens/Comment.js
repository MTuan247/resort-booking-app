import { Box, FlatList, HStack, Heading, Icon, Pressable, Progress, ScrollView, Skeleton, Text, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import screens from '../resources/screens';
import { MaterialCommunityIcons} from 'react-native-vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import resortApi from '../common/api/resort';
import assets from '../resources/assets';
import { Avatar } from '@rneui/base';
import { formatDate } from '../common/function/format';
import { scoreDescriptor, scoreRangeDescriptor } from '../common/function/feedback';
import commentApi from '../common/api/comment';

export default function CommentScreen({ route }) {

  const dispatch = useDispatch();
  const context = useSelector((state) => state.context);
  // const toast = useToast();

  const [feedback, setFeedback] = useState({
    comments: [],
    rates: [],
    rate: 0.0,
    text: '',
    summary: 0
  });
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noItem, setNoItem] = useState(false);

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
    let res = await commentApi.info({
      resort_id: param.item.resort_id,
      offset: offset, 
      limit: limit
    });
    setFeedback(res.data);
    setComments(res.data.comments);
    setOffset(offset + limit);
    
  }

  /**
   * Load thêm dữ liệu
   */
  const loadMore = async () => {
    if (loading || noItem) {
      return null;
    }

    if (comments.length == feedback.summary) {
      return null;
    }
    
    setLoading(true);

    // let more = [
    //   {
    //     comment_id: Math.random(),
    //     title: 'Một kỳ nghỉ tuyệt vời',
    //     comment: 'Vị trí phòng đẹp, khung cảnh tuyệt vời',
    //     created_date: '2022-01-18',
    //     score: 5,
    //     user: {
    //       name: 'Anonymous'
    //     }
    //   },
    //   {
    //     comment_id: Math.random(),
    //     title: 'Du lịch nghỉ dưỡng Ba Vì',
    //     comment: 'Phong cảnh đẹp, chất lượng phục vụ tuyệt vời, nhân viên phục vụ chu đáo thân thiênj',
    //     created_date: '2023-05-20',
    //     score: 4,
    //     user: {
    //       name: 'Hải Nghi'
    //     }
    //   },
    // ]

    let more = (await commentApi.list({
      resort_id: param.item.resort_id,
      offset: offset, 
      limit: limit
    })).data;

    let data = [...comments, ...more]
    
    setOffset(data.length);

    setComments(data);

    setLoading(false);

    if (more.length == 0) {
      setNoItem(true);
    }

    return data;
  }

  const navigation = useNavigation();

  const param = route.params;

  const postFeedback = () => {
    if (!context.loggedIn) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập để có thể sử dụng chức năng này!', [
        { text: 'Đồng ý', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }
    navigation.push(screens.SCREEN.FEEDBACK, {item: param.item });
  }

  /**
   * Render item comment
   * @param {*} param0 
   * @returns 
   */
  const renderComment = useCallback(({ item }) => {
    return (
      <VStack margin={4}>
        <HStack alignItems={'center'}>
          <Avatar background={global.theme.COLORS.CARD} size={35} source={item.user?.avatar ? {
            uri: item.user?.avatar
          } : assets.IMAGE.ANONYMOUS}>
          </Avatar>
          <VStack marginLeft={2} flex={1}>
            <Heading fontSize={18} fontWeight={600}>{item.user?.name}</Heading>
            <Text color={global.theme.COLORS.GRAY}>{formatDate(item.created_date)}</Text>
          </VStack>
          <Text fontSize={16} fontWeight={500}>{scoreDescriptor(item.score)}</Text>
          <Box alignItems={'center'} marginLeft={4} borderRadius={4} width={6} height={6} background={global.theme.COLORS.PRIMARY}>
            <Text color={global.theme.COLORS.WHITE}>{item.score}</Text>
          </Box>
        </HStack>
        <VStack marginTop={4}>
          <Heading fontWeight={600} fontSize={16}>{item.title}</Heading>
          <Text fontWeight={500} fontSize={16}>{item.comment}</Text>
        </VStack>
      </VStack>
    )
  }, []);

  /**
   * Render item comment skeleton
   */
  const renderCommentSkeleton = () => {
    if (!loading) {
      return <></>
    }

    return (
      <VStack>
        <Skeleton padding={4} h={16} rounded={'md'} />
        <Skeleton.Text padding={4} rounded={'md'} />
      </VStack>
    )
  }

  return (
    <VStack flex={1}>
      <HStack marginTop={4}>
        <VStack borderColor={global.theme.COLORS.PRIMARY} borderRadius={8} borderWidth={1} justifyContent={'center'} alignItems={'center'} paddingY={4} marginX={4} w='25%'>
          <Heading color={global.theme.COLORS.PRIMARY}>{Math.round(feedback.rate * 10) / 10}</Heading>
          <Heading textAlign={'center'} fontWeight={600} color={global.theme.COLORS.PRIMARY}>{scoreRangeDescriptor(feedback.rate)}</Heading>
          <Text color={global.theme.COLORS.PRIMARY}>{feedback.summary} đánh giá</Text>
        </VStack>
        <VStack paddingRight={2} flex={1}>
          {
            feedback.rates.map(rate => (
              <HStack key={rate.score} mx={1} alignItems={'center'}>
                <Text fontWeight={500} style={{ width: 75 }}>{scoreDescriptor(rate.score)}</Text>
                <Progress _filledTrack={{ bg: global.theme.COLORS.GRAY }} flex={1} mx={2} value={rate.value} max={feedback.summary} ></Progress>
                <Text fontWeight={500} textAlign={'right'} style={{ width: 24 }}>{rate.value}</Text>
              </HStack>
            ))
          }
        </VStack>
      </HStack>
      <HStack>
        <Pressable onPress={() => postFeedback()} alignItems={'center'} flexDirection={'row'} marginX={4} marginBottom={4} marginTop={4} borderRadius={8} padding={3} backgroundColor={global.theme.COLORS.PRIMARY}>
          <Icon size={7} marginRight={2} color={global.theme.COLORS.WHITE} as={MaterialCommunityIcons} name='pencil-outline' />
          <Text fontSize={18} fontWeight={500} color={global.theme.COLORS.WHITE}>Viết đánh giá</Text>
        </Pressable>
      </HStack>
      <VStack flex={1}>
        <FlatList
          data={comments}
          keyExtractor={comment => comment.comment_id}
          extraData={comments}
          renderItem={renderComment}
          onEndReached={loadMore}
          onEndThreshold={0.1}
          maxToRenderPerBatch={5}
          ListFooterComponent={renderCommentSkeleton}
        />
      </VStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
});
