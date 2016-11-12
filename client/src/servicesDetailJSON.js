var servicesDetailJSON = {
	slack: {
    icon: '',
		trigger: {
      options: [
        {description: ''.
         parameters: [
           {description: '',
            expectedType: 'time, string, url, phoneNumber',
            required: true
           }
         ]}
         returnData: [ //return data is specific to triggers
           {description: 'postURL',
            type: 'url'}
         ]
      ]
    },
		action: {}
	},
	evernote: {
		trigger: {},
		action: {}
	},
}