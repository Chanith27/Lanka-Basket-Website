import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }
  return (
<<<<<<< HEAD
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
=======
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

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {/***display items */}
                {
                    cartItem[0] ? (
>>>>>>> parent of a32d450 (Merge branch 'feature-system' into feature-main)
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                            </div>
<<<<<<< HEAD

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
=======
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
>>>>>>> parent of a32d450 (Merge branch 'feature-system' into feature-main)
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                            </div>
                            <div className='bg-white p-4'>
                                <h3 className='font-semibold'>Bill details</h3>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Items total</p>
                                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Quntity total</p>
                                    <p className='flex items-center gap-2'>{totalQty} item</p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Delivery Charge</p>
                                    <p className='flex items-center gap-2'>Free</p>
                                </div>
                                <div className='font-semibold flex items-center justify-between gap-4'>
                                    <p >Grand total</p>
                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img
                                src={imageEmpty}
                                className='w-full h-full object-scale-down' 
                            />
                            <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                        </div>
                    )
                }
                
            </div>

            {
                cartItem[0] && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                            <div>
                                {DisplayPriceInRupees(totalPrice)}
                            </div>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed
                                <span><FaCaretRight/></span>
                            </button>
                        </div>
                    </div>
                )
            }
            
        </div>
    </section>
  )
}

export default DisplayCartItem