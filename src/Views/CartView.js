import { useContext, Fragment, useState, useEffect } from "react";
import { CartContext } from "../CartContextLogic";
import { PageContext } from "../PageContextLogic";
import Navbar from "../Navbar";
import { Popover, Transition } from "@headlessui/react";

export const CartLogic = () => {
  // extracting necessary data and functions from context
  const {
    cart,
    cardNumber,
    custName,
    expirationDate,
    setName,
    setExpirationDate,
    setStreetAddress,
    setCity,
    setState,
    setZip,
    setCardNumber,
    total,
    subtotal,
    taxes,
  } = useContext(CartContext);

  // get the setPage function from PageContext
  const { setPage } = useContext(PageContext);

  // define state to hold form validation errors
  const [errors, setErrors] = useState({});

  // base case function to validate form fields
  const validateForm = (fieldName, value) => {
    // create a copy of the errors object
    const newErrors = { ...errors };

    // check the value of the field and update the errors object
    switch (fieldName) {
      case "custName":
        if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(value)) {
          newErrors.custName = 'Name should be in the format "First Last".';
        } else {
          delete newErrors.custName;
        }
        break;

      // card number validation
      case "cardNumber":
        if (!/^(\d{4}-){3}\d{4}$/.test(value)) {
          newErrors.cardNumber = "XXXX - XXXX - XXXX - XXXX";
        } else {
          delete newErrors.cardNumber;
        }
        break;

      // expiration date validation
      case "expirationDate":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          newErrors.expirationDate = "MM/YY";
        } else {
          delete newErrors.expirationDate;
        }
        break;

      default:
        break;
    }

    // update the errors object with any errors
    setErrors(newErrors);
  };

  return (
    <>
    <Navbar />
    <div className="bg-white">
      <div
        className="bg-purple-500 lg:block  h-full w-1/2 fixed hidden left-0 top-0"
        aria-hidden="true"
      />
      <div
        className="bg-gray-400 fixed right-0  h-full w-1/2 top-0 hidden lg:block"
        aria-hidden="true"
      />

      {/* header, order information and form */}
      <div className="lg:px-8 relative grid max-w-7xl mx-auto xl:gap-x-48 grid-cols-1 lg:grid-cols-2   gap-x-16">
        <h1 className="sr-only">Order information</h1>

        {/* Order summary header */}
        <section
          aria-labelledby="summary-heading"
          className="lg:row-start-1 lg:pb-16 pt-16 sm:px-6 lg:col-start-2 bg-gray-50 lg:bg-transparent px-4 pb-10lg:px-0">
          {/* Order Summary Section */}
          <div className="mx-auto max-w-lg lg:max-w-none">
            <div className="mb-4 flex justify-between items-end">
              <h2 id="summary-heading" className="text-lg font-black">
                Order summary
              </h2>

              {/* return to ItemsView page button */}
              <button
                onClick={() => setPage("items")}
                type="button"
                className="text-sm font-black px-3.5 rounded-md hover:bg-purple-500 flex py-2.5 gap-x-4 bg-purple-400 text-black shadow-sm">
                ← Return
              </button>
            </div>

            {/* List of items purchased */}
            <ul
              role="list"
              className=" text-sm font-black divide-black divide-y ">
              {/* mapping cart items to create item cards */}
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start space-x-4 py-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" object-center flex-none h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product.name}</h3>
                  </div>
                  <p className="text-base flex-none font-medium">
                    ${product.price}
                  </p>
                </li>
              ))}
            </ul>

            {/* Pricing breakdown */}
            <dl className="pt-6 hidden  border-t  text-sm lg:block space-y-6 font-black border-black  text-gray-900">
              <div className="flex items-center justify-between">
                <dt className="font-black">Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>

              {/* taxes */}
              <div className="flex items-center justify-between">
                <dt className="font-black">Taxes</dt>
                <dd>${taxes.toFixed(2)}</dd>
              </div>

              {/* total */}
              <div className="border-t flex justify-between items-center border-black pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${total.toFixed(2)}</dd>
              </div>
            </dl>

            {/* Mobile view pricing breakdown */}
            <Popover className="text-gray-900 inset-x-0 lg:hidden bottom-0 font-medium text-sm flex flex-col-reverse fixed">
              <div className="sm:px-6 relative z-10 border-black border-t px-4 bg-white">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="py-6 items-center flex w-full font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                  </Popover.Button>
                </div>
              </div>

              {/* popover panel, show/hide based on popover state. */}
              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  {/* popover panel */}
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full">
                    <Popover.Panel className="relative bg-black px-4 py-6 sm:px-6">
                      <dl className="mx-auto max-w-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-black">Subtotal</dt>
                          <dd>$320.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-black">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-black">Taxes</dt>
                          <dd>$26.80</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        {/* payment information form */}
        <form className="lg:pb-16  lg:col-start-1 px-4 sm:px-6 pb-36 lg:row-start-1 lg:px-0 pt-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="payment-heading" className="mt-10">
              <h2 id="payment-heading" className="text-lg font-black">
                Please enter your payment information below.
              </h2>

              {/* credit card image */}
              <div className="grid mt-6 grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-black">
                    Name:
                  </label>

                  {/* name on card */}
                  <div className="mt-1">
                    <input
                      value={custName}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateForm("custName", e.target.value);
                      }}
                      onBlur={() => validateForm()}
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      maxLength="40"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                    />
                  </div>

                  {/* error message */}
                  {errors.custName && (
                    <p className="text-red-500">{errors.custName}</p>
                  )}
                </div>

                {/* credit card image */}
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-black">
                    Credit Card Number:
                  </label>

                  {/* credit card number */}
                  <div className="mt-1">
                    <input
                      value={cardNumber}
                      onChange={(e) => {
                        let cleaned = e.target.value.replace(/[^\d-]/g, "");
                        let formatted = cleaned.replace(
                          /(\d{4})(?=\d)/g,
                          "$1-"
                        );
                        setCardNumber(formatted);
                        validateForm("cardNumber", formatted);
                      }}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      onBlur={() => validateForm()}
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      maxLength="19"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                    />
                  </div>

                  {/* credit card number error message */}
                  {errors.cardNumber && (
                    <p className="text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                {/* expiration date and cvv */}
                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-black">
                    Expiration Date (MM/YY):
                  </label>
                  <div className="mt-1">
                    <input
                      value={expirationDate}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length === 2 && !value.includes("/")) {
                          value += "/";
                        }
                        setExpirationDate(value);
                        validateForm("expirationDate", value);
                      }}
                      onBlur={() => validateForm()}
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      maxLength="5"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                    />
                  </div>

                  {/* expiration date error message */}
                  {errors.expirationDate && (
                    <p className="text-red-500">{errors.expirationDate}</p>
                  )}
                </div>

                {/* cvv */}
                <div>
                  <label htmlFor="cvv" className="block text-sm font-black">
                    CVV (3 digits):
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      autoComplete="csc"
                      maxLength="3"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* shipping address form */}
            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2 id="shipping-heading" className="text-lg font-black">
                Please Enter Your Shipping Address Below.
              </h2>

              <div className="sm:grid-cols-3 grid-cols-1 gap-y-6 gap-x-4 mt-6 grid">
                <div className="sm:col-span-3">
                  <label htmlFor="address" className="block text-sm font-black">
                    Street Address:
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                      onChange={(e) => setStreetAddress(e.target.value)}
                      maxLength="60"
                    />
                  </div>
                </div>

                {/* apartment, suite, unit # */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-black">
                    Apartment, Suite, Unit #:
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                      maxLength="12"
                    />
                  </div>
                </div>

                {/* city */}
                <div>
                  <label htmlFor="city" className="block text-sm font-black">
                    City:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-black shadow-sm sm:text-sm"
                      maxLength="24"
                    />
                  </div>
                </div>

                {/* state */}
                <div>
                  <label htmlFor="region" className="block text-sm font-black">
                    State:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="shadow-sm rounded-md w-full sm:text-sm border-black block"
                      maxLength="2"
                    />
                  </div>
                </div>

                {/* zip code */}
                <div>
                  <label
                    htmlFor="postal-code"
                    className="text-sm block font-black">
                    Zip Code:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setZip(e.target.value)}
                      type="text"
                      id="zip-code"
                      name="zip-code"
                      autoComplete="zip-code"
                      className="rounded-md sm:text-sm shadow-sm w-full border-black block"
                      maxLength="5"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* submit order button */}
            <div className="border-black sm:justify-between mt-10 pt-6 border-t sm:flex sm:items-center">
              <button
                onClick={() => setPage("confirmation")}
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  !cardNumber ||
                  !custName ||
                  !expirationDate
                }
                // submit order button
                className="border px-4 py-2 rounded-md w-full text-black bg-green-600 font-black text-sm shadow-sm hover:bg-green-400 sm:w-auto border-transparent sm:order-last">
                Submit Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
