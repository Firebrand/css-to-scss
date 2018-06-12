const { assert } = require('chai');
const index = require('../lib/index');


describe('Index', () => {
  it('Open file', () => index.openFile('./test/test.txt').then((result) => { return assert.equal(result, ['+5', '+6', '-9', '+20', '*300', '+3', '/2', '*45', '+190', '-12', '-14', '-13']); }));
});

