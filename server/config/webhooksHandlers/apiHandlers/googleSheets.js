"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    create_sheet: (paramObj) => {
      let data = [
        {
          "startRow": 0,
          "startColumn": 0,
          "rowData": [
            {
              "values": [
                {
                  "userEnteredValue": {
                    "stringValue": 'string value',
                  },
                }
              ],
            }
          ],
        },
        {
          "startRow": 1,
          "startColumn": 0,
          "rowData": [
            {
              "values": [
                {
                  "userEnteredValue": {
                    "numberValue": 123,
                  },
                }
              ],
            }
          ],
        }
      ];
      let spreadsheet = {
        "properties": {
          "title": paramObj.actionParams.sheet_title,
        },
        "sheets": [
          {
            "properties": {
              "gridProperties": {
                "rowCount": 2,
                "columnCount": 2,
              },

            },
            "data": data
          }
        ],
      }
      let token = paramObj.actionToken;
      let options = {
        uri: 'https://sheets.googleapis.com/v4/spreadsheets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ya29.Cj6mAz5OssQ7CiIQOPnBgxHxVjBDG_twN1ynVPyc3oSUMG1VP3p7xARpV0lkN76ACnMsrOfl8mnZ49qFEPy49g`
        },
        json: spreadsheet
      }
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
