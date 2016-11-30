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
      supportedActions: [],
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
            },
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
      supportedActions: [],
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
    icon: 'http://www.freeiconspng.com/uploads/sms-alert-icon-15.png',
    trigger: {
      options: ['none'],
      supportedActions: [],
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
            },
          ],
        },
      ],
    },
  },
  fitbit: {
    name: 'Fitbit',
    icon: 'https://www.fitbit.com/favicon.ico',
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
      supportedActions: [],
    },
    action: {
      options: ['none'],
    },
  },
  strava: {
    name: 'Strava',
    icon: 'https://www.strava.com/favicon.ico',
    trigger: {
      options: [],
      supportedActions: [],
    },
    action: {
      options: ['none'],
    },
  },
  instagram: {
    name: 'Instagram',
    icon: 'https://5a5a57ff32a328601212-ee0df397c56b146e91fe14be42fa361d.ssl.cf1.rackcdn.com/icon/instagram_logos_app_icon/YyepHGHDvkl1wFkUHw8Y/Instagram-v051916_200.png',
    trigger: {
      options: [],
      supportedActions: [],
    },
    action: {
      options: [],
    },
  },
  googleMail: {
    name: 'Gmail',
    icon: 'http://christiantraders.com/Christian%20Traders_files/favicon.ico',
    trigger: {
      options: ['none'],
      supportedActions: [],
    },
    action: {
      options: [
        { description: 'Send an Email',
          alias: 'send_email',
          parameters: [
            { description: 'Your Gmail',
              alias: 'email',
            },
            { description: "Recipient's Email",
              alias: 'recipient',
            },
            { description: 'Subject',
              alias: 'subject',
            },
            { description: 'Message',
              alias: 'gmail_text',
            },
          ],
        },
      ],
    },
  },
  googleSheets: {
    name: 'Google Sheets',
    icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Sheets-icon.png',
    trigger: {
      options: ['none'],
      supportedActions: [],
    },
    action: {
      options: [
        { description: 'Create a Spreadsheet',
          alias: 'create_sheet',
          parameters: [
            { description: 'Title',
              alias: 'sheet_title',
            },
          ],
        },
      ],
    },
  },
};
