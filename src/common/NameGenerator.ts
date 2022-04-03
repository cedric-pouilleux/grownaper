import {
  uniqueNamesGenerator, adjectives, colors, Config,
} from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: ' ',
  style: 'capital',
  length: 2,
};

function generateName() {
  return uniqueNamesGenerator(customConfig);
}

export default {
  generateName,
};
