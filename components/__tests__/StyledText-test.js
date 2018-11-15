import 'react-native';
import React from 'react';
import { KalamText } from '../StyledText';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<KalamText>Snapshot test!</KalamText>).toJSON();

  expect(tree).toMatchSnapshot();
});
