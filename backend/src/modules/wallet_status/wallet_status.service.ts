import { DataSource, Equal, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { WalletStatus } from './../../typeorm/wallet_status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  WalletStatusDto,
  WalletStatusEnum,
  WalletStatusTransactDto,
} from './wallet_status.dto';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';

@Injectable()
export class WalletStatusService {
  constructor(
    @Inject(EntityProviderEnum.WALLET_STATUS) private repos: Repository<WalletStatus>,
    @Inject(EntityProviderEnum.DATA_SOURCE) private dataSource: DataSource,
  ) {}
  async create({ body }: { body: WalletStatusTransactDto }) {
    let insertId: number;
    const retryCount = 1000;
    console.log('--------------------init wS-------------');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction('SERIALIZABLE');

      for (let retry = 0; retry < retryCount; retry++) {
        try {
          if (body.type === WalletStatusEnum.credit) {
            console.log('-----------credit----------------');
            const result = await queryRunner.query(
              ` INSERT INTO wallet_status (entityId, totalCredit, totalDebit, transactionId)  SELECT entityId , totalCredit+${body.amount}, totalDebit , ${body.transactionId}  FROM wallet_status  w where entityId=${body.entityId} ORDER BY id DESC LIMIT 1  `,
            );

            console.log('------------------------credit--------------------');
            console.log(result);
            insertId = result.insertId;
          } else if (body.type === WalletStatusEnum.debit) {
            console.log('-----------credit----------------');

            const result = await queryRunner.query(
              ` INSERT INTO wallet_status (entityId, totalCredit, totalDebit, transactionId) SELECT entityId , totalCredit , totalDebit + ${body.amount} , ${body.transactionId} FROM wallet_status w  where entityId=${body.entityId} ORDER BY id DESC LIMIT 1 `,
            );
            console.log(result);
            insertId = result.insertId;
          } else {
            console.log('----------------init ws-------------------');
            queryRunner.query('Start TRANSACTION');

            console.log(body.entityId);
            const result = await queryRunner.query(
              ` INSERT INTO wallet_status (entityId, totalCredit, totalDebit)
                  VALUES (${body.entityId}, 0, 0   ) `,
            );

            console.log('-------------------after commit------------------');
            console.log(result);
            insertId = result.insertId;
          }

          console.log(
            '------------------transaction commited-------------------',
          );
          await queryRunner.commitTransaction();
          return await queryRunner.manager.findOne(WalletStatus, {
            where: { id: Equal(insertId) },
          });
        } catch (error) {
          if (error.code === 'ER_LOCK_DEADLOCK') {
            // Retry on deadlock
            console.warn('Deadlock detected. Retrying...');
            continue;
          } else {
            // Re-throw other errors
            await queryRunner.rollbackTransaction();
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          }
        }
      }
    } catch (error) {
      if (error.code === 'ER_LOCK_DEADLOCK') {
        // Retry on deadlock
        console.warn('Deadlock detected. Retrying...');
      } else {
        // Re-throw other errors
        console.log(error);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      }
    } finally {
      queryRunner.release();
    }
  }

  async update({ id, body }: { id: number; body: WalletStatusDto }) {
    return await this.repos.update({ id }, { ...body });
  }
  async get() {
    return this.repos.find();
  }
  async getById(id: number) {
    return this.repos.findOne({ where: { id } });
  }

  async getByEntityId(entityId: number) {
    return await this.repos.findOne({ where: { entityId: entityId } });
  }

  async getOrCreateByEntityId(entityId: number) {
    return await this.repos
      .findOne({
        where: { entityId: Equal(entityId) },
        order: { id: 'DESC' },
      })
      .then(async (value) => {
        if (value) return value;
        else
          return await this.create({
            body: {
              amount: 0,
              transactionId: null,
              type: WalletStatusEnum.init,
              entityId: entityId,
            },
          });
      });
  }
  // async getByPartnerId(receiverId: number){
  //   return this.repos.find({where: {entityId: receiverId}});
  // }
}
