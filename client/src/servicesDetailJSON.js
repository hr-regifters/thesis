module.exports = {
  slack: {
    name: 'Slack',
    icon: 'https://www.slack.com/favicon.ico',
    trigger: {
      options: [
        { description: 'When a file is uploaded ',
          alias: 'file_created',
          parameters: [
          ],
        },
        { description: 'When a message is pinned ',
          alias: 'pin_added',
          parameters: [
          ],
        },
      ],
    },
    action: {
      options: [
        { description: 'Post to a Slack Channel',
          alias: 'post_message',
          parameters: [
            { description: 'Channel Name',
              alias: 'channelName',
            },
            { description: 'Message',
              alias: 'slack_text',
            }
          ],
        },
      ],
    },
  },
  evernote: {
    name: 'Evernote',
    icon: 'https://www.evernote.com/favicon.ico',
    trigger: {
      options: ['none'],
    },
    action: {
      options: [
        { description: 'Add a note to one of your notebooks',
          alias: 'create_note',
          parameters: [
            { description: 'Notebook Name',
              alias: 'parentNotebook',
            },
          ],
        },
      ],
    },
  },
  twilio: {
    name: 'SMS',
    icon: '',
    trigger: {
      options: ['none'],
    },
    action: {
      options: [
        { description: 'Send a Text Message',
          alias: 'send_text',
          parameters: [
            { description: 'Phone Number',
              alias: 'phoneNumber',
            },
            { description: 'Message',
              alias: 'twilio_text',
            }
          ],
        },
      ],
    },
  },
  fitbit: {
    name: 'Fitbit',
    icon: '',
    trigger: {
      options: [
        { description: 'When you complete an activity ',
          alias: 'activity_logged',
          parameters: [
            { description: 'Activity',
              alias: 'fitbit_activity',
            },
          ],
        },
      ],
    },
    action: {
      options: ['none'],
    },
  },
  strava: {
    name: 'Strava',
    icon: '',
    trigger: {
      options: [
        { description: 'When you complete an activity ',
          alias: 'activity_logged',
          parameters: [
            { description: 'Activity',
              alias: 'strava_activity',
            },
          ],
        },
      ],
    },
    action: {
      options: ['none'],
    },
  },
  instagram: {
    name: 'Instagram',
    icon: '',
    trigger: {
      options: [
        { description: 'When you upload a picture ',
          alias: 'picture_uploaded',
          parameters: [
          ],
        },
      ],
    },
    action: {
      options: ['none'],
    },
  },
  googleMail: {
    name: 'Gmail',
    icon: '',
    trigger: {
      options: ['none']
    },
    action: {
      options: [
        { description: 'Send an Email',
          alias: 'send_email',
          parameters: [
            { description: 'Your gmail',
              alias: 'email',
            },
            { description: "Recipient's email",
              alias: 'recipient',
            },
            { description: 'Subject',
              alias: 'subject',
            },
            { description: 'Message',
              alias: 'gmail_text',
            }
          ]
        }
      ]
    },
  },
  googleSheets: {
    name: 'Google Sheets',
    icon: '',
    trigger: {
      options: ['none']
    },
    action: {
      options: [
        { description: 'Create a Spreadsheet',
          alias: 'create_sheet',
          parameters: [
            { description: 'Title',
              alias: 'sheet_title',
            },
          ]
        }
      ]
    },
  },
};
