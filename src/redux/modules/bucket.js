// bucket.js
import {db} from "../../firebase"  // 3) 파이어베이스에 import 해주기
import {                         // 4) Doc를 조작하기 위해서 명령어 불러오기
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

// Actions
const LOAD = "bucket/LOAD"; // 1) 타입선언
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE"; 

const initState = {
  list: [
    { text: "", completed: false }
  ],
};

// Action Creators
export function loadBucket(bucket_list){ // 2) load닌깐 db에 있는 모든 데이터를 불러와야된다. 그냥 여기서는 변수로 buck_list라고 한거다.
  return {type:LOAD, bucket_list}
}

export function cerateBucket(bucket) {
  console.log("액션타입 체크 함");
  console.log(bucket);
  return { type: CREATE, bucket: bucket };
}

export function deleteBucket(bucket_index) {
  // console.log("지울 인덱스", bucket_index);
  return { type: DELETE, bucket_index };
}

export function updateBucket(bucket_index) {
  // console.log("업데이트 할 인덱스", bucket_index);
  return { type: UPDATE, bucket_index };
}


//middlewares
export const loadBucketFB = () => {   // 5) 미들웨어 설정 
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"))
    // console.log(bucket_data)

    // db 데이터를 우리가 원하는 데이터 방식인 배열로 바꿔준다.
    let bucket_list = []

    bucket_data.forEach((bucket_item)=> {
      console.log(bucket_item.data()) // db에 있는 각 데이터를 하나씩 콘솔에 찍어준다.
      bucket_list.push({id:bucket_item.id,...bucket_item.data()})  // 데이터를 변경하거나 삭제하기 위해서는 item의 id값도 같이 불러와줘야 된다.
    })

    console.log(bucket_list) // 우리가 원하는 데이터 형식으로 잘 들어옴.

    dispatch(loadBucket(bucket_list)) //load bucket 액션 일으켜 준다. (버킷리스트 데이터 고쳐달라고 요청 끝남.) 하지만 라듀서에 고쳐주지 않아 화면상에서는 바뀌지 않는다.
    // "⬆️" 53번째 "dispatch"를 받아온다.
  } 
}


// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD" : { // 6) 리듀서에 load한 데이터로 어떻게 화면에 보이게 할지 수정
      return {list: action.bucket_list} // 이렇게 db에서 받아온 데이터를 기존 list에 데이터를 덮어씌운다.
    }

    case "bucket/CREATE": {
      console.log("Reducer", state, action);
      const new_bucket_list = [
        ...state.list,
        { text: action.bucket, completed: false },
      ]; 
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
