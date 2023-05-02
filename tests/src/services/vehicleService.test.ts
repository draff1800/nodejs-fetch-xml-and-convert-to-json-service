import { getData } from '../../../src/utils/outboundRequests';
import { deleteAll, saveMany } from '../../../src/utils/database';
import { saveAndGetMakesWithTypes } from '../../../src/services/vehicleService';
import {
  getAllMakesResponse,
  getVehicleTypesResponses,
  saveAndGetMakesWithTypesResult
} from '../../helpers/vehicleServiceTestData';

jest.mock('../../../src/utils/outboundRequests');
jest.mock('../../../src/utils/database');

const mockGetData = getData as jest.MockedFunction<typeof getData>;
const mockDeleteAll = deleteAll as jest.MockedFunction<typeof deleteAll>;
const mockSaveMany = saveMany as jest.MockedFunction<typeof saveMany>;

afterEach(() => {
  mockGetData.mockReset();
});

describe('saveAndGetMakesWithTypes()', () => {
  it('Should call expected functions and return expected JSON', async () => {
    // ARRANGE
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getAllMakesResponse)
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponses[0])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponses[1])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponses[2])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponses[3])
    );
    mockGetData.mockImplementationOnce(() =>
      Promise.resolve(getVehicleTypesResponses[4])
    );

    // ACT
    const result = await saveAndGetMakesWithTypes();

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
      ['makesWithTypes', saveAndGetMakesWithTypesResult]
    ]);

    expect(result).toEqual(saveAndGetMakesWithTypesResult);
  });
});
