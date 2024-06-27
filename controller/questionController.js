const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const { v4: uuidv4 } = require("uuid");
async function postQuestion(req, res) {
  const { title, description, tag } = req.body;

  // Generate a unique question ID
  const questionid = uuidv4();

  const userid = req.user.userid;
  console.log(userid);

  // Check if required fields are provided
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }

  try {
    // Insert  into the database
    const result = await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag]
    );

    //
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "your question has posted", questionid });
  } catch (error) {
    console.log(error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Question ID already exists" });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong" });
  }
}
async function getAllQuestion(req, res) {
  try {
    const data = await dbConnection.query(
      `select questions.*,users.username
  from  questions
  join users on questions.userid = users.userid
  order by questions.id desc`
    );
    // console.log(data);
    res.status(StatusCodes.OK).send(data[0]);
  } catch (error) {
    console.log(error);
  }
}

async function getspecificQuestion(req, res) {
  const {questionid} = req.params
  try {
    const data = await dbConnection.query(
      `select questions.*,users.username
  from  questions
  join users on questions.userid = users.userid
  where questions.questionid=?`,
      [questionid]
    );
    // console.log(data);
    res.status(StatusCodes.OK).send(data[0]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postQuestion, getAllQuestion, getspecificQuestion };