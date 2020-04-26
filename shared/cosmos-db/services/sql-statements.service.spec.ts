import { SqlStatementsService } from './sql-statements.service';

describe('SqlStatementsService', () => {
  it('should create', () => {
    expect(new SqlStatementsService()).toBeDefined();
  });
});

describe('generateSelectStatement', () => {
  it('should throw for an unsafe container name', () => {
    // Arrange.
    const containerName = 'unsafe-';

    // Act.
    try {
      SqlStatementsService.generateSelectStatement(containerName, 10, 'name');
    } catch (error) {
      // Assert.

      expect(error.message).toBe('Invalid container name: unsafe-');
    }
  });

  it('should generate a SELECT without descending order', () => {
    // Act.
    const selectStatement = SqlStatementsService.generateSelectStatement(
      'persons',
      10,
      'name',
    );

    // Assert.
    expect(selectStatement).toBe(
      'SELECT TOP 10 * FROM persons c ORDER BY c.name',
    );
  });

  it('should generate a SELECT statement with descending order', () => {
    // Act.
    const selectStatement = SqlStatementsService.generateSelectStatement(
      'persons',
      10,
      'name',
      true,
    );

    // Assert.
    expect(selectStatement).toBe(
      'SELECT TOP 10 * FROM persons c ORDER BY c.name DESC',
    );
  });
});

describe('generateOrderByStatement', () => {
  it('should return empty string on an unsafe property name', () => {
    // Arrange.
    const propertyName = 'name$';

    // Act.
    const orderByStatement = SqlStatementsService.generateOrderByStatement(
      propertyName,
    );

    // Assert.
    expect(orderByStatement).toBe('');
  });

  it('should add the DESC statement for valid property names with isOrderDescending set to true', () => {
    // Arrange.
    const propertyName = 'name';

    // Act.
    const orderByStatement = SqlStatementsService.generateOrderByStatement(
      propertyName,
      true,
    );

    // Assert.
    expect(orderByStatement).toBe('ORDER BY c.name DESC');
  });
});

describe('generateTopStatement', () => {
  it('should safely generate the TOP statement', () => {
    // Arrange.
    const top = 5;

    // Act.
    const topStatement = SqlStatementsService.generateTopStatement(top);

    // Assert.
    expect(topStatement).toBe('TOP 5');
  });

  it('should block a negative top parameter', () => {
    // Arrange.
    const top = -5;

    // Act.
    const topStatement = SqlStatementsService.generateTopStatement(top);

    // Assert.
    expect(topStatement).toBe('');
  });

  it('should block an unsafe integer top parameter', () => {
    // Arrange.
    const top = Number.MAX_SAFE_INTEGER + 1;

    // Act.
    const topStatement = SqlStatementsService.generateTopStatement(top);

    // Assert.
    expect(topStatement).toBe('');
  });
});
