import { ListResponse } from '@shared/result-model/list.result';
import { Model } from 'mongoose';
import { BaseModel } from '../model/base-model';

export class BaseRepository<T extends BaseModel> {
  constructor(private readonly model: Model<T>) {}

  public async create(doc: object): Promise<any> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  public async update(id: string, doc: object): Promise<any> {
    return await this.model.findByIdAndUpdate(id, doc).exec();
  }

  public async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  public async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  public async delete(id: string): Promise<T> {
    return await this.model.findByIdAndRemove(id).exec();
  }

  public paginate(
    list: T[],
    page: number,
    pageSize: number,
  ): ListResponse<any> {
    const listResult = new ListResponse();
    const paginateList = list.slice((page - 1) * pageSize, page * pageSize);

    listResult.init({
      listData: paginateList,
      totalItem: list.length,
      page: page,
      pageSize: pageSize,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return listResult;
  }
}
