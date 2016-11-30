module.exports = {
  slack: {
    name: 'Slack',
    icon: 'https://www.slack.com/favicon.ico',
    trigger: {
      options: [
        { description: 'When a file is uploaded in Slack ',
          alias: 'file_created',
          parameters: [
          ],
        },
        { description: 'When a message is pinned in Slack ',
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
        { description: 'Create a new Note in a specific Notebook',
          alias: 'post_note',
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
        { description: 'When you complete a Fitbit activity ',
          alias: 'activities',
          parameters: [
            { description: 'Activity',
              alias: 'activity',
            },
          ],
        },
      ],
    },
    action: {
      options: [],
    },
  },
  strava: {
    name: 'Strava',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
    },
  },
  instagram: {
    name: 'Instagram',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
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
