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






