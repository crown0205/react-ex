// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";

const Detail = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pramas = useParams();
  const bucket_list = useSelector(state => state.bucket.list);
  const bucket_index = pramas.index;
  const bucket_text = bucket_list[pramas.index].text;
  console.log(bucket_text);

  return (
    <>
      <h1>{bucket_text}</h1>
      <button
        onClick={() => {
          // console.log('완료버튼 누름~!!')
          dispatch(updateBucket(bucket_index));
          history.goBack();
        }}
      >
        완료하기
      </button>

      <button
        onClick={() => {
          // console.log('삭제 버튼 눌림')
          history.push("/");
          dispatch(deleteBucket(bucket_index));
        }}
      >
        삭제하기
      </button>
    </>
  );
};

export default Detail;
