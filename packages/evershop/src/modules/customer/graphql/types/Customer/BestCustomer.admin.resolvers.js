import { select, execute } from '@evershop/postgres-query-builder';
import { pool } from '../../../../../lib/postgres/connection.js';
import { buildUrl } from '../../../../../lib/router/buildUrl.js';
import { camelCase } from '../../../../../lib/util/camelCase.js';

export default {
  Query: {
    bestCustomers: async () => {
      const query = select()
        .from('customer')
        .leftJoin('order')
        .on('customer.customer_id', '=', 'order.customer_id')
        .select('customer.customer_id')
        .select('customer.uuid')
        .select('customer.full_name')
        .select('COUNT(order.order_id)', 'orders')
        .select('SUM(order.grand_total)', 'total')
        .where('order.order_id', 'IS NOT NULL', null)
        .groupBy('customer.customer_id')
        .orderBy('total', 'DESC')
        .limit(0, 5);

      const results = await query.execute(pool);
      
      return results.map((customer) => ({
        ...camelCase(customer),
        editUrl: buildUrl('customerEdit', { id: customer.uuid })
      }));
    }
  }
};