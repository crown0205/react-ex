// bucket.js

// Actions
// const LOAD = "my-app/widgets/LOAD"; // 서버에서 가져올때 쓰는거
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE"; // 1) 먼저 타입부터 선언해준다.

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

export function deleteBucket(bucket_index){   // 2) 액션 타입은 선언 했으니 액션을 만들어주자.
  // console.log('DELETE 액션 실행함')
  console.log('지울 인덱스', bucket_index)
  return {type: DELETE, bucket_index} 
}                                        

// Reducer                      // 기본값 <= 7번째열  // action에 값이 없으면 빈배열이 들어간다라는 의미.
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {  
      console.log('새로운 데이터 받아서 리스트에 추가 작업 진행 해줄꺼임')
                                       // 새 데이터를 반환하는 리듀서 
      const new_bucket_list = [...state.list, action.bucket]; // 그게 새데이터인 "bucket: bucket"가 기존 배열을 복사한거에다가 새로운 데이터를 받아 추가하는거다. 
      return {list: new_bucket_list};                         // action으로 받아진다.
    }
    case "bucket/DELETE" : {           // 3) 액션을 실행해서 어떻게 바꿔줄지 실체적으로 일하는곳.
      console.log("state",state)
      console.log("action",action)
      const new_bucket_list = state.list.filter((l, index)=>{
        // console.log(parseInt(action.bucket_index) !== index, parseInt(action.bucket_index), index) 
        // filter을 이용해 같은 값을 가진 item만 걸러내고 나머지를 반환하는 방법을 사용함.
        return parseInt(action.bucket_index) !== index;
      })
      console.log(new_bucket_list)  // 최종확인 
      console.log({list: new_bucket_list})  // 최종 반환 할떄는는 initState의 형식대로 반환해줘야 에러가 안난다.
      return {list : new_bucket_list};
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
