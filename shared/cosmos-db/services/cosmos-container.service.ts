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
   * @param limit Number of entities to fetch
   * @param isOrderDesc Whether to order results in descending order
   * @param orderByProperty Property to order results by
   * @returns Latest entities<T>
   */
  async get(
    limit: number = this.queryResultLimit,
    isOrderDesc = false,
    orderByProperty?: string,
  ): Promise<T[]> {
    const querySpecification: SqlQuerySpec = {
      query: SqlStatementsService.generateSelectStatement(
        this.containerName,
        this.getResultLimit(limit),
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

  /**
   * Validate the number of results we limit the query to. If the parameter
   * is not a safe integer or exceeds the service's result limit, return the
   * container's result limit.
   *
   * @param resultLimit Number of results to limit a query to
   * @returns Number of results to a limit a query to
   */
  /* istanbul ignore next */
  private getResultLimit(resultLimit: number): number {
    if (!Number.isSafeInteger(resultLimit)) {
      return this.queryResultLimit;
    }

    if (resultLimit > this.queryResultLimit) {
      return this.queryResultLimit;
    }

    return resultLimit;
  }
}
