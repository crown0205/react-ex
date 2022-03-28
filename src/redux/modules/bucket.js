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
  list: [],
};

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function cerateBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

//Middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));

    let bucket_list = [];

    bucket_data.forEach(bucket_item => {
      bucket_list.push({ id: bucket_item.id, ...bucket_item.data() });
    });

    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFE = bucket => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const bucket_data = { id: docRef.id, ...bucket };

    dispatch(cerateBucket(bucket_data));
  };
};

export const updateBucketFB = bucket_id => {
  // db에서 수정만 하면 되기 때문에 그냥 id값만 찾으면 된다.
  return async function (dispatch, getState) {
    console.log(bucket_id);
    const docRef = doc(db, "bucket", bucket_id);  // Detail에서 받아온 아이디 값으로 DB에서 같은 아이디인 item을 찾는다.
    console.log(docRef);
    await updateDoc(docRef, { completed: true }); // 찾은 item을 업데이트 시켜준다. -끝- (DB에 데이터 업데이트 시켜주는거)

    console.log("getState : ",getState()) //getState( ) : 애플리케이션의 현재 상태 트리를 반환합니다. 스토어의 리듀서가 반환한 마지막 값과 같습니다.
    console.log(getState().bucket.list)   // https://redux.js.org/api/store#getstate / 참조
    
    const _bucket_list = getState().bucket.list;  // 스토어에 남아 있는 값에서 list의 값을 찾는다.
    
    console.log(_bucket_list)

    const bucket_index = _bucket_list.findIndex((item)=>{  // 각 요소의 id값과 받아온 "bucket_id"을 비교해 찾아낸다.
      console.log("bucket_id : ",bucket_id)
      console.log("item.id : ",item.id)

      return item.id === bucket_id;  // item의 순번을 찾아서 return 해준다. 
    })           //  ⬆ 의 값
    console.log("bucket_index : ",bucket_index) 
    dispatch(updateBucket(bucket_index))   // 리덕스에 있는 데이터도 업데이트를 시켜준다.
  };
};

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list };
    }

    case "bucket/CREATE": {
      const new_bucket_list = [
        ...state.list,
        { text: action.bucket.text, completed: false },
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
