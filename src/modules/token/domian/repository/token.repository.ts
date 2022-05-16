import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDto } from '@root/token/application/dto/token.dto';
import * as bcrypt from 'bcrypt';
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

  async canActivate(request: any): Promise<boolean> {
    const token = request.rawHeaders[9].split('Bearer').pop();
    return await this.checkAuth(token);
  }
  async checkAuth(token: string): Promise<boolean> {
    if (!token) return false;
    return await this.checkTokenExpire(token);
  }
  async checkTokenExpire(token: string): Promise<boolean> {
    const getToken = await bcrypt.hash(token, 10);
    const authList: TokenDto[] = await this.tokenModel.find().exec();
    const auth: TokenDto = authList.find((a) =>
      bcrypt.compare(a.hashToken, getToken),
    );

    if (auth.expire == false) return false;

    return true;
  }
}
