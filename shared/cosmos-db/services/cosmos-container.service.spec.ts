import { CosmosContainerService } from './cosmos-container.service';
import { CosmosServiceConfiguration } from '../models/cosmos-service-configuration.model';
import { CosmosContainerConfiguration } from '../models/cosmos-container-configuration.model';

describe('CosmosContainerService', () => {
  interface Person {
    name: string;
  }

  class PersonService extends CosmosContainerService<Person> {
    constructor(
      serviceConfiguration: CosmosServiceConfiguration,
      containerConfiguration: CosmosContainerConfiguration,
    ) {
      super(serviceConfiguration, containerConfiguration);
    }
  }

  let service: CosmosContainerService<Person>;

  beforeAll(() => {
    const serviceConfiguration: CosmosServiceConfiguration = {
      endpoint: 'http://test.com',
      key: 'testKey',
    };
    const containerConfiguration: CosmosContainerConfiguration = {
      databaseName: 'database',
      containerName: 'container',
      queryResultLimit: 20,
    };
    service = new PersonService(serviceConfiguration, containerConfiguration);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should get entities', async () => {
    // Arrange.
    const fetchAllSpy = spyOn(service, 'fetchAll').and.returnValue([
      {
        name: 'Chris',
      },
      {
        name: 'Simon',
      },
    ]);

    // Act.
    const persons = await service.get();

    // Assert.
    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    expect(persons).toHaveLength(2);
  });

  it('should throw when an error occurs getting entities', async () => {
    // Arrange.
    const fetchAllSpy = spyOn(service, 'fetchAll').and.throwError(
      'Session not available',
    );

    // Act.
    try {
      await service.get();
    } catch (error) {
      // Assert.
      expect(fetchAllSpy).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('Session not available');
    }
  });
});
