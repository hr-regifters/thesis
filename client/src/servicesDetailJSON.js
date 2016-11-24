exports.servicesDetailJSON = {
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
          alias: 'none',
          parameters: [
            { description: 'Channel Name',
              alias: 'channelName',
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
      options: [
        { description: 'When a Note with a specific Tag is created',
          alias: 'none',
          parameters: [
            { description: 'Tag Name',
              alias: 'tagName',
            },
          ],
        },
        { description: 'When a Note in a Specific Notebook is created',
          alias: 'none',
          parameters: [
            { description: 'Notebook Name',
              alias: 'parentNotebook',
            },
          ],
        },
        { description: 'When a note in a any Notebook is created',
          alias: 'none',
          parameters: [
          ],
        },
      ],
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
  SMS: {
    name: 'SMS',
    icon: '',
    trigger: {
      options: ['none'],
    },
    action: {
      options: [
        { description: 'Send a Text Message',
          alias: 'send_sms',
          parameters: [
            { description: 'Phone Number: ',
              alias: 'phoneNumber',
            },
          ],
        },
      ],
    },
  },
  fitbit: {
    name: 'Fitbit',
    icon: '',
    trigger: {
      options: [],
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
  twitch: {
    name: 'Twitch',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
    },
  },
  facebook: {
    name: 'Facebook',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
    },
  },
  twitter: {
    name: 'Twitter',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
    },
  },
  github: {
    name: 'Github',
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
  googleCalendar: {
    name: 'Google Calenders',
    icon: '',
    trigger: {
      options: [],
    },
    action: {
      options: [],
    },
  },
};
