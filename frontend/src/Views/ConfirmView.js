import { useContext } from "react";
import { CartContext } from "../CartContextLogic";
import { PageContext } from "../PageContextLogic";

export const ConfirmLogic = () => {
  // extracting necessary data and functions from context
  const {
    cardNumber,
    cart,
    city,
    custName,
    streetAddress,
    state,
    subtotal,
    taxes,
    total,
    zip,
    clearCart,
  } = useContext(CartContext);
  const { setPage } = useContext(PageContext);

  // component returns structured HTML for the confirmation page
  return (
    <main className=" bg-purple-500 lg:min-h-full relative">
      {/* Responsive Image */}
      <div className="w-full overflow-hidden m-0">
        <img
          src="https://media1.giphy.com/media/2A6wbh9AZ3tqUNMf5r/giphy.gif?cid=ecf05e479zxuwl8yjodaqmx19ftmayprr1ghotxcwn2uzv59&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="Image from Giphy"
          className="w-full h-auto object-cover m-0"
        />
      </div>

      {/* Order summary and details */}
      <div>
      <div className="px-4 py-8 sm:px-6 lg:max-w-7xl sm:py-12 lg:grid lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24 mx-auto max-w-2xl">
          <p className="mt-2 tracking-tight font-bold text-4xl sm:text-5xl">
            Rock on! This metal merch is headed your way.
          </p>

          {/* List of items purchased */}
          <ul
            role="list"
            className="mt-6 divide-y border-black divide-black border-t  text-sm font-black">
            {cart.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 flex-none rounded-md bg-yellow-500 object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                  <h3 className="font-black">{product.name}</h3>
                </div>
                <p className="font-black flex-none">${product.price}</p>
              </li>
            ))}
          </ul>

          {/* Pricing breakdown */}
          <dl className="space-y-6 border-t border-black pt-6 text-sm font-black">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-black">${subtotal.toFixed(2)}</dd>
            </div>

            <div className="flex justify-between">
              <dt>Taxes</dt>
              <dd className="font-black">${taxes.toFixed(2)}</dd>
            </div>

            <div className="flex items-center justify-between border-t border-black pt-6">
              <dt className="text-base">Total</dt>
              <dd className="text-base">${total.toFixed(2)}</dd>
            </div>
          </dl>

          {/* Shipping and payment information */}
          <dl className="mt-16 grid gap-x-4 grid-cols-2 text-sm">
            <div>
              <dt className="font-black">Shipping Information:</dt>
              <dd className="mt-2">
                <address className="not-italic">
                  <span className="block font-black">{custName}</span>

                  <span className="block font-black">{streetAddress}</span>
                  <span className="block font-black">
                    {city}, {state}. {zip}
                  </span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-black text-right">Payment Information:</dt>
              <dd className="mt-2">
                <dd className="flex justify-right">
                  <div className="flex-auto">
                    <p className="font-black text-right">
                      Card Ending with{" "}
                      {cardNumber.length >= 4
                        ? cardNumber.substring(
                            cardNumber.length - 4,
                            cardNumber.length
                          )
                        : "0000"}
                    </p>
                  </div>
                </dd>
              </dd>
            </div>
          </dl>

          <div className="mt-16 border-black border-t text-center py-6">
            <button
              onClick={() => {
                setPage("items");
                clearCart();
              }}
              className="font-black text-white hover:text-blue-500 text-sm ">
              Need More Metal Merch? Keep Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
