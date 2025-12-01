import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { ShoppingBagIcon, XIcon, PlusIcon, MinusIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react';
import { useContent, MerchItem } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';

/**
 * CartItem Interface
 */
interface CartItem {
  id: string;
  merchId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

/**
 * MerchCard Component Props
 */
interface MerchCardProps {
  item: MerchItem;
  onAddToCart: (item: MerchItem, size?: string) => void;
}

/**
 * MerchCard Component
 *
 * Displays a merchandise item with image, name, price, and add to cart functionality.
 */
const MerchCard: React.FC<MerchCardProps> = ({
  item,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined);

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(item.price);

  const handleAddToCart = () => {
    onAddToCart(item, selectedSize);
  };

  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden border border-border"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="font-medium text-primary mb-2">{formattedPrice}</p>
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Size</label>
            <div className="flex flex-wrap gap-2">
              {item.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-sm border rounded-md transition-colors ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <Button onClick={handleAddToCart} fullWidth disabled={!item.inStock} variant={item.inStock ? 'primary' : 'ghost'}>
          {item.inStock ? (
            <>
              <ShoppingBagIcon size={16} className="mr-2" />
              Add to Cart
            </>
          ) : 'Out of Stock'}
        </Button>
      </div>
    </motion.div>
  );
};

/**
 * CartDrawer Component Props
 */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

/**
 * CartDrawer Component
 */
const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Format total price
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cartTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingBagIcon size={20} className="mr-2" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted" aria-label="Close cart">
                <XIcon size={20} />
              </button>
            </div>
            {/* Cart Items */}
            <div className="flex-grow overflow-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCartIcon size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button variant="ghost" onClick={onClose} className="mt-4">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map(item => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 border-b border-border pb-4"
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <button onClick={() => onRemoveItem(item.id)} className="text-muted-foreground hover:text-primary" aria-label={`Remove ${item.name} from cart`}>
                            <XIcon size={16} />
                          </button>
                        </div>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="font-medium">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(item.price)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 rounded-md border border-border disabled:opacity-50" aria-label="Decrease quantity">
                            <MinusIcon size={14} />
                          </button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-md border border-border" aria-label="Increase quantity">
                            <PlusIcon size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            {/* Footer with Total and Checkout */}
            <div className="p-4 border-t border-border">
              {cartItems.length > 0 && (
                <>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{formattedTotal}</span>
                  </div>
                  <Button onClick={onCheckout} fullWidth>
                    Checkout
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * CheckoutConfirmation Component
 */
const CheckoutConfirmation: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-card rounded-lg p-6 max-w-md w-full shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="mb-6">
                Your order has been received. This is a demo, so no actual
                purchase was made. In a real application, you would proceed to
                payment and shipping details.
              </p>
              <Button onClick={onClose} fullWidth>
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * useCart Hook
 */
const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('tmj-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tmj-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: MerchItem, size?: string) => {
    setCartItems(prevItems => {
      // Check if item with same ID and size already exists
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.merchId === item.id && cartItem.size === size);
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, {
          id: `${item.id}-${size || 'default'}-${Date.now()}`,
          merchId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size,
          quantity: 1
        }];
      }
    });
    // Open cart drawer
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prevItems => prevItems.map(item => item.id === id ? {
      ...item,
      quantity
    } : item));
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle checkout
  const checkout = () => {
    setIsCheckoutComplete(true);
    setIsCartOpen(false);
    setCartItems([]);
  };

  return {
    cartItems,
    isCartOpen,
    isCheckoutComplete,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    closeCheckoutConfirmation: () => setIsCheckoutComplete(false)
  };
};

/**
 * MerchSection Component
 */
export const MerchSection: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    isCheckoutComplete,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    closeCheckoutConfirmation
  } = useCart();

  const { merchItems, updateMerchItems } = useContent();

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItems, setEditItems] = useState<MerchItem[]>(merchItems);

  useEffect(() => {
    setEditItems(merchItems);
  }, [merchItems]);

  const handleSave = () => {
    updateMerchItems(editItems);
    setIsEditModalOpen(false);
  };

  const handleItemChange = (index: number, field: keyof MerchItem, value: any) => {
    const newItems = [...editItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditItems(newItems);
  };

  const handleSizesChange = (index: number, value: string) => {
    const sizes = value.split(',').map(s => s.trim());
    handleItemChange(index, 'sizes', sizes);
  };

  const addItem = () => {
    setEditItems([...editItems, {
      id: `m${Date.now()}`,
      name: 'New Item',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Description',
      sizes: ['S', 'M', 'L'],
      inStock: true
    }]);
  };

  const deleteItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index));
  };

  return (
    <>
      <Section id="merch" className="bg-background">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">Official Merch</h2>
              <p className="text-muted-foreground mt-2">
                Support TMJ and rep the movement with official merchandise.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={openCart} variant="outline" className="relative" aria-label={`Open cart with ${cartItems.length} items`}>
                <ShoppingBagIcon size={18} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>

          <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Merch">
            {/* Merchandise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {merchItems.length === 0 ? (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-lg bg-muted/30">
                  <ShoppingBagIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground font-medium">No merchandise items yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Click to add your first item.</p>
                </div>
              ) : (
                merchItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                  >
                    <MerchCard item={item} onAddToCart={addToCart} />
                  </motion.div>
                ))
              )}
            </div>
          </EditOverlay>

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={closeCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={checkout}
          />

          {/* Checkout Confirmation */}
          <CheckoutConfirmation isOpen={isCheckoutComplete} onClose={closeCheckoutConfirmation} />
        </div>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Merchandise"
        onSave={handleSave}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Merch Items</h3>
            <Button size="sm" onClick={addItem}>
              <PlusIcon size={16} className="mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-6">
            {editItems.map((item, index) => (
              <div key={item.id} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                <button
                  onClick={() => deleteItem(index)}
                  className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                >
                  <TrashIcon size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                      className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => handleItemChange(index, 'image', e.target.value)}
                      className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
                    <input
                      type="text"
                      value={item.sizes?.join(', ') || ''}
                      onChange={(e) => handleSizesChange(index, e.target.value)}
                      className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.inStock}
                        onChange={(e) => handleItemChange(index, 'inStock', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">In Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditModal>
    </>
  );
};