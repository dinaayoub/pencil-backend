'use strict';

class Data {
  constructor(model) {
    this.model = model;
  }

  async get(_id) {
    if (_id) {
      //get rid of any extra quotation marks inserted into the data to allow commas in the imported CSV text
      _id = _id.replace(/"/g, '');

      //escape any dashes so that the returned regex match results are accurate
      let found = _id.indexOf('–');
      while (found >= 0) {
        _id = _id.replace('–', '\\-');
        found = _id.indexOf('–');
      }

      //create a regex using the _id with pipes around it as the path separator
      let regex = new RegExp('/\|' + _id + '\|/g');

      //retrieve all the topics that match the regex
      let results = await this.model.find({ _id: regex });

      let questions = [];

      results.forEach(async (result) => {
        if (result.questionsArray) {
          //remove the duplicates by using a set.
          questions = [...new Set([...questions, ...result.questionsArray])];
        }
      });

      //return the array of questions
      return questions;
      //or we could return the sorted array of questions if we don't mind another O(n log(n)) operation
      //return questions.sort((a, b) => a - b);
    }
    else {
      //return all topics. We would remove this if we don't want to allow this functionality but I think it would be useful for allowing admins to view the topics tree.
      let results = await this.model.find({});
      return results;
    }
  }

  ////////////////////////////////////////////////////////////////////
  ///// THIS SECTION WAS ONLY NEEDED WHEN SETTING DATA UP IN DB. /////
  ///// This code can be re-used when adding topics to the db.   /////
  ////////////////////////////////////////////////////////////////////

  // async put(array) {
  //   this.model.create(array);
  // }
}

module.exports = Data;
