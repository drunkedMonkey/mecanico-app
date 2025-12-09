export interface Make {
  Make_ID: number;
  Make_Name: string;
}

export interface Model {
  Model_ID: number;
  Model_Name: string;
}

export class VehicleService {
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  async getMakes(): Promise<Make[]> {
    try {
      const response = await fetch(`${this.baseUrl}/GetAllMakes?format=json`);
      const data = await response.json();
      return data.Results || [];
    } catch (error) {
      console.error('Error fetching makes', error);
      return [];
    }
  }

  async getModelsForMakeId(makeId: number): Promise<Model[]> {
    try {
      const response = await fetch(`${this.baseUrl}/GetModelsForMakeId/${makeId}?format=json`);
      const data = await response.json();
      return data.Results || [];
    } catch (error) {
      console.error('Error fetching models', error);
      return [];
    }
  }
}

export default new VehicleService();
