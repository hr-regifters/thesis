exports.servicesDetailJSON = {
  slack: {
    name: 'slack',
    icon: 'https://www.slack.com/favicon.ico',
    trigger: {
      options: [
        { description: 'When a file is uploaded to Slack ',
          alias: 'file_created',
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
    name: 'evernote',
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
          alias: 'postNote',
          parameters: [
            { description: 'Notebook Name',
              alias: 'parentNotebook',
            },
          ],
        },
      ],
    },
  },
  fitbit: {},
  strava: {},
  twitch: {},
  facebook: {},
  twitter: {},
  github: {},
  instagram: {},
  googleCalendar: {},
  SMS: {},
};
