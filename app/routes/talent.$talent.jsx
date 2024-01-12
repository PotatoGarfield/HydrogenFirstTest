import {useLoaderData, useParams, Link} from '@remix-run/react';
import {useContext, useEffect, useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import {MyContext} from '~/components/TalentContext';
import {json} from '@shopify/remix-oxygen';

export default function talentHome() {
  const {talent} = useParams();
  const [products, setProducts] = useState([]);
  const {setTitle} = useContext(MyContext);
  setTitle(talent);
  const loaderData = useLoaderData();

  useEffect(() => {
    setProducts(loaderData.products.edges);
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((e, i) => {
            e = e.node;
            console.log(e)
            return (
              <Link to={`/${talent}/${e.id.split('/')[4]}`} key={e.id}>
                <div
                  className="relative bg-white p-4 rounded-lg shadow-md"
                  key={i}
                >
                  <img
                    src={e.featuredImage.url}
                    alt="featuredImage"
                    className="w-full h-40 object-cover mb-4"
                  />
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="text-gray-600">
                    <Money
                      withoutTrailingZeros
                      data={e.variants.edges[0].node.price}
                      className="text-xl font-semibold mb-2"
                    />
                  </div>
                  <div className="py-2 px-4 text-white">a</div>
                  <button className="absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                    {' '}
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function loader({params, context}) {
  const {talent} = params;
  let PRODUCTS_QUERY = `
  {
    products(query: "tag:${'talent_' + talent}", first: 10) {
      edges {
        node {
          id
          title
          tags
          handle
          variants(first: 1) {
            edges {
              node {
                id,
                price{
                  currencyCode
                  amount
                }
              }
            }
          }
           featuredImage {
             id
            url
           }
          # 添加其他您需要的商品字段
        }
      }
    }
  }  
`;
  const {products} = await context.storefront.query(PRODUCTS_QUERY);

  return json({
    products,
  });
}
