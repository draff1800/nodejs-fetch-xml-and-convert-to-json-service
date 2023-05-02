import { getData } from '../../../src/utils/requestHandling/outboundRequests';
import { deleteAll, getAll, saveMany } from '../../../src/utils/database';
import { getMakesWithTypes } from '../../../src/services/vehicleService';
import {
  getAllMakesResponseStub,
  getVehicleTypesResponseStubs,
  emptyDBQueryStub,
  populatedDBQueryStub,
  fetchAndFormatMakesWithTypesOutput
} from '../../helpers/vehicleServiceTestData';
import { refreshMakesWithTypesDB } from '../../../src/services/vehicleService';

jest.mock('../../../src/utils/requestHandling/outboundRequests');
jest.mock('../../../src/utils/database');

const mockGetData = getData as jest.MockedFunction<typeof getData>;
const mockDeleteAll = deleteAll as jest.MockedFunction<typeof deleteAll>;
const mockGetAll = getAll as jest.MockedFunction<typeof getAll>;
const mockSaveMany = saveMany as jest.MockedFunction<typeof saveMany>;

afterEach(() => {
  mockGetData.mockReset();
  mockDeleteAll.mockReset();
  mockGetAll.mockReset();
  mockSaveMany.mockReset();
});

describe('refreshMakesWithTypesDB()', () => {
  it(`
    GIVEN Vehicle XML APIs are available, 
    WHEN refreshMakesWithTypesDB() is called,
    THEN the expected API calls and DB Delete/Insert operations are made`, async () => {
    // ARRANGE
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
    await refreshMakesWithTypesDB();

    // ASSERT
    expect(mockGetData.mock.calls).toEqual([
      ['/getallmakes?format=XML'],
      ['/GetVehicleTypesForMakeId/11897?format=xml'],
      ['/GetVehicleTypesForMakeId/4877?format=xml'],
      ['/GetVehicleTypesForMakeId/11257?format=xml'],
      ['/GetVehicleTypesForMakeId/12255?format=xml'],
      ['/GetVehicleTypesForMakeId/6387?format=xml']
    ]);
    expect(mockDeleteAll.mock.calls).toEqual([['makesWithTypes']]);
    expect(mockSaveMany.mock.calls).toEqual([
      ['makesWithTypes', fetchAndFormatMakesWithTypesOutput]
    ]);
  });
});

/* NOTE: With regard to testing data transformation, the imported xmlToJSON function is not
mocked and therefore runs like it would in production (The code in utils/dataProcessing.ts has
an impact on whether the following tests pass or not, and so is tested). Ideally, it would
have its own test file and be stubbed here, but I didn't want to go overboard!*/

describe('getMakesWithTypes()', () => {
  it(`
    GIVEN DB is empty, 
    WHEN getMakesWithTypes() is called,
    THEN the expected API calls and DB Inserts are made, and correct data is returned`, async () => {
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
      ['makesWithTypes', fetchAndFormatMakesWithTypesOutput]
    ]);

    expect(result).toEqual(fetchAndFormatMakesWithTypesOutput);
  });

  it(`
    GIVEN DB contains makeWithTypes objects, 
    WHEN getMakesWithTypes() is called,
    THEN no API calls or DB Inserts are made, and the formatted objects are returned`, async () => {
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
    expect(result).toEqual(fetchAndFormatMakesWithTypesOutput);
  });
});
