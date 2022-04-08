import React from "react"
import { render, fireEvent } from '@testing-library/react';
import Wireframe from '../components/Wireframe';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { cleanup} from '@testing-library/react'
import { getAverageNitrogen, getAveragePhosphorus, getNationalStandard } from "../services/fakeWaterQualityService";

afterEach(cleanup);

test('should return correct data for the water quality', () => {
    const averageNitrogen =  getAverageNitrogen();
    const averagePhosphorus =  getAveragePhosphorus();
    const nationalStandard =  getNationalStandard();
    expect(averageNitrogen).toBe("137.1");
    expect(averagePhosphorus).toBe("33.6");
    expect(nationalStandard).toBe("48.9");
})

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





