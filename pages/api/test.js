export default function handler(req, res) {
  console.log(req.query)
  if (req.method == "POST") {
    res.status(200).json("처리완료함");
  }
}
