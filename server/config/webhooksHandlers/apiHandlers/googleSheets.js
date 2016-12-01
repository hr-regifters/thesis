"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    create_sheet: (paramObj) => {
      let numProperties = Object.keys(paramObj.data).length;
      let categories = [];
      let statistics = [];
      for (let i = 0; i < paramObj.data.length; i++) {
        for (const prop in paramObj.data[i]) {
          let category = {
            'values': [
              {
                'userEnteredValue': {},
              }
            ]
          };

          let statistic = {
            'values': [
              {
                'userEnteredValue': {},
              }
            ]
          };

          let categoryValObj = {};
          categoryValObj['stringValue'] = prop;
          category.values.userEnteredValue = categoryValObj;
          categories.push(category);

          let statType = typeof paramObj.data[i][prop] === 'number' ? 'numberValue' : 'stringValue';
          let statValObj = {};
          statValObj[statType] = paramObj.data[i][prop];
          statistic.values.userEnteredValue = statValObj;
          statistics.push(statistic);
        };
      }
      
      let spreadsheet = {
        'properties': {
          'title': paramObj.actionParams.sheet_title,
        },
        'sheets': [
          {
            'properties': {
              'gridProperties': {
                'rowCount': numProperties,
                'columnCount': numProperties,
              },
            },
            'data': [
              {
                'startRow': 0,
                'startColumn': 0,
                'rowData': categories,
              },
              {
                'startRow': 0,
                'startColumn': 1,
                'rowData': statistics,
              }
            ]
          }
        ],
      }
      let token = paramObj.actionToken;
      let options = {
        uri: 'https://sheets.googleapis.com/v4/spreadsheets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: spreadsheet
      }
      console.log(categories[0].values[0].userEnteredValue, 'categories');
      console.log(statistics[0].values[0].userEnteredValue, 'statistics');
      console.log(spreadsheet.sheets[0].data, typeof paramObj.data);
      request(options, (err, res, body) => {
        if (body.error) {
          console.log('error', body);
        } else {
          console.log('Successfully created spreadsheet');
        }
      });
    },
  },
};
