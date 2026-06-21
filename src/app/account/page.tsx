"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type Tab = "profile" | "orders" | "addresses" | "payment";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [mockAddresses, setMockAddresses] = useState([{
    id: 1,
    name: "Alex Rivera",
    address: "123 Cyber Avenue, Suite 404\nNeo Tokyo, NT 10001\nJapan",
    isDefault: true,
    isMock: false
  }]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({ name: "", address: "" });

  const [mockCards, setMockCards] = useState([{
    id: 1,
    type: "VISA",
    last4: "4242",
    expires: "12/26",
    isMock: false
  }]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ type: "VISA", number: "", expires: "" });

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.name || !newAddressForm.address) return;
    setMockAddresses([...mockAddresses, {
      id: Date.now(),
      name: newAddressForm.name,
      address: newAddressForm.address,
      isDefault: false,
      isMock: true
    }]);
    setNewAddressForm({ name: "", address: "" });
    setIsAddingAddress(false);
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardForm.number || !newCardForm.expires) return;
    const last4 = newCardForm.number.slice(-4).padStart(4, "0");
    setMockCards([...mockCards, {
      id: Date.now(),
      type: newCardForm.type,
      last4,
      expires: newCardForm.expires,
      isMock: true
    }]);
    setNewCardForm({ type: "VISA", number: "", expires: "" });
    setIsAddingCard(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/account");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Prevent flash of content
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase">My Account</h1>
          <div className="px-3 py-1 border border-accent/30 bg-accent/10 text-accent text-xs tracking-widest uppercase font-bold rounded-full">
            Mock Data
          </div>
        </div>
        <p className="text-muted-foreground">Manage your orders, addresses, and cyber-security settings.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center space-x-3 px-4 py-3 font-medium tracking-widest uppercase text-sm transition-colors ${
                activeTab === "profile" 
                  ? "bg-accent/10 text-accent border border-accent" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`flex items-center space-x-3 px-4 py-3 font-medium tracking-widest uppercase text-sm transition-colors ${
                activeTab === "orders" 
                  ? "bg-accent/10 text-accent border border-accent" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Package size={18} />
              <span>Orders</span>
            </button>
            <button 
              onClick={() => setActiveTab("addresses")}
              className={`flex items-center space-x-3 px-4 py-3 font-medium tracking-widest uppercase text-sm transition-colors ${
                activeTab === "addresses" 
                  ? "bg-accent/10 text-accent border border-accent" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <MapPin size={18} />
              <span>Addresses</span>
            </button>
            <button 
              onClick={() => setActiveTab("payment")}
              className={`flex items-center space-x-3 px-4 py-3 font-medium tracking-widest uppercase text-sm transition-colors ${
                activeTab === "payment" 
                  ? "bg-accent/10 text-accent border border-accent" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <CreditCard size={18} />
              <span>Payment</span>
            </button>
            <button 
              onClick={() => {
                logout();
                window.location.href = "/auth";
              }}
              className="flex items-center space-x-3 px-4 py-3 mt-8 text-red-500 hover:bg-red-500/10 transition-colors font-medium tracking-widest uppercase text-sm border border-transparent"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-border p-8"
              >
                <h2 className="text-xl font-bold tracking-widest uppercase mb-8">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                    <p className="text-lg">Alex Rivera</p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                    <p className="text-lg">alex.rivera@example.com</p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Phone</label>
                    <p className="text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="mt-12">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-border p-8"
              >
                <h2 className="text-xl font-bold tracking-widest uppercase mb-8">Order History</h2>
                <div className="space-y-6">
                  <div className="border border-border/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-accent transition-colors">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Order #NV-2024-9081</p>
                      <h3 className="text-lg font-bold">AETHER BLAZER</h3>
                      <p className="text-sm text-muted-foreground mt-1">Delivered on March 12, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div 
                key="addresses"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-border p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold tracking-widest uppercase">Saved Addresses</h2>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent" onClick={() => setIsAddingAddress(!isAddingAddress)}>
                    {isAddingAddress ? "Cancel" : "+ Add New"}
                  </Button>
                </div>

                <AnimatePresence>
                  {isAddingAddress && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 p-6 border border-accent/50 bg-accent/5 overflow-hidden"
                      onSubmit={handleAddAddressSubmit}
                    >
                      <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent">New Address Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Full Name</label>
                          <input type="text" required value={newAddressForm.name} onChange={e => setNewAddressForm({...newAddressForm, name: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-accent outline-none" placeholder="Jane Doe" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Full Address</label>
                          <textarea required value={newAddressForm.address} onChange={e => setNewAddressForm({...newAddressForm, address: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-accent outline-none min-h-[80px]" placeholder="123 Street Name&#10;City, State 12345&#10;Country" />
                        </div>
                        <Button type="submit" size="sm">Save Address</Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="space-y-6">
                  {mockAddresses.map((addr) => (
                    <div key={addr.id} className="border border-border/50 p-6 relative group transition-colors hover:border-accent">
                      {addr.isDefault && <div className="absolute top-4 right-4 px-2 py-1 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase">Default</div>}
                      {addr.isMock && <div className="absolute top-4 right-4 px-2 py-1 bg-purple-500/10 text-purple-500 border border-purple-500/30 text-xs font-bold tracking-widest uppercase">Mock Generated</div>}
                      
                      <h3 className="text-lg font-bold mb-2">{addr.name}</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {addr.address}
                      </p>
                      <div className="mt-6 flex space-x-4">
                        <button className="text-sm text-muted-foreground hover:text-white underline transition-colors">Edit</button>
                        <button 
                          onClick={() => setMockAddresses(mockAddresses.filter(a => a.id !== addr.id))}
                          className="text-sm text-red-500 hover:text-red-400 underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-border p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold tracking-widest uppercase">Payment Methods</h2>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent" onClick={() => setIsAddingCard(!isAddingCard)}>
                    {isAddingCard ? "Cancel" : "+ Add New"}
                  </Button>
                </div>

                <AnimatePresence>
                  {isAddingCard && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 p-6 border border-accent/50 bg-accent/5 overflow-hidden"
                      onSubmit={handleAddCardSubmit}
                    >
                      <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent">New Card Details</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Card Type</label>
                            <select value={newCardForm.type} onChange={e => setNewCardForm({...newCardForm, type: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-accent outline-none">
                              <option value="VISA">Visa</option>
                              <option value="MSTR">Mastercard</option>
                              <option value="AMEX">Amex</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Card Number</label>
                            <input type="text" required value={newCardForm.number} onChange={e => setNewCardForm({...newCardForm, number: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-accent outline-none" placeholder="•••• •••• •••• 1234" maxLength={19} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Expiry Date</label>
                          <input type="text" required value={newCardForm.expires} onChange={e => setNewCardForm({...newCardForm, expires: e.target.value})} className="w-full md:w-1/2 bg-background border border-border p-2 text-sm focus:border-accent outline-none" placeholder="MM/YY" maxLength={5} />
                        </div>
                        <Button type="submit" size="sm">Save Card</Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  {mockCards.map((card) => (
                    <div key={card.id} className="border border-border/50 p-6 flex items-center justify-between transition-colors hover:border-accent relative">
                      {card.isMock && <div className="absolute top-2 right-4 text-[10px] text-purple-500 uppercase tracking-widest font-bold">Mock Generated</div>}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-black font-bold text-xs">{card.type}</div>
                        <div>
                          <p className="font-bold">{card.type === "VISA" ? "Visa" : "Mastercard"} ending in {card.last4}</p>
                          <p className="text-sm text-muted-foreground">Expires {card.expires}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMockCards(mockCards.filter(c => c.id !== card.id))}
                        className="text-sm text-red-500 hover:text-red-400 underline transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
