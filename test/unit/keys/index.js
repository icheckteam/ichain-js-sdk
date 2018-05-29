import { create } from '../../../src/keys'

describe('Keys', () => {
  describe('create', () => {
    it('converts an empty array to an empty string', () => {
      const actual = create("dadsa")
      const expected = 'dadsa'
      actual.should.eql(expected)
    })
  });
});