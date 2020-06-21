import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Password, PasswordRelations} from '../models';

export class PasswordRepository extends DefaultCrudRepository<
  Password,
  typeof Password.prototype.id,
  PasswordRelations
  > {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Password, dataSource);
  }
}
