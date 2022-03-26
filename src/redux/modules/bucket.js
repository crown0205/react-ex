// ㅠㅕ찯ㅅ.js

// Actions
// const LOAD = "my-app/widgets/LOAD"; // 서버에서 가져올때 쓰는거
const CREATE = "bucket/CREATE";

const initState = {
  list : [
    "영화관 가기",
    "매일 책읽기",
    "수영 배우기",
  ]
}

// Action Creators
export function cerateBucket(bucket){
  console.log('액션타입 체크 함')
  return {type: CREATE, bucket: bucket}  // bucket값이 새로운 데이터다 그게 action으로 받아진다.
}                                        // "action.bucket" 25번째열

// Reducer                      // 기본값 <= 7번째열  // action에 값이 없으면 빈배열이 들어간다라는 의미.
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {  
      console.log('새로운 데이터 받아서 리스트에 추가 작업 진행 해줄꺼임')
                                       // 새 데이터를 반환하는 리듀서 
      const new_bucket_list = [...state.list, action.bucket]; // 그게 새데이터인 "bucket: bucket"가 기존 배열을 복사한거에다가 새로운 데이터를 받아 추가하는거다. 
      return {list: new_bucket_list};                         // action으로 받아진다.
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
