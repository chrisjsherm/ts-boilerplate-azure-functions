import { CosmosServiceConfiguration } from '../models/cosmos-service-configuration.model';
import { CosmosClient, Container, SqlQuerySpec } from '@azure/cosmos';
import { logger } from '../../core/logger.service';
import { CosmosContainerConfiguration } from '../models/cosmos-container-configuration.model';
import { SqlStatementsService } from './sql-statements.service';

export abstract class CosmosContainerService<T> {
  private client: CosmosClient;
  private container: Container;
  private containerName: string;
  private queryResultLimit: number;

  constructor(
    serviceConfiguration: CosmosServiceConfiguration,
    containerConfiguration: CosmosContainerConfiguration,
  ) {
    this.client = new CosmosClient({
      endpoint: serviceConfiguration.endpoint,
      key: serviceConfiguration.key,
    });

    this.container = this.client
      .database(containerConfiguration.databaseName)
      .container(containerConfiguration.containerName);

    this.containerName = containerConfiguration.containerName;
    this.queryResultLimit = containerConfiguration.queryResultLimit;
  }

  /**
   * Get the latest entities<T> from Cosmos DB.
   *
   * @param isOrderDesc Whether to order results in descending order
   * @param orderByProperty Property to order results by
   * @param limit Number of entities to fetch
   * @returns Latest entities<T>
   */
  async get(
    isOrderDesc = false,
    orderByProperty?: string,
    limit?: number,
  ): Promise<T[]> {
    const querySpecification: SqlQuerySpec = {
      query: SqlStatementsService.generateSelectStatement(
        this.containerName,
        limit || this.queryResultLimit,
        orderByProperty,
        isOrderDesc,
      ),
    };

    let entities: T[] = [];
    try {
      entities = await this.fetchAll(querySpecification);
    } catch (error) {
      logger.error(
        `Error occurred fetching entities: ${JSON.stringify(error, null, 2)}`,
      );
      throw error;
    }

    return entities;
  }

  /**
   * Query the entities<T> container.
   *
   * @param querySpecification Database query
   * @returns entities<T[]> according to the query
   */
  /* istanbul ignore next */
  async fetchAll(querySpecification: SqlQuerySpec): Promise<T[]> {
    const { resources: entities } = await this.container.items
      .query<T>(querySpecification)
      .fetchAll();

    return entities;
  }
}
