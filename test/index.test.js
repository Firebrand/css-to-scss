const { assert } = require('chai');
const index = require('../lib/index');


describe('Index', () => {
  it('Open test file and convert to array', () => index._openFile('./test/test.txt').then((result) => {
    assert.deepEqual(result, ['+5',
      '+6',
      '-9',
      '+20',
      '*300',
      '+3',
      '/2',
      '*45',
      '+190',
      '-12',
      '-14',
      '-13']);
  }));

  it('Run main function and calculate all values in test file', () => index.main('./test/test.txt').then((result) => {
    assert.equal(result, 148718.5);
  }));
});
