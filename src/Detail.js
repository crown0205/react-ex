// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Detail = (props) => {
  const pramas = useParams();
  const bucket_list = useSelector((state)=> state.bucket.list)
  const bucket_text = bucket_list[pramas.index]

  return <h1>{bucket_text}</h1>;
};

export default Detail;