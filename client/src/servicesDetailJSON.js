exports.servicesDetailJSON = {
  slack: {
    name: 'slack',
    icon: '',
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
            },
          ],
        },
      ],
    },
  },
  evernote: {
    name: 'evernote',
    icon: '',
    trigger: {
      options: [
        { description: 'When a Note with a specific Tag is created',
          parameters: [
            { description: 'Tag Name',
            },
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
