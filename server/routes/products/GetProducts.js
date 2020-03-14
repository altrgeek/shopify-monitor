import { Route, RouteTypes } from '../util';
import Site from '../../models/Site';

class GetProducts extends Route {
  constructor() {
    super(RouteTypes.GET, '/api/getProducts');
  }

  async handle(req, res) {
    const sites = await Site.find();
    if (sites.length === 0) return res.status(404).json({ error: true, message: 'No sites found' });

    const data = {
      error: false,
      message: 'Successfully found all products',
      products: sites
        .map(site => {
          return [
            // @ts-ignore
            ...site.products.map(product => {
              const { name, variants } = product;
              return { siteID: site._id, name, variants };
            }),

            // @ts-ignore
          ].flat(Infinity);
        })
        // @ts-ignore
        .flat(Infinity),
    };

    res.json(data);
  }
}

export default GetProducts;