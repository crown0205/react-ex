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
  return async function (dispatch, getState) {
    if(!bucket_id){ 
      window.alert("item 아이디가 없어요.") 
    }
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex(item => {
      return item.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const deletedBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if(!bucket_id){ 
      window.alert("item 아이디가 없어요.") // id가 없을 경우 에러가 뜨지 않게 미리 조치 해준거.
    }
    const docRef = doc(db, "bucket", bucket_id)
    await deleteDoc(docRef)   // DB에서 bucket_id와 동일한 데이터를 삭제함

    // 리덕스에 있는 데이터 삭제하기 ( 방법은 업데이트 하는 방식과 동일하다. )
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex(item => {
      return item.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index))
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
