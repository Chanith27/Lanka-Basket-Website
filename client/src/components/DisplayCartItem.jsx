import React, { useState, useEffect } from 'react';

// Mock utility functions
const DisplayPriceInRupees = (price) => `Rs. ${price?.toLocaleString()}`;
const pricewithDiscount = (price, discount) => price - (price * discount / 100);

// Mock AddToCartButton component
const AddToCartButton = ({ data, quantity, onQuantityChange, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleDecrease = async () => {
    if (quantity > 0) {
      setIsUpdating(true);
      const newQty = quantity - 1;
      
      // Simulate API delay
      setTimeout(() => {
        if (newQty === 0) {
          onRemove?.(data._id);
        } else {
          onQuantityChange?.(data._id, newQty);
        }
        setIsUpdating(false);
      }, 300);
    }
  };
  
  const handleIncrease = async () => {
    setIsUpdating(true);
    const newQty = quantity + 1;
    
    // Simulate API delay
    setTimeout(() => {
      onQuantityChange?.(data._id, newQty);
      setIsUpdating(false);
    }, 300);
  };
  
  return (

    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-[60]'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto shadow-2xl'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>


                {/* Content */}
                <div className='flex-1 overflow-hidden flex flex-col h-[calc(100vh-200px)]'>
                    {cartItem.length > 0 ? (
                        <>
                            {/* Savings Banner */}
                            <div className='mx-6 mt-4 mb-2'>
                                <div className='bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center space-x-2'>
                                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className='text-green-800 font-semibold text-sm'>Total Savings</span>
                                        </div>
                                        <span className='text-green-700 font-bold text-lg'>
                                            {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item)=>{
                                                return(
                                                    <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-4'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>

                                                        </div>
                                                        <div className='scale-90'>
                                                            <AddToCartButton 
                                                                data={item?.productId} 
                                                                quantity={item?.quantity}
                                                                onQuantityChange={handleQuantityChange}
                                                                onRemove={handleRemoveItem}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bill Details */}
                                <div className='mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100'>
                                    <h3 className='font-bold text-gray-900 mb-4 flex items-center'>
                                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Bill Details
                                    </h3>
                                    
                                    <div className='space-y-3'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-700 text-sm'>Items total</span>
                                            <div className='flex items-center space-x-2'>
                                                <span className='text-xs text-gray-400 line-through'>
                                                    {DisplayPriceInRupees(notDiscountTotalPrice)}
                                                </span>
                                                <span className='font-semibold text-gray-900'>
                                                    {DisplayPriceInRupees(totalPrice)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-700 text-sm'>Quantity total</span>
                                            <span className='font-semibold text-gray-900'>{totalQty} items</span>
                                        </div>
                                        
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-700 text-sm'>Delivery charge</span>
                                            <div className='flex items-center space-x-1'>
                                                <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium'>FREE</span>
                                            </div>
                                        </div>
                                        
                                        <hr className='border-gray-200 my-3' />
                                        
                                        <div className='flex justify-between items-center'>
                                            <span className='font-bold text-gray-900'>Grand Total</span>
                                            <span className='font-bold text-lg text-green-600'>
                                                {DisplayPriceInRupees(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Empty Cart */
                        <div className='flex-1 flex flex-col items-center justify-center px-6 py-8'>
                            <div className='w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Your cart is empty</h3>
                            <p className='text-gray-500 text-center mb-6 text-sm'>
                                Looks like you haven't added anything to your cart yet.
                            </p>
                            <button 
                                onClick={handleShopNow}
                                className='bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'
                            >
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>

                {/* Checkout Footer */}
                {cartItem.length > 0 && (
                    <div className='sticky bottom-0 bg-white border-t border-gray-200 p-6'>
                        <button 
                            onClick={redirectToCheckoutPage}
                            disabled={isCheckingOut}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 group transition-all duration-200 shadow-lg hover:shadow-xl
                                ${isCheckingOut 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02]'
                                }`}
                        >
                            {isCheckingOut ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Proceed to Checkout</span>
                                    <span className='text-lg opacity-75'>•</span>
                                    <span className='font-bold'>{DisplayPriceInRupees(totalPrice)}</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayCartItem;