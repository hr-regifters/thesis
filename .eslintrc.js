module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "rules": {
      "no-console": 0
    },
    "ecmaFeatures": {
      "modules": false
    },
    "rules": {                                                       
      "strict": [0, "global"],
      "no-console": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types": 0
    },
    "env": {
      browser: true
    }
};
