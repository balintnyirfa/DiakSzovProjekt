module.exports = {
  preset: 'react-native',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    //"^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|@react-navigation|@react-native-async-storage/async-storage)/"
  ]
};