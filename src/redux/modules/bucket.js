// bucket.js

// Actions
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE"; // 1) 타입 선언

const initState = {
  list: [
    { text: "영화관 가기", completed: false },
    { text: "매일 책읽기", completed: false },
    { text: "수영 배우기", completed: false },
    { text: "공부 하기", completed: false },
  ],
};

// Action Creators
export function cerateBucket(bucket) {
  // console.log("액션타입 체크 함");
  return { type: CREATE, bucket: bucket };
}

export function deleteBucket(bucket_index) {
  // console.log("지울 인덱스", bucket_index);
  return { type: DELETE, bucket_index };
}

export function updateBucket(bucket_index) {
  // 2) 액션 함수 설정
  // console.log("업데이트 할 인덱스", bucket_index);
  return { type: UPDATE, bucket_index };
}

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, index) => {
        return parseInt(action.bucket_index) !== index;
      });
      return { list: new_bucket_list };
    }

    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((l, index) => {
        if (parseInt(action.bucket_index) === index) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { list: new_bucket_list };
    }

    default:
      return state;
  }
}

// e.g. thunks, epics, etc // 미들웨어를 설정하는것.
// export function getWidget() {
//   return dispatch =>
//     get("/widget").then(widget => dispatch(updateWidget(widget)));
// }
