import _ from 'lodash';
export default function printMe() {
  console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
  );
    console.log('I get called from print.js!');
    // cosnole.error('I get called from print.js!');
    console.log("22111")
  }