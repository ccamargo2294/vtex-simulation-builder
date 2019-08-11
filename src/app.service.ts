import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { checkout } from './typings/Checkout';
import { getAuthenticationHeaders, buildSimulationItemsBody } from './utils';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getItemsBuilder(headers: any, orderId: string, accountName: string, seller?: string): Observable<checkout.OrderSimulation> {
    return this.httpService.get<checkout.Order>(
      this.routes.order(accountName, orderId),
      {
        headers: getAuthenticationHeaders(headers),
      }).pipe(
      map(response => response.data),
      map(data => ({
        simulation: buildSimulationItemsBody(data, seller),
      })),
    );
  }

  private get routes() {
    return {
      order: (accountName: string, orderId: string) => `https://${accountName}.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`,
    };
  }
}
