/**
   * Sinh ra điểm đánh giá
   * @param {*} score 
   * @returns 
   */
export const scoreDescriptor = (score) => {
  let result = ''
  switch (score) {
    case 5:
      result = 'Tuyệt vời';
      break;
    case 4:
      result = 'Tốt';
      break;
    case 3:
      result = 'Trung bình';
      break;
    case 2:
      result = 'Tệ';
      break;
    case 1:
    case 0:
      result = 'Rất tệ';
      break;
  }
  return result;
}

/**
   * Sinh ra điểm đánh giá
   * @param {*} score 
   * @returns 
   */
export const scoreRangeDescriptor = (score) => {
  let result = '';
  if (!score) {
    result = 'Chưa có đánh giá';
  } else if (score <= 1) {
    result = 'Rất tệ';
  } else if (score <= 2) {
    result = 'Tệ';
  } else if (score <= 3) {
    result = 'Trung bình';
  } else if (score <= 4) {
    result = 'Tốt';
  } else if (score <= 5) {
    result = 'Tuyệt vời';
  }
  return result;
}
