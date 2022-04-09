import React from "react"
import { render, fireEvent } from '@testing-library/react';
import Wireframe from '../components/Wireframe';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { loadModules, setDefaultOptions } from 'esri-loader';

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

it("calls component getData test", () => {
  const { wrapper } = setup();
  const spyFunction = jest.spyOn(wrapper.instance(), "getData");
  wrapper.instance().getData();
  expect(spyFunction).toHaveBeenCalled();
  spyFunction.mockRestore();
});


describe('<Wireframe />', () => {
  beforeAll(() => {
    setDefaultOptions({
      url: 'https://js.arcgis.com/4.16/init.js',
      css: 'https://js.arcgis.com/4.16/esri/css/main.css',
    });
  });

  it('renders Wireframe', (done) => {
    try {
      loadModules(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {

        const map = new Map({
          basemap: "gray-vector",
          portalItem: {
            id: 'c3337bfc8f964688856b36a4651b66cf'
          }
        });

        const mapView = new MapView({
          container: "mapView",
          map: map,
          center: [176.7598, -41.6899],
          zoom: 4,
          highlightOptions: {
            // color: "orange"
          }
        });

        const myWidgetWrapper = mount(<Wireframe view={mapView} />);
        done();
      });
    } catch (err) {
      done(err);
    }
  });
});




