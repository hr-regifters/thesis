const servicesDetailJSON = {
  slack: {
    icon: '',
    trigger: {
      options: [
        { description: '',
          parameters: [
            { description: '',
              expectedType: 'time, string, url, phoneNumber',
              required: true,
            },
          ],
          returnData: [ // return data is specific to trigger options
            { description: 'postURL',
              type: 'url' },
          ],
        },
      ],
    },
    action: {},
  },
  evernote: {
    trigger: {},
    action: {},
  },
};
