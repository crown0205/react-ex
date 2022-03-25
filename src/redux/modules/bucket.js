// 액션 타입을 정해줍니다.
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";

// 초기 상태값을 만들어줍니다.
const initialState = {
  list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};

// 액션 생성 함수예요.
// 액션을 만들어줄 함수죠!
export function createBucket(bucket) {
  console.log("액션을 생성할거야!");
  return { type: CREATE, bucket: bucket };
}

export function deleteBucket(bucket_index) {
  console.log("지울 버킷 인덱스", bucket_index);
  return { type: DELETE, bucket_index };
}

// 리듀서예요.
// 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      console.log("이제 값을 바꿀거야!");
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });

      return { list: new_bucket_list };
    }
    default:
      return state;
  }
}
