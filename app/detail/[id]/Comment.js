"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/comment/list?id=' + props.parentId)
    .then(r=>r.json())
    .then((result)=>{
      console.log(result)
      setData(result)
    })
  }, []);

  return (
    <div>
      <hr></hr>
      <div><h4>댓글목록</h4></div>
      {
        data.length > 0 ?
        data.map((item, index)=>{
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <p>내용: {item.content} /</p>&nbsp;
            <p>ID: {item.author}</p>
            </div>
          )
        }) : '댓글없음'
      }
      <input 
      placeholder='댓글 입력' 
      value={comment}
      onChange={(e) => { setComment(e.target.value) }} 
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props.parentId }),
          })
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
