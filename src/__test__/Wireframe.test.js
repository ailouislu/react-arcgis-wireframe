import React from "react"
import { render, fireEvent } from '@testing-library/react';
import Wireframe from '../components/Wireframe';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const props = {
  useEffect: jest.fn(),
  setupWebMap: jest.fn(),
};

const setup = () => {
  const wrapper = shallow(
      <Wireframe {...props} />
  );
  const utils = render(<Wireframe />)
  return {
    props,
    wrapper,
    ...utils,
  };
};





