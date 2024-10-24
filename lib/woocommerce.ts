// lib/woocommerce.ts
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

if (!apiUrl || !consumerKey || !consumerSecret) {
  throw new Error('WooCommerce API configuration is missing. Please check your environment variables.');
}

const api = new WooCommerceRestApi({
  url: apiUrl,
  consumerKey,
  consumerSecret,
  version: 'wc/v3',
  queryStringAuth:true
});

export default api;
