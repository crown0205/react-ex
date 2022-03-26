// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteBucket } from "./redux/modules/bucket";

const Detail = (props) => {
  const dispatch = useDispatch()
  const pramas = useParams();
  const history = useHistory()
  const bucket_list = useSelector((state)=> state.bucket.list)
  const bucket_index = pramas.index // item의 index
  const bucket_text = bucket_list[pramas.index]

  return (
    <>
    <h1>{bucket_text}</h1>
    <button onClick={()=>{
      console.log('삭제 버튼 눌림')
      history.goBack();
      dispatch(deleteBucket(bucket_index)) // 4) 버튼에 dispatch를 통해 액션 함수 실행, 
    }}>                                   {/*  그리고 item의 몇번째인지 알아야하기 때문에 index를 같이 넘겨서 redux로 보내준다 */}

      삭제하기
    </button>
    </>
  );
};

export default Detail;