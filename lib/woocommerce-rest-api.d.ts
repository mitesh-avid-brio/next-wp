// types/woocommerce-rest-api.d.ts
declare module '@woocommerce/woocommerce-rest-api' {
    export default class WooCommerceRestApi {
      constructor(config: {
        url: string;
        consumerKey: string;
        consumerSecret: string;
        version?: string;
      });
      get(path: string, params?: any): Promise<any>;
      post(path: string, data: any): Promise<any>;
      put(path: string, data: any): Promise<any>;
      delete(path: string): Promise<any>;
    }
  }
  