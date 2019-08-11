import { map, prop, path } from 'ramda';
import { checkout } from './typings/Checkout';

interface VtexAuthHeaders {
    'x-vtex-api-apptoken': string;
    'x-vtex-api-appkey': string;
    vtexidclientautcookie: string;
}

export const getAuthenticationHeaders = (headers: VtexAuthHeaders) => {
    if (headers.vtexidclientautcookie) { return { vtexidclientautcookie: headers.vtexidclientautcookie }; }

    return {
        'x-vtex-api-apptoken': headers['x-vtex-api-apptoken'],
        'x-vtex-api-appkey': headers['x-vtex-api-appkey'],
    };
};

export const buildSimulationItemsBody = (order: checkout.Order, seller?: string): checkout.Simulation => {

    return {
        items: map<checkout.Item, checkout.Item>((item: checkout.Item) => ({
            id: prop('id', item),
            quantity: prop('quantity', item),
            seller: seller || prop('seller', item),
        }))(order.items),
        geoCoordinates: path(['shippingData', 'address', 'geoCoordinates'], order),
        postalCode: path(['shippingData', 'address', 'postalCode'], order),
        country: path(['shippingData', 'address', 'country'], order),
    }
}
