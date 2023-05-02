import { getData } from '../../../src/utils/outboundRequests';
import { getAll, saveMany } from '../../../src/utils/database';
import { getMakesWithTypes } from '../../../src/services/vehicleService';
import {
  getAllMakesResponseStub,
  getVehicleTypesResponseStubs,
  emptyDBQueryStub,
  populatedDBQueryStub,
  getMakesWithTypesExpectedOutput
} from '../../helpers/vehicleServiceTestData';

jest.mock('../../../src/utils/outboundRequests');
jest.mock('../../../src/utils/database');

const mockGetData = getData as jest.MockedFunction<typeof getData>;
const mockGetAll = getAll as jest.MockedFunction<typeof getAll>;
const mockSaveMany = saveMany as jest.MockedFunction<typeof saveMany>;

afterEach(() => {
  mockGetData.mockReset();
  mockGetAll.mockReset();
  mockSaveMany.mockReset();
});

describe('getMakesWithTypes()', () => {
  it(`
    GIVEN DB contains makeWithTypes objects, 
    WHEN getMakesWithTypes is called,
    THEN no API calls or DB inserts should be made, and the formatted objects are returned`, async () => {
    // ARRANGE
    mockGetAll.mockImplementationOnce(() =>
      Promise.resolve(populatedDBQueryStub)
    );

    // ACT
    const result = await getMakesWithTypes();

    // ASSERT
    expect(mockGetAll.mock.calls).toEqual([['makesWithTypes']]);
    expect(mockGetData).not.toHaveBeenCalled();
    expect(mockSaveMany).not.toHaveBeenCalled();
    expect(result).toEqual(getMakesWithTypesExpectedOutput);
  });

  it(`
    GIVEN DB is empty, 
    WHEN getMakesWithTypes is called,
    THEN the expected API calls and DB inserts are made, and correct data is returned`, async () => {
    // ARRANGE
    mockGetAll.mockImplementationOnce(() => Promise.resolve(emptyDBQueryStub));
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getAllMakesResponseStub)
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponseStubs[0])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponseStubs[1])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponseStubs[2])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponseStubs[3])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponseStubs[4])
    );

    // ACT
    const result = await getMakesWithTypes();

    // ASSERT
    expect(mockGetAll.mock.calls).toEqual([['makesWithTypes']]);
    expect(mockGetData.mock.calls).toEqual([
      ['/getallmakes?format=XML'],
      ['/GetVehicleTypesForMakeId/11897?format=xml'],
      ['/GetVehicleTypesForMakeId/4877?format=xml'],
      ['/GetVehicleTypesForMakeId/11257?format=xml'],
      ['/GetVehicleTypesForMakeId/12255?format=xml'],
      ['/GetVehicleTypesForMakeId/6387?format=xml']
    ]);
    expect(mockSaveMany.mock.calls).toEqual([
      ['makesWithTypes', getMakesWithTypesExpectedOutput]
    ]);

    expect(result).toEqual(getMakesWithTypesExpectedOutput);
  });
});
