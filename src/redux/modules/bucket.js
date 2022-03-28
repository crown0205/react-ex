// bucket.js
import { db } from "../../firebase";
import {
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
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";

const initState = {
  list: [{ text: "", completed: false }],
};

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
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
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    // console.log(bucket_data)

    let bucket_list = [];

    bucket_data.forEach(bucket_item => {
      // console.log(bucket_item.data());
      bucket_list.push({ id: bucket_item.id, ...bucket_item.data() });
    });

    console.log(bucket_list);

    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFE = bucket => {  // 1)
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const _bucket = await getDoc(docRef); // 2) 저장된 값을 리덕스로 보내 화면에 보이게 하기위해..
    const bucket_data = { id: _bucket.id, ..._bucket.data() }; // 2.5)
    // console.log((await getDoc(docRef)).data()) // 이렇게 해야 콘솔에 저장되는 값을 볼수 있다.

    console.log(bucket_data); // 3) 콘솔창에도 저장된 데이터 값 나옴

    // dispatch(cerateBucket({id: _bucket.id, ..._bucket.data()}))  // 4.5) 이렇게 해줘도 상관은 없다.
    dispatch(cerateBucket(bucket_data)); // 4)
  };
};

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list };
    }

    case "bucket/CREATE": {
      console.log("Reducer", state, action);
      const new_bucket_list = [
        ...state.list,
        { text: action.bucket.text, completed: false }, // "text: action.bucket" 이렇게 하면 Object 데이터를 그래도 랜더링 하려고 해서 에러가 발생한다.
      ];                                                // 요소의 특정 요소로 접근해야됨!
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
