exports.servicesDetailJSON = {
  slack: {
    name: 'slack',
    icon: '<slack icon>',
    trigger: {
      options: [
        { description: 'When a file is uploaded to Slack ',
          parameters: [
          ],
        },
      ],
    },
    action: {
      options: [
        { description: 'Post to a Slack Channel',
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
    icon: '<evernote icon>',
    trigger: {
      options: [
        { description: 'When a Note with a specific Tag is created',
          parameters: [
            { description: 'Tag Name',
              alias: 'tagName',
            },
          ],
        },
        { description: 'When a Note in a Specific Notebook is created',
          parameters: [
            { description: 'Notebook Name',
              alias: 'parentNotebook',
            },
          ],
        },
        { description: 'When a note in a any Notebook is created',
          parameters: [
          ],
        },
      ],
    },
    action: {
      options: [
        { description: 'Create a new Note in a specific Notebook',
          parameters: [
            { description: 'Notebook Name',
              alias: 'parentNotebook',
            },
          ],
        },
      ],
    },
  },
};
