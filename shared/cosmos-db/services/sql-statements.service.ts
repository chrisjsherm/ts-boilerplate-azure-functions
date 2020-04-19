export class SqlStatementsService {
  private static readonly containerNameAlias = 'c';

  static generateSelectStatement(
    containerName: string,
    limit: number,
    orderByProperty: string,
    isOrderDesc = false,
  ): string {
    if (!SqlStatementsService.isSafeContainerName(containerName)) {
      throw Error(`Invalid container name: ${containerName}`);
    }

    const topStatement = SqlStatementsService.generateTopStatement(limit);
    const orderByStatement = SqlStatementsService.generateOrderByStatement(
      orderByProperty,
      isOrderDesc,
    );

    return `SELECT ${topStatement} * FROM ${containerName} ${this.containerNameAlias} ${orderByStatement}`;
  }

  /**
   * Generate the SQL TOP statement
   *
   * @param top Limit on how many entities to fetch
   * @param queryResultLimit Maximum number of results
   * @returns SQL TOP statement
   */
  static generateTopStatement(top: number, queryResultLimit = 20): string {
    // Prevent SQL injection.
    if (Number.isSafeInteger(top) && top < queryResultLimit && top > 0) {
      return `TOP ${top}`;
    }
    return `TOP ${queryResultLimit}`;
  }

  /**
   * Generate the SQL ORDER BY statement.
   *
   * @param propertyName Property name to order by
   * @param isOrderDescending Whether to order entities in descending order
   * @returns SQL ORDER BY statement
   */
  static generateOrderByStatement(
    propertyName: string,
    isOrderDescending = false,
  ): string {
    if (!SqlStatementsService.isSafePropertyName(propertyName)) {
      return '';
    }
    let orderByStatement = `ORDER BY ${this.containerNameAlias}.${propertyName}`;

    if (isOrderDescending) {
      orderByStatement += ' DESC';
    }

    return orderByStatement;
  }

  /**
   * Validate the property name is safe.
   * Safe property names consist only of alphabetic characters.
   *
   * @param propertyName Property name to order by
   * @returns Whether the property name is safe
   */
  static isSafePropertyName(propertyName: string): boolean {
    // We control property names.
    // They should one or more be alphanumeric characters.
    return /^[a-zA-Z0-9]+$/.test(propertyName);
  }

  static isSafeContainerName(containerName: string): boolean {
    // We control container names.
    // They should be one or more alphabetic characters with possible dash
    // characters between.
    return /^([a-zA-Z]+-?[a-zA-Z]+)+$/.test(containerName);
  }
}
