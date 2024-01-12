import {useLoaderData, useParams} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen-react';
import {json} from '@shopify/remix-oxygen';

export default function ProductHandle() {
  const {talent, productId} = useParams();
  const [product, setProduct] = useState({});
  const loaderData = useLoaderData();

  useEffect(() => {
    console.log(talent, productId);
    console.log(loaderData);
    setProduct(loaderData.product);
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Product</h1>
        <div className="product-wrapper">
          <section className="w-full gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
            <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid md:grid-flow-row  md:p-0 md:overflow-x-hidden md:grid-cols-2 md:w-full lg:col-span-2">
                <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
                  <Image
                    className={`w-full h-full aspect-square object-cover`}
                    data={product.featuredImage}
                  />
                </div>
              </div>
              <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-2 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
                <div className="grid gap-2">
                  <h1 className="text-4xl font-bold leading-10 whitespace-normal">
                    {product.title}
                  </h1>
                  <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
                    {product.vendor}
                  </span>
                </div>
                <h3>TODO Product Options</h3>
                <div
                  className="prose border-t border-gray-200 pt-6 text-black text-md"
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                ></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export async function loader({params, context}) {
  const {productId} = params;
  console.log(productId);
  let PRODUCT_QUERY = `
  {
    product(id: "gid://shopify/Product/${productId}") {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name
        values
      }
    }
  }
`;
  const {product} = await context.storefront.query(PRODUCT_QUERY);

  return json({
    product,
  });
}
