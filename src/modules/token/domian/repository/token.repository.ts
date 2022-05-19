import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDto } from '@root/token/application/dto/token.dto';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { Token } from '../schema/token';

@Injectable()
export class TokenRepository extends BaseRepository<TokenDto> {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: mongoose.Model<TokenDto>,
  ) {
    super(tokenModel);
  }

  async checkTokenExpire(userId: string): Promise<boolean> {
    const authList: TokenDto[] = await this.tokenModel.find().exec();
    const auth: TokenDto = authList.find(
      (a) => a.userId === userId.toString() && a.expire == false,
    );

    if (!auth) return false;

    return true;
  }
}
