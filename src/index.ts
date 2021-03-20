import * as _ from 'lodash';

function component() {
  const element = document.createElement('div');
  console.log('google MAP', `${process.env.GOOGLE_MAP_API}`)

  // Lodash, currently included via a script, is required for this line to work
element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
