const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAllanswers(req, res) {
  const { userid } = req.user;
  const { answer } = req.body;
  const { questionid } = req.params;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide  required fields!!" });
  }

  // const questionid = uuidv4();
  //  console.log(questionid);
  try {
    const question = await dbconnection.query(
      "INSERT INTO answers (userid,questionid,answer ) VALUES (?,?,?)",
      [userid, questionid, answer]
    );

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "answer posted successfully " });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong please  try later" });
  }
}

// to get all answer
async function getAllAnswer(req, res) {
  const { questionid } = req.params;

  try {
    const data = await dbconnection.query(
    `select answers.*,users.username
  from  answers
  join users on answers.userid = users.userid
  where questionid=?
  order by answers.answerid desc`,
      [questionid]
    );
    // console.log(data);
    res.status(StatusCodes.OK).send(data[0]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postAllanswers, getAllAnswer };