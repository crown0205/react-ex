// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";

const BucketList = props => {
  const history = useHistory();
  const my_lists = useSelector((state)=>state.bucket.list) //스토어가 보내는 전체 데이터
                  // useSelector 사용해서 리덕스에 있는 초기값을 가져와서 랜더링해야됨!
                  // 14번째줄처럼!! map 사용 가능~!
  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle className="list_item" key={index} onClick={() => {
            history.push('/detail/'+ index)
          }}>
            {list}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
`;

export default BucketList;
