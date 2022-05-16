import { Injectable } from '@nestjs/common';
import { AuthDto } from '@root/auth/application/auth.dto';
import { persian } from '@shared/dictionary/persian';
import { ListResponse } from '@shared/result-model/list.result';
import { BaseResponse } from 'src/shared/result-model/base-result-model';
import { TokenRepository } from '../repository/token.repository';

@Injectable()
export class TokenService {
  result = new BaseResponse();

  constructor(private readonly tokenRepository: TokenRepository) {}

  async findAll(): Promise<any> {
    const Tokens = await this.tokenRepository.findAll();
    const result = {
      data: Tokens,
      success: true,
      total: Tokens.length,
    };

    return result;
  }
  async findAllByPagination(
    page: number,
    pageSize: number,
  ): Promise<ListResponse<AuthDto>> {
    const Tokens: AuthDto[] = await this.tokenRepository.findAll();
    const result = this.tokenRepository.paginate(Tokens, page, pageSize);

    return result;
  }
  async findOne(id: string): Promise<BaseResponse<any>> {
    const result: AuthDto = await this.tokenRepository.findById(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
  async create(Token: AuthDto): Promise<BaseResponse<any>> {
    const result: AuthDto = await this.tokenRepository.create(Token);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
  async update(id: string, Token: AuthDto): Promise<BaseResponse<any>> {
    const result: AuthDto = await this.tokenRepository.update(id, Token);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
  async delete(id: string): Promise<BaseResponse<any>> {
    const result = await this.tokenRepository.delete(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.DeletedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }
  async ValidateToken(req: any): Promise<BaseResponse<any>> {
    const isAuth = await this.tokenRepository.canActivate(req);
    if (!isAuth) {
      this.result.init({
        data: null,
        success: true,
        successMassage: undefined,
        errorMassage: undefined,
      });
    } else {
      this.result.init({
        data: null,
        success: false,
        successMassage: undefined,
        errorMassage: undefined,
      });
    }
    return this.result;
  }
}
