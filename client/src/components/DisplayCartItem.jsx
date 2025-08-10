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
    <div className={`flex items-center bg-white border-2 border-green-500 rounded-lg overflow-hidden shadow-sm transition-all duration-200 ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
      <button 
        onClick={handleDecrease}
        disabled={isUpdating}
        className="px-3 py-1 text-green-600 hover:bg-green-50 transition-colors text-lg font-semibold disabled:opacity-50"
      >
        -
      </button>
      <span className="px-3 py-1 bg-green-50 text-green-700 font-semibold min-w-[40px] text-center">
        {isUpdating ? '...' : quantity}
      </span>
      <button 
        onClick={handleIncrease}
        disabled={isUpdating}
        className="px-3 py-1 text-green-600 hover:bg-green-50 transition-colors text-lg font-semibold disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
};

// Initial mock data with quantities
const initialCartItems = [
  {
    _id: '1',
    quantity: 2,
    productId: {
      _id: '1',
      name: 'Fresh Organic Milk - Full Cream',
      unit: '1 Liter',
      price: 450,
      discount: 10,
      image: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&crop=center']
    }
  },
  {
    _id: '2',
    quantity: 1,
    productId: {
      _id: '2',
      name: 'Whole Wheat Bread - Artisan Style',
      unit: '400g',
      price: 280,
      discount: 5,
      image: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&crop=center']
    }
  },
  {
    _id: '3',
    quantity: 1,
    productId: {
      _id: '3',
      name: 'Ceylon Tea Leaves - Premium Grade',
      unit: '200g',
      price: 650,
      discount: 15,
      image: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center']
    }
  }
];

const DisplayCartItem = ({ close }) => {
    // Mock state management
    const [cartItem, setCartItem] = useState(initialCartItems);
    const [user] = useState({ _id: '123', name: 'John Doe' }); // Mock logged-in user
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [notification, setNotification] = useState('');
    
    // Calculate totals
    const notDiscountTotalPrice = cartItem.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    const totalPrice = cartItem.reduce((total, item) => total + (pricewithDiscount(item.productId.price, item.productId.discount) * item.quantity), 0);
    const totalQty = cartItem.reduce((total, item) => total + item.quantity, 0);

    // Show notification
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const redirectToCheckoutPage = async () => {
        if(user?._id){
            setIsCheckingOut(true);
            showNotification("Processing checkout...");
            
            // Simulate checkout process
            setTimeout(() => {
                showNotification("Redirecting to checkout page!");
                setIsCheckingOut(false);
                if(close){
                    close();
                }
            }, 2000);
            return;
        }
        showNotification("Please login to continue");
    };

    const handleClose = () => {
        if(close) {
            close();
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setCartItem(prev => prev.map(item => 
            item.productId._id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        ));
        showNotification(`Cart updated!`);
    };

    const handleRemoveItem = (productId) => {
        const removedItem = cartItem.find(item => item.productId._id === productId);
        setCartItem(prev => prev.filter(item => item.productId._id !== productId));
        showNotification(`${removedItem?.productId.name} removed from cart`);
    };

    const handleShopNow = () => {
        showNotification("Redirecting to shop...");
        setTimeout(() => {
            if(close) {
                close();
            }
        }, 1000);
    };

    // Add some demo functionality
    const addSampleItem = () => {
        const sampleItem = {
            _id: `new-${Date.now()}`,
            quantity: 1,
            productId: {
                _id: `product-${Date.now()}`,
                name: 'Sample Product - Added',
                unit: '1 piece',
                price: 199,
                discount: 5,
                image: ['https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop&crop=center']
            }
        };
        
        setCartItem(prev => [...prev, sampleItem]);
        showNotification("New item added to cart!");
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-end'>
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
                    {notification}
                </div>
            )}
            
            <div className='bg-white w-full max-w-md h-full shadow-2xl transform transition-all duration-300 ease-out'>
                
                {/* Header */}
                <div className='sticky top-0 bg-white border-b border-gray-200 z-10'>
                    <div className='flex items-center justify-between p-6'>
                        <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='text-xl font-bold text-gray-900'>Your Cart</h2>
                                <p className='text-sm text-gray-500'>{totalQty} items</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* Demo: Add Item Button */}
                            {cartItem.length > 0 && (
                                <button 
                                    onClick={addSampleItem}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
                                    title="Add sample item"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            )}
                            <button 
                                onClick={handleClose}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group'
                            >
                                <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
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

                            {/* Cart Items */}
                            <div className='flex-1 overflow-auto px-6 pb-4'>
                                <div className='space-y-4'>
                                    {cartItem.map((item) => (
                                        <div key={item._id + "cartItemDisplay"} className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200'>
                                            <div className='flex items-start space-x-4'>
                                                {/* Product Image */}
                                                <div className='w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100'>
                                                    <img
                                                        src={item?.productId?.image?.[0]}
                                                        alt={item?.productId?.name}
                                                        className='w-full h-full object-scale-down'
                                                        onError={(e) => {
                                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NEwyNiA0NEgyMFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                                        }}
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className='flex-1 min-w-0'>
                                                    <h3 className='font-semibold text-gray-900 text-sm line-clamp-2 leading-tight mb-1'>
                                                        {item?.productId?.name}
                                                    </h3>
                                                    <p className='text-xs text-gray-500 mb-2'>{item?.productId?.unit}</p>
                                                    
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center space-x-2'>
                                                            <span className='font-bold text-green-600 text-sm'>
                                                                {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                                                            </span>
                                                            {item?.productId?.discount > 0 && (
                                                                <span className='text-xs text-gray-400 line-through'>
                                                                    {DisplayPriceInRupees(item?.productId?.price)}
                                                                </span>
                                                            )}
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