'use strict';

const express = require('express');
const router = express.Router();

const topicSchema = require('../models/topics');

const topicDataModel = require('../models/topics-data');

const topics = new topicDataModel(topicSchema);

router.get('/search', search);

async function search(req, res) {
  let query = req.query.q;

  let record = await topics.get(query);
  console.log(record);
  res.status(200).send(record);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
///// THIS SECTION WAS ONLY NEEDED WHEN SETTING DATA UP IN DB. THIS COLLECTION IS UNNECESSARY./////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// const questionSchema = require('../models/questions');
// const questionDataModel = require('../models/questions-data');
// const questions = new questionDataModel(questionSchema);
// router.get('/update', updateAllTopicData);

// async function updateAllTopicData(req, res) {
//   let questionResults = await questions.get();
//   let results = await topics.get();

//   results.forEach(topic => {
//     let strings = topic._id.split('|').filter(item => item != '');
//     let regex = new RegExp(strings[strings.length - 1], 'g');

//     if (!topic.questionsArray)
//       topic.questionsArray = [];
//     let filteredQuestionsList = questionResults.filter((question) => {
//       if (question.annotation1.match(regex) || question.annotation2.match(regex) || question.annotation3.match(regex) || question.annotation4.match(regex) || question.annotation5.match(regex)) {
//         return question;
//       }
//     });
//     console.log(filteredQuestionsList);
//     filteredQuestionsList.forEach(question => topic.questionsArray.push(question._id));
//   });

//   topics.put(results);

//   res.status(200).send(results);

// }
module.exports = router;