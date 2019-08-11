import { Controller, Get, Param, Query, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { checkout } from './typings/Checkout';

@Controller('/vtex/itemsbuilder')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':orderId')
  getItemsBuilder(
    @Param('orderId') orderId: string,
    @Query('an') accountName: string,
    @Headers() headers: any,
    @Query('seller') seller?: string,
  ): Observable<checkout.OrderSimulation> {
    return this.appService.getItemsBuilder(headers, orderId, accountName, seller);
  }
}
