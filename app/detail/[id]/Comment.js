'use client'

import { useState } from "react";

export default function Comment(props) {
  let [comment, setCommnet] = useState("");
  return (
    <div>
      <div>댓글목록</div>
      <input onChange={(e) => { setCommnet(e.target.value) }} />
      <button onClick={() => {
          fetch("/api/comment", { method: "POST", body: comment });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
