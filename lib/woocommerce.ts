// lib/woocommerce.ts
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_API_URL, // Your store URL
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY, // Your consumer key
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET, // Your consumer secret
  version: 'wc/v3', // WooCommerce version
});

export default api;
