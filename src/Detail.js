// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletedBucketFB, updateBucketFB } from "./redux/modules/bucket";

const Detail = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pramas = useParams();
  const bucket_list = useSelector(state => state.bucket.list);
  const bucket_index = pramas.index;
  const bucket_text = bucket_list[pramas.index].text;
  console.log(bucket_list[pramas.index].id);

  return (
    <>
      <h1>{bucket_text ? bucket_list[pramas.index].text : ""}</h1>
      <button
        onClick={() => {
          dispatch(updateBucketFB(bucket_list[pramas.index].id));
          history.goBack();
        }}
      >
        완료하기
      </button>

      <button
        onClick={() => {
          dispatch(deletedBucketFB(bucket_list[pramas.index].id))
          history.push("/");
        }}
      >
        삭제하기
      </button>
    </>
  );
};

export default Detail;
