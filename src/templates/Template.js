import getData from '@utils/getData.js';
import GitHub from '@images/github.png'
import Twitter from '@images/twitter.png'
import Instagram from '@images/instagram.png'
const Template = async () => {
  const data = await getData();
  const view = `
  <h1>Your Code<h1>
  `;
  return view;
};

export default Template;