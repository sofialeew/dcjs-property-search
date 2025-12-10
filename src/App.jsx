// DCJS Property Search System v3.0
// Two-Sided Application: Public Submission + Investigator Dashboard
// With Image Upload Support and Polished UI
// IFB No. DCJS-IFB-2025-02

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, Bookmark, Bell, AlertTriangle, Flag, User, Package, Store, MapPin, 
  DollarSign, FileText, X, Check, ChevronRight, Shield, Database, Eye, Users, 
  Globe, ShoppingBag, ExternalLink, Hash, AlertCircle, RefreshCw, Trash2, 
  HelpCircle, LogOut, Info, CheckCircle, ArrowRight, ArrowLeft, Image, Upload, Camera, Home
} from 'lucide-react';

// ============================================================================
// SHARED DATA STORE
// ============================================================================

const US_STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const CATEGORIES = ['Electronics', 'Jewelry & Watches', 'Musical Instruments', 'Tools & Equipment', 'Sporting Goods', 'Collectibles', 'Firearms', 'Vehicles & Parts', 'Art & Antiques', 'Designer Goods', 'Coins & Currency', 'Other'];

const KNOWN_OFFENDERS = [
  { name: 'john martinez', reason: 'Multiple theft convictions', addedDate: '2024-08-15' },
  { name: 'robert smith', reason: 'Fraud investigation', addedDate: '2024-11-20' },
  { name: 'james wilson', reason: 'Burglary suspect', addedDate: '2024-12-01' }
];

const MARKETPLACE_LISTINGS = [
  { id: 'ebay-1', platform: 'eBay', title: 'Rolex Submariner Black Dial Steel Watch', price: 7999, seller: 'luxury_watch_deals', location: 'New York, NY', listingDate: '2025-01-14', url: '#' },
  { id: 'ebay-2', platform: 'eBay', title: 'MacBook Pro 16 M3 Pro 512GB Space Gray', price: 1650, seller: 'tech_reseller_pro', location: 'Buffalo, NY', listingDate: '2025-01-13', url: '#' },
  { id: 'offerup-1', platform: 'OfferUp', title: 'Diamond Tennis Bracelet 14k White Gold', price: 3500, seller: 'jewelry_deals_nyc', location: 'Albany, NY', listingDate: '2025-01-12', url: '#' },
  { id: 'ebay-3', platform: 'eBay', title: 'Canon EOS R5 Mirrorless Camera Body', price: 2500, seller: 'camera_world_usa', location: 'Los Angeles, CA', listingDate: '2025-01-11', url: '#' },
  { id: 'offerup-2', platform: 'OfferUp', title: 'Gibson Les Paul 1959 Reissue Sunburst', price: 4800, seller: 'guitar_collector', location: 'Chicago, IL', listingDate: '2025-01-10', url: '#' },
  { id: 'ebay-4', platform: 'eBay', title: 'Cartier Love Bracelet 18K Yellow Gold', price: 5999, seller: 'designer_jewelry_outlet', location: 'Miami, FL', listingDate: '2025-01-09', url: '#' },
  { id: 'offerup-3', platform: 'OfferUp', title: 'iPad Pro 12.9 M2 256GB Magic Keyboard', price: 950, seller: 'apple_resales', location: 'Poughkeepsie, NY', listingDate: '2025-01-08', url: '#' },
  { id: 'ebay-5', platform: 'eBay', title: 'Omega Speedmaster Professional Moonwatch', price: 4800, seller: 'vintage_timepieces', location: 'Boston, MA', listingDate: '2025-01-07', url: '#' }
];

const SEED_TRANSACTIONS = [
  { id: '1', pawnShopName: 'Capital Pawn & Jewelry', pawnShopAddress: '123 Main Street', pawnShopCity: 'Albany', pawnShopState: 'New York', pawnShopZip: '12207', pawnShopPhone: '518-555-0100', pawnShopEmail: 'info@capitalpawn.com', pawnShopLicense: 'NY-PSL-2024-0891', sellerName: 'John Martinez', sellerPhone: '518-555-0123', sellerEmail: 'jmartinez@email.com', sellerAddress: '456 Oak Ave, Albany, NY', sellerIdType: 'Driver License', sellerIdNumber: 'NY-DL-123456789', itemName: 'Rolex Submariner Watch', category: 'Jewelry & Watches', description: 'Stainless steel, black dial, serial #7829341', serialNumber: '7829341', estimatedValue: 8500, images: [], submittedAt: '2025-01-15T10:30:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00001' },
  { id: '2', pawnShopName: 'Empire State Gold Exchange', pawnShopAddress: '789 Delaware Ave', pawnShopCity: 'Buffalo', pawnShopState: 'New York', pawnShopZip: '14202', pawnShopPhone: '716-555-0200', pawnShopEmail: 'contact@empiregold.com', pawnShopLicense: 'NY-PSL-2024-0456', sellerName: 'Sarah Thompson', sellerPhone: '716-555-0456', sellerEmail: 'sthompson@email.com', sellerAddress: '321 Maple St, Buffalo, NY', sellerIdType: 'State ID', sellerIdNumber: 'NY-ID-987654321', itemName: 'MacBook Pro 16"', category: 'Electronics', description: 'M3 Pro chip, Space Gray, 512GB SSD', serialNumber: 'C02XL0GTJGH5', estimatedValue: 1800, images: [], submittedAt: '2025-01-14T14:22:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00002' },
  { id: '3', pawnShopName: 'Capital Pawn & Jewelry', pawnShopAddress: '123 Main Street', pawnShopCity: 'Albany', pawnShopState: 'New York', pawnShopZip: '12207', pawnShopPhone: '518-555-0100', pawnShopEmail: 'info@capitalpawn.com', pawnShopLicense: 'NY-PSL-2024-0891', sellerName: 'John Martinez', sellerPhone: '518-555-0123', sellerEmail: 'jmartinez@email.com', sellerAddress: '456 Oak Ave, Albany, NY', sellerIdType: 'Driver License', sellerIdNumber: 'NY-DL-123456789', itemName: 'Diamond Tennis Bracelet', category: 'Jewelry & Watches', description: '14k white gold, 3.5 carat total weight', serialNumber: '', estimatedValue: 4200, images: [], submittedAt: '2025-01-13T09:15:00Z', isFlagged: true, flagReason: 'Matches stolen property report #SP-2025-0034', transactionId: 'TXN-2025-00003' },
  { id: '4', pawnShopName: 'LA Gold & Diamonds', pawnShopAddress: '5500 Wilshire Blvd', pawnShopCity: 'Los Angeles', pawnShopState: 'California', pawnShopZip: '90036', pawnShopPhone: '323-555-0300', pawnShopEmail: 'sales@lagold.com', pawnShopLicense: 'CA-PSL-2024-1234', sellerName: 'Michael Chen', sellerPhone: '323-555-0789', sellerEmail: 'mchen@email.com', sellerAddress: '1200 Sunset Blvd, Los Angeles, CA', sellerIdType: 'Driver License', sellerIdNumber: 'CA-DL-A1234567', itemName: 'Canon EOS R5 Camera', category: 'Electronics', description: 'Mirrorless camera body with 24-105mm lens', serialNumber: '012345678901', estimatedValue: 2900, images: [], submittedAt: '2025-01-12T16:45:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00004' },
  { id: '5', pawnShopName: 'Chicago Precious Metals', pawnShopAddress: '200 N Michigan Ave', pawnShopCity: 'Chicago', pawnShopState: 'Illinois', pawnShopZip: '60601', pawnShopPhone: '312-555-0400', pawnShopEmail: 'info@chicagometals.com', pawnShopLicense: 'IL-PSL-2024-5678', sellerName: 'Emily Rodriguez', sellerPhone: '312-555-0321', sellerEmail: 'erodriguez@email.com', sellerAddress: '456 Lake Shore Dr, Chicago, IL', sellerIdType: 'State ID', sellerIdNumber: 'IL-ID-R123456789', itemName: 'Vintage Gibson Les Paul', category: 'Musical Instruments', description: '1959 reissue, sunburst finish, hard case included', serialNumber: '9-1234', estimatedValue: 5500, images: [], submittedAt: '2025-01-11T11:30:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00005' },
  { id: '6', pawnShopName: 'Miami Beach Pawn', pawnShopAddress: '1500 Collins Ave', pawnShopCity: 'Miami Beach', pawnShopState: 'Florida', pawnShopZip: '33139', pawnShopPhone: '305-555-0500', pawnShopEmail: 'contact@miamibeachpawn.com', pawnShopLicense: 'FL-PSL-2024-9012', sellerName: 'David Williams', sellerPhone: '305-555-0654', sellerEmail: 'dwilliams@email.com', sellerAddress: '789 Ocean Dr, Miami, FL', sellerIdType: 'Driver License', sellerIdNumber: 'FL-DL-W987654321', itemName: 'Cartier Love Bracelet', category: 'Jewelry & Watches', description: '18k yellow gold, size 17, with screwdriver', serialNumber: 'CRT12345', estimatedValue: 6800, images: [], submittedAt: '2025-01-10T13:20:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00006' },
  { id: '7', pawnShopName: 'Hudson Valley Pawn', pawnShopAddress: '50 Market St', pawnShopCity: 'Poughkeepsie', pawnShopState: 'New York', pawnShopZip: '12601', pawnShopPhone: '845-555-0600', pawnShopEmail: 'info@hvpawn.com', pawnShopLicense: 'NY-PSL-2024-0234', sellerName: 'John Martinez', sellerPhone: '518-555-0123', sellerEmail: 'jmartinez@email.com', sellerAddress: '456 Oak Ave, Albany, NY', sellerIdType: 'Driver License', sellerIdNumber: 'NY-DL-123456789', itemName: 'iPad Pro 12.9"', category: 'Electronics', description: 'M2 chip, 256GB, Space Gray with Magic Keyboard', serialNumber: 'DMPC12345678', estimatedValue: 1100, images: [], submittedAt: '2025-01-09T15:10:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00007' },
  { id: '8', pawnShopName: 'Texas Gold & Silver', pawnShopAddress: '3000 Main St', pawnShopCity: 'Houston', pawnShopState: 'Texas', pawnShopZip: '77002', pawnShopPhone: '713-555-0700', pawnShopEmail: 'sales@texasgold.com', pawnShopLicense: 'TX-PSL-2024-3456', sellerName: 'Amanda Foster', sellerPhone: '713-555-0987', sellerEmail: 'afoster@email.com', sellerAddress: '100 Westheimer Rd, Houston, TX', sellerIdType: 'Driver License', sellerIdNumber: 'TX-DL-12345678', itemName: 'Antique Pocket Watch', category: 'Jewelry & Watches', description: 'Waltham, 14k gold case, circa 1890', serialNumber: '', estimatedValue: 950, images: [], submittedAt: '2025-01-08T10:05:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00008' },
  { id: '9', pawnShopName: 'Phoenix Pawn & Loan', pawnShopAddress: '4400 N Central Ave', pawnShopCity: 'Phoenix', pawnShopState: 'Arizona', pawnShopZip: '85012', pawnShopPhone: '602-555-0800', pawnShopEmail: 'info@phoenixpawn.com', pawnShopLicense: 'AZ-PSL-2024-7890', sellerName: 'Robert Kim', sellerPhone: '602-555-0246', sellerEmail: 'rkim@email.com', sellerAddress: '500 E Camelback Rd, Phoenix, AZ', sellerIdType: 'State ID', sellerIdNumber: 'AZ-ID-K12345678', itemName: 'Sony PlayStation 5', category: 'Electronics', description: 'Disc edition, 2 controllers, 5 games included', serialNumber: 'SN12345678901', estimatedValue: 450, images: [], submittedAt: '2025-01-07T12:40:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00009' },
  { id: '10', pawnShopName: 'Seattle Gold Exchange', pawnShopAddress: '1200 Pike St', pawnShopCity: 'Seattle', pawnShopState: 'Washington', pawnShopZip: '98101', pawnShopPhone: '206-555-0900', pawnShopEmail: 'contact@seattlegold.com', pawnShopLicense: 'WA-PSL-2024-2345', sellerName: 'Jennifer Adams', sellerPhone: '206-555-0135', sellerEmail: 'jadams@email.com', sellerAddress: '800 Pine St, Seattle, WA', sellerIdType: 'Driver License', sellerIdNumber: 'WA-DL-ADAMS123J', itemName: 'Tiffany & Co. Necklace', category: 'Jewelry & Watches', description: 'Return to Tiffany heart tag pendant', serialNumber: '', estimatedValue: 350, images: [], submittedAt: '2025-01-06T09:55:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00010' },
  { id: '11', pawnShopName: 'Denver Precious Metals', pawnShopAddress: '1600 California St', pawnShopCity: 'Denver', pawnShopState: 'Colorado', pawnShopZip: '80202', pawnShopPhone: '303-555-1000', pawnShopEmail: 'info@denverprecious.com', pawnShopLicense: 'CO-PSL-2024-6789', sellerName: 'Robert Smith', sellerPhone: '303-555-0111', sellerEmail: 'rsmith@email.com', sellerAddress: '200 16th St Mall, Denver, CO', sellerIdType: 'Driver License', sellerIdNumber: 'CO-DL-12-345-6789', itemName: 'Dewalt Power Tool Set', category: 'Tools & Equipment', description: '20V MAX 10-tool combo kit', serialNumber: 'DW20V2024SET', estimatedValue: 650, images: [], submittedAt: '2025-01-05T14:30:00Z', isFlagged: true, flagReason: 'Known offender - Fraud investigation', transactionId: 'TXN-2025-00011' },
  { id: '12', pawnShopName: 'Atlanta Gold & Pawn', pawnShopAddress: '3500 Peachtree Rd', pawnShopCity: 'Atlanta', pawnShopState: 'Georgia', pawnShopZip: '30326', pawnShopPhone: '404-555-1100', pawnShopEmail: 'sales@atlantagold.com', pawnShopLicense: 'GA-PSL-2024-0123', sellerName: 'Lisa Chang', sellerPhone: '404-555-0222', sellerEmail: 'lchang@email.com', sellerAddress: '100 Piedmont Ave, Atlanta, GA', sellerIdType: 'Passport', sellerIdNumber: '567890123', itemName: 'Louis Vuitton Neverfull MM', category: 'Designer Goods', description: 'Monogram canvas, damier ebene interior', serialNumber: 'SD2184', estimatedValue: 1200, images: [], submittedAt: '2025-01-04T11:15:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00012' },
  { id: '13', pawnShopName: 'Boston Gold Company', pawnShopAddress: '100 Federal St', pawnShopCity: 'Boston', pawnShopState: 'Massachusetts', pawnShopZip: '02110', pawnShopPhone: '617-555-1200', pawnShopEmail: 'info@bostongold.com', pawnShopLicense: 'MA-PSL-2024-4567', sellerName: 'Thomas Brown', sellerPhone: '617-555-0333', sellerEmail: 'tbrown@email.com', sellerAddress: '50 Beacon St, Boston, MA', sellerIdType: 'Driver License', sellerIdNumber: 'MA-DL-S12345678', itemName: 'Omega Speedmaster Professional', category: 'Jewelry & Watches', description: 'Moonwatch, hesalite crystal', serialNumber: '310.30.42.50.01.001', estimatedValue: 5200, images: [], submittedAt: '2025-01-03T16:45:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00013' },
  { id: '14', pawnShopName: 'Vegas Gold & Jewelry', pawnShopAddress: '3700 Las Vegas Blvd', pawnShopCity: 'Las Vegas', pawnShopState: 'Nevada', pawnShopZip: '89109', pawnShopPhone: '702-555-1300', pawnShopEmail: 'contact@vegasgold.com', pawnShopLicense: 'NV-PSL-2024-8901', sellerName: 'John Martinez', sellerPhone: '702-555-0444', sellerEmail: 'jmartinez2@email.com', sellerAddress: '1000 Paradise Rd, Las Vegas, NV', sellerIdType: 'Driver License', sellerIdNumber: 'NV-DL-1234567890', itemName: 'Gold Coin Collection', category: 'Coins & Currency', description: '5 American Gold Eagles, 1oz each', serialNumber: '', estimatedValue: 9500, images: [], submittedAt: '2025-01-02T09:30:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00014' },
  { id: '15', pawnShopName: 'Portland Pawn Shop', pawnShopAddress: '500 SW Morrison St', pawnShopCity: 'Portland', pawnShopState: 'Oregon', pawnShopZip: '97204', pawnShopPhone: '503-555-1400', pawnShopEmail: 'info@portlandpawn.com', pawnShopLicense: 'OR-PSL-2024-2345', sellerName: 'Maria Garcia', sellerPhone: '503-555-0555', sellerEmail: 'mgarcia@email.com', sellerAddress: '200 NW 23rd Ave, Portland, OR', sellerIdType: 'State ID', sellerIdNumber: 'OR-ID-G98765432', itemName: 'Fender Stratocaster', category: 'Musical Instruments', description: 'American Professional II, Olympic White', serialNumber: 'US22045678', estimatedValue: 1400, images: [], submittedAt: '2025-01-01T13:20:00Z', isFlagged: false, flagReason: '', transactionId: 'TXN-2025-00015' }
];

// Global state (simulates backend database)
let globalTransactions = [...SEED_TRANSACTIONS];
let transactionCounter = SEED_TRANSACTIONS.length;
let globalListeners = [];

const subscribeToTransactions = (callback) => {
  globalListeners.push(callback);
  return () => { globalListeners = globalListeners.filter(l => l !== callback); };
};

const notifyListeners = () => globalListeners.forEach(cb => cb([...globalTransactions]));
const getTransactions = () => [...globalTransactions];
const isKnownOffender = (name) => KNOWN_OFFENDERS.some(o => o.name === name.toLowerCase());
const getOffenderInfo = (name) => KNOWN_OFFENDERS.find(o => o.name === name.toLowerCase());
const getRepeatSellers = (txns) => {
  const counts = {};
  txns.forEach(t => { counts[t.sellerName.toLowerCase()] = (counts[t.sellerName.toLowerCase()] || 0) + 1; });
  return Object.keys(counts).filter(n => counts[n] > 1);
};

// UPDATED: Preserve images from form data
const addTransaction = (data) => {
  transactionCounter++;
  const txnId = 'TXN-2025-' + String(transactionCounter).padStart(5, '0');
  const isOffender = isKnownOffender(data.sellerName);
  const offenderInfo = getOffenderInfo(data.sellerName);
  const newTxn = {
    id: Date.now().toString(),
    ...data,
    estimatedValue: parseFloat(data.estimatedValue) || 0,
    submittedAt: new Date().toISOString(),
    isFlagged: isOffender,
    flagReason: isOffender ? `Known offender - ${offenderInfo?.reason}` : '',
    transactionId: txnId,
    images: data.images || []  // FIXED: Preserve images from form data
  };
  globalTransactions = [newTxn, ...globalTransactions];
  notifyListeners();
  return { success: true, transactionId: txnId, isKnownOffender: isOffender, transaction: newTxn };
};

const toggleTransactionFlag = (id, reason = '') => {
  globalTransactions = globalTransactions.map(t => 
    t.id === id ? { ...t, isFlagged: !t.isFlagged, flagReason: !t.isFlagged ? reason : '' } : t
  );
  notifyListeners();
};

const DEMO_USER = { name: 'Det. Sarah Mitchell', badge: 'NYPD-4521' };

// ============================================================================
// PUBLIC SUBMISSION PAGE - POLISHED UI WITH IMAGE UPLOAD
// ============================================================================

function PublicSubmissionPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    pawnShopName: '', pawnShopAddress: '', pawnShopCity: '', pawnShopState: '', pawnShopZip: '',
    pawnShopPhone: '', pawnShopEmail: '', pawnShopLicense: '', sellerName: '', sellerPhone: '',
    sellerEmail: '', sellerAddress: '', sellerIdType: '', sellerIdNumber: '', itemName: '',
    category: '', description: '', serialNumber: '', estimatedValue: '', images: []
  });
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const e = {};
    if (!formData.pawnShopName.trim()) e.pawnShopName = 'Business name is required';
    if (!formData.pawnShopAddress.trim()) e.pawnShopAddress = 'Street address is required';
    if (!formData.pawnShopCity.trim()) e.pawnShopCity = 'City is required';
    if (!formData.pawnShopState) e.pawnShopState = 'Please select a state';
    if (!formData.pawnShopZip.trim()) e.pawnShopZip = 'ZIP code is required';
    if (!formData.pawnShopLicense.trim()) e.pawnShopLicense = 'License number is required';
    if (!formData.sellerName.trim()) e.sellerName = 'Seller name is required';
    if (!formData.sellerPhone.trim()) e.sellerPhone = 'Phone number is required';
    if (!formData.sellerAddress.trim()) e.sellerAddress = 'Address is required';
    if (!formData.sellerIdType) e.sellerIdType = 'Please select ID type';
    if (!formData.sellerIdNumber.trim()) e.sellerIdNumber = 'ID number is required';
    if (!formData.itemName.trim()) e.itemName = 'Item name is required';
    if (!formData.category) e.category = 'Please select a category';
    if (!formData.description.trim()) e.description = 'Description is required';
    if (!formData.estimatedValue || parseFloat(formData.estimatedValue) <= 0) e.estimatedValue = 'Please enter a valid amount';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Image handling functions
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => f.type.startsWith('image/')).slice(0, 5 - formData.images.length);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target.result].slice(0, 5)
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const result = addTransaction(formData);
      setSubmissionResult(result);
      setIsSubmitting(false);
      if (result.success) {
        setFormData({
          pawnShopName: '', pawnShopAddress: '', pawnShopCity: '', pawnShopState: '', pawnShopZip: '',
          pawnShopPhone: '', pawnShopEmail: '', pawnShopLicense: '', sellerName: '', sellerPhone: '',
          sellerEmail: '', sellerAddress: '', sellerIdType: '', sellerIdNumber: '', itemName: '',
          category: '', description: '', serialNumber: '', estimatedValue: '', images: []
        });
        setErrors({});
      }
    }, 800);
  };

  // Polished Input component
  const Input = ({ label, name, type = 'text', placeholder, required, help }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[name]}
        onChange={e => setFormData(p => ({ ...p, [name]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-0 ${
          errors[name] 
            ? 'border-red-300 bg-red-50 focus:border-red-400' 
            : 'border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300'
        }`}
      />
      {help && <p className="text-xs text-slate-500 pl-1">{help}</p>}
      {errors[name] && <p className="text-xs text-red-600 pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[name]}</p>}
    </div>
  );

  // Polished Select component
  const Select = ({ label, name, options, placeholder, required }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={formData[name]}
        onChange={e => setFormData(p => ({ ...p, [name]: e.target.value }))}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-0 appearance-none bg-white ${
          errors[name] 
            ? 'border-red-300 bg-red-50 focus:border-red-400' 
            : 'border-slate-200 focus:border-blue-500 hover:border-slate-300'
        }`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && <p className="text-xs text-red-600 pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[name]}</p>}
    </div>
  );

  // Success Screen
  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight">DCJS Pawn Transaction Portal</h1>
                  <p className="text-sm text-slate-500 tracking-wide">New York State Division of Criminal Justice Services</p>
                </div>
              </div>
              <button onClick={() => onNavigate?.('landing')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /><span>Back to Home</span>
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 sm:p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-400/30">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Submission Successful</h2>
            <p className="text-slate-600 mb-8">Your transaction has been recorded and is now available for law enforcement review.</p>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mb-8 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Reference Number</p>
              <p className="text-3xl font-mono font-bold text-blue-600 tracking-wider">{submissionResult.transactionId}</p>
              <p className="text-xs text-slate-500 mt-3">Please save this number for your records</p>
            </div>
            {submissionResult.isKnownOffender && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-8 text-left flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">Automatic Review Flag</p>
                  <p className="text-sm text-amber-700 mt-1">This transaction has been automatically flagged based on seller information and will receive priority review.</p>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setSubmissionResult(null)} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200">
                Submit Another Transaction
              </button>
              <button onClick={() => onNavigate?.('dashboard')} className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all duration-200">
                Go to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">DCJS Pawn Transaction Portal</h1>
                <p className="text-sm text-slate-500 tracking-wide">New York State Division of Criminal Justice Services</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate?.('landing')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /><span>Back to Home</span>
              </button>
              <button onClick={() => onNavigate?.('dashboard')} className="hidden sm:flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Investigator Login <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Introduction Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 mb-10 text-white shadow-xl shadow-blue-600/20">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Pawn Transaction Report</h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Submit pawn and secondhand transactions as required by New York State law. All information is encrypted and transmitted securely to the DCJS database.
              </p>
              <div className="flex items-center gap-4 mt-4 text-xs text-blue-200">
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Secure submission</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Instant confirmation</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Reference number provided</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Pawn Shop Information */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 sm:px-8 py-5 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Store className="w-5 h-5 text-blue-600" />
                    Pawn Shop Information
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Your business details and license information</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Business Name" name="pawnShopName" placeholder="e.g., Capital Pawn & Jewelry" required />
                <Input label="Pawn Broker License Number" name="pawnShopLicense" placeholder="e.g., NY-PSL-2024-0001" required help="Your state-issued pawn broker license number" />
                <Input label="Street Address" name="pawnShopAddress" placeholder="e.g., 123 Main Street" required />
                <Input label="City" name="pawnShopCity" placeholder="e.g., Albany" required />
                <Select label="State" name="pawnShopState" options={US_STATES} placeholder="Select state..." required />
                <Input label="ZIP Code" name="pawnShopZip" placeholder="e.g., 12207" required />
                <Input label="Business Phone" name="pawnShopPhone" type="tel" placeholder="e.g., (518) 555-0100" help="Optional but recommended" />
                <Input label="Business Email" name="pawnShopEmail" type="email" placeholder="e.g., info@yourshop.com" help="Optional but recommended" />
              </div>
            </div>
          </div>

          {/* Step 2: Seller Information */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 sm:px-8 py-5 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Seller Information
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Information about the person selling or pawning the item</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Seller's Full Legal Name" name="sellerName" placeholder="e.g., John Michael Martinez" required help="Exactly as shown on government-issued ID" />
                <Input label="Seller's Phone Number" name="sellerPhone" type="tel" placeholder="e.g., (518) 555-0123" required />
                <div className="md:col-span-2">
                  <Input label="Seller's Home Address" name="sellerAddress" placeholder="e.g., 456 Oak Avenue, Albany, NY 12207" required help="Full street address including city, state, and ZIP code" />
                </div>
                <Input label="Seller's Email Address" name="sellerEmail" type="email" placeholder="e.g., seller@email.com" help="Optional" />
                <div></div>
                <Select label="Government ID Type" name="sellerIdType" options={['Driver License', 'State ID', 'Passport', 'Military ID']} placeholder="Select ID type..." required />
                <Input label="Government ID Number" name="sellerIdNumber" placeholder="e.g., NY-DL-123456789" required help="The ID number from the government-issued identification" />
              </div>
            </div>
          </div>

          {/* Step 3: Item Information */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 sm:px-8 py-5 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Item Information
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Details about the item being pawned or sold</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Item Name" name="itemName" placeholder="e.g., Rolex Submariner Watch" required />
                <Select label="Item Category" name="category" options={CATEGORIES} placeholder="Select category..." required />
                <Input label="Serial Number" name="serialNumber" placeholder="e.g., 7829341" help="Enter any serial number, model number, or unique identifier (if applicable)" />
                <Input label="Transaction Value" name="estimatedValue" type="number" placeholder="e.g., 1500.00" required help="Amount paid to seller in USD" />
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  rows={4}
                  placeholder="Provide a detailed description including brand, model, color, condition, distinguishing marks, engravings, damage, etc."
                  className={`w-full px-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-0 resize-none ${
                    errors.description 
                      ? 'border-red-300 bg-red-50 focus:border-red-400' 
                      : 'border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300'
                  }`}
                />
                {errors.description && <p className="text-xs text-red-600 pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
              </div>

              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Item Photos <span className="text-slate-400 font-normal">(Optional - up to 5 images)</span>
                </label>
                
                {/* Dropzone */}
                <div 
                  onClick={() => formData.images.length < 5 && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    formData.images.length >= 5 
                      ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
                      : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/heic,image/heif"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={formData.images.length >= 5}
                  />
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {formData.images.length >= 5 ? 'Maximum images reached' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    JPG, PNG, or HEIC • Max 5 photos
                  </p>
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt={`Item photo ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-slate-600">
                  By submitting, you certify that all information provided is accurate to the best of your knowledge.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Fields marked with <span className="text-red-500">*</span> are required
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" />Processing...</>
                ) : (
                  <><Check className="w-5 h-5" />Submit Transaction</>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">DCJS Second-hand Property Reporting System</p>
          <p className="text-xs text-slate-400 mt-1">New York State Division of Criminal Justice Services • IFB No. DCJS-IFB-2025-02</p>
          <p className="text-xs text-slate-400 mt-3">Questions? Contact the DCJS helpdesk at <span className="text-blue-600">support@dcjs.ny.gov</span></p>
        </footer>
      </main>
    </div>
  );
}

// ============================================================================
// INVESTIGATOR DASHBOARD - WITH IMAGE DISPLAY
// ============================================================================

function InvestigatorDashboard({ onNavigate }) {
  const [currentPage, setCurrentPage] = useState('search');
  const [transactions, setTransactions] = useState(getTransactions());
  const [savedSearches, setSavedSearches] = useState([]);
  const [itemsOfInterest, setItemsOfInterest] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [marketplaceResults, setMarketplaceResults] = useState([]);
  const [isSearchingMarketplace, setIsSearchingMarketplace] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ sellerName: '', itemName: '', category: '', pawnShopName: '', state: '', serialNumber: '', minValue: '', maxValue: '', showFlaggedOnly: false, showRepeatSellersOnly: false, showKnownOffendersOnly: false });
  const [marketplaceSearch, setMarketplaceSearch] = useState({ query: '', platform: 'all', minPrice: '', maxPrice: '' });

  useEffect(() => {
    const unsub = subscribeToTransactions((updated) => {
      setTransactions(updated);
      const latest = updated[0];
      if (latest && !transactions.find(t => t.id === latest.id)) {
        const newAlerts = [];
        savedSearches.forEach(s => {
          if ((s.filters.sellerName && latest.sellerName.toLowerCase().includes(s.filters.sellerName.toLowerCase())) ||
              (s.filters.itemName && latest.itemName.toLowerCase().includes(s.filters.itemName.toLowerCase()))) {
            newAlerts.push({ id: Date.now() + Math.random(), type: 'saved_search', searchName: s.name, transactionId: latest.id, transactionItemName: latest.itemName, sellerName: latest.sellerName, createdAt: new Date().toISOString() });
          }
        });
        itemsOfInterest.forEach(i => {
          if ((i.criteria.sellerName && latest.sellerName.toLowerCase().includes(i.criteria.sellerName.toLowerCase())) ||
              (i.criteria.itemName && latest.itemName.toLowerCase().includes(i.criteria.itemName.toLowerCase()))) {
            newAlerts.push({ id: Date.now() + Math.random(), type: 'item_of_interest', itemName: i.name, transactionId: latest.id, transactionItemName: latest.itemName, sellerName: latest.sellerName, createdAt: new Date().toISOString() });
          }
        });
        if (isKnownOffender(latest.sellerName)) {
          newAlerts.push({ id: Date.now() + Math.random(), type: 'known_offender', transactionId: latest.id, transactionItemName: latest.itemName, sellerName: latest.sellerName, offenderReason: getOffenderInfo(latest.sellerName)?.reason, createdAt: new Date().toISOString() });
        }
        if (newAlerts.length > 0) {
          setAlerts(prev => [...newAlerts, ...prev]);
          setNotification({ type: 'alert', message: `${newAlerts.length} new alert(s)!` });
          setTimeout(() => setNotification(null), 5000);
        }
      }
    });
    return unsub;
  }, [savedSearches, itemsOfInterest, transactions]);

  const repeatSellers = getRepeatSellers(transactions);
  const filteredTransactions = transactions.filter(t => {
    if (searchFilters.sellerName && !t.sellerName.toLowerCase().includes(searchFilters.sellerName.toLowerCase())) return false;
    if (searchFilters.itemName && !t.itemName.toLowerCase().includes(searchFilters.itemName.toLowerCase())) return false;
    if (searchFilters.category && t.category !== searchFilters.category) return false;
    if (searchFilters.pawnShopName && !t.pawnShopName.toLowerCase().includes(searchFilters.pawnShopName.toLowerCase())) return false;
    if (searchFilters.state && t.pawnShopState !== searchFilters.state) return false;
    if (searchFilters.serialNumber && !t.serialNumber?.toLowerCase().includes(searchFilters.serialNumber.toLowerCase())) return false;
    if (searchFilters.showFlaggedOnly && !t.isFlagged) return false;
    if (searchFilters.showRepeatSellersOnly && !repeatSellers.includes(t.sellerName.toLowerCase())) return false;
    if (searchFilters.showKnownOffendersOnly && !isKnownOffender(t.sellerName)) return false;
    if (searchFilters.minValue && t.estimatedValue < parseFloat(searchFilters.minValue)) return false;
    if (searchFilters.maxValue && t.estimatedValue > parseFloat(searchFilters.maxValue)) return false;
    return true;
  });

  const saveSearch = () => {
    const active = Object.entries(searchFilters).filter(([k, v]) => v && !k.startsWith('show'));
    if (active.length === 0) { setNotification({ type: 'error', message: 'Enter at least one filter to save.' }); setTimeout(() => setNotification(null), 3000); return; }
    const name = active.map(([k, v]) => `${k}: ${v}`).join(' | ');
    setSavedSearches(prev => [{ id: Date.now().toString(), name, filters: { ...searchFilters }, createdAt: new Date().toISOString(), resultCount: filteredTransactions.length }, ...prev]);
    setNotification({ type: 'success', message: 'Search saved! Alerts enabled for matches.' }); setTimeout(() => setNotification(null), 3000);
  };

  const addToWatchlist = () => {
    const active = Object.entries(searchFilters).filter(([k, v]) => v && !k.startsWith('show'));
    if (active.length === 0) { setNotification({ type: 'error', message: 'Enter criteria first.' }); setTimeout(() => setNotification(null), 3000); return; }
    const name = active.map(([k, v]) => `${k}: ${v}`).join(' | ');
    setItemsOfInterest(prev => [{ id: Date.now().toString(), name, criteria: { ...searchFilters }, createdAt: new Date().toISOString() }, ...prev]);
    setNotification({ type: 'success', message: 'Added to watchlist!' }); setTimeout(() => setNotification(null), 3000);
  };

  const handleFlag = (id) => { toggleTransactionFlag(id, 'Flagged by investigator'); setTransactions(getTransactions()); };
  const clearFilters = () => setSearchFilters({ sellerName: '', itemName: '', category: '', pawnShopName: '', state: '', serialNumber: '', minValue: '', maxValue: '', showFlaggedOnly: false, showRepeatSellersOnly: false, showKnownOffendersOnly: false });

  const searchMarketplace = () => {
    setIsSearchingMarketplace(true);
    setTimeout(() => {
      let r = [...MARKETPLACE_LISTINGS];
      if (marketplaceSearch.query) r = r.filter(l => l.title.toLowerCase().includes(marketplaceSearch.query.toLowerCase()));
      if (marketplaceSearch.platform !== 'all') r = r.filter(l => l.platform === marketplaceSearch.platform);
      if (marketplaceSearch.minPrice) r = r.filter(l => l.price >= parseFloat(marketplaceSearch.minPrice));
      if (marketplaceSearch.maxPrice) r = r.filter(l => l.price <= parseFloat(marketplaceSearch.maxPrice));
      setMarketplaceResults(r);
      setIsSearchingMarketplace(false);
    }, 1200);
  };

  const stats = { total: transactions.length, flagged: transactions.filter(t => t.isFlagged).length, repeat: repeatSellers.length, offenders: transactions.filter(t => isKnownOffender(t.sellerName)).length, states: [...new Set(transactions.map(t => t.pawnShopState))].length };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"><Shield className="w-7 h-7 text-slate-900" /></div>
            <div><h1 className="text-lg font-bold text-white">DCJS Investigator Dashboard</h1><p className="text-xs text-slate-400">Law Enforcement Property Search</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700"><User className="w-4 h-4 text-amber-400" /><span className="text-xs text-white">{DEMO_USER.name}</span><span className="text-xs text-slate-500">{DEMO_USER.badge}</span></div>
            <button onClick={() => setCurrentPage('alerts')} className="relative p-2 hover:bg-slate-700 rounded-lg">
              <Bell className={alerts.length > 0 ? 'w-5 h-5 text-amber-400' : 'w-5 h-5 text-slate-400'} />
              {alerts.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold animate-pulse">{alerts.length}</span>}
            </button>
            <button onClick={() => onNavigate?.('landing')} className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-amber-400 transition-colors text-sm" title="Back to Home">
              <Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span>
            </button>
            <button onClick={() => onNavigate?.('submit')} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400" title="Public Portal"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <div className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-slate-400"><Database className="w-3.5 h-3.5" />{stats.total} Records</span>
          <span className="flex items-center gap-1 text-slate-400"><Globe className="w-3.5 h-3.5" />{stats.states} States</span>
          <span className="flex items-center gap-1 text-slate-400"><Flag className="w-3.5 h-3.5 text-red-400" />{stats.flagged} Flagged</span>
          <span className="flex items-center gap-1 text-slate-400"><AlertTriangle className="w-3.5 h-3.5 text-orange-400" />{stats.repeat} Repeat</span>
          <span className="flex items-center gap-1 text-slate-400"><AlertCircle className="w-3.5 h-3.5 text-red-400" />{stats.offenders} Offenders</span>
        </div>
      </div>
      <nav className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {[{ id: 'search', label: 'Search', icon: Search }, { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag }, { id: 'saved', label: 'Saved Searches', icon: Bookmark, badge: savedSearches.length }, { id: 'interest', label: 'Watchlist', icon: Eye, badge: itemsOfInterest.length }, { id: 'alerts', label: 'Alerts', icon: Bell, badge: alerts.length }].map(tab => (
            <button key={tab.id} onClick={() => setCurrentPage(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap relative ${currentPage === tab.id ? 'text-amber-400 bg-slate-700/50' : 'text-slate-400 hover:text-slate-200'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}{tab.badge > 0 && <span className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${tab.id === 'alerts' ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-300'}`}>{tab.badge}</span>}
              {currentPage === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
            </button>
          ))}
        </div>
      </nav>
      {notification && (
        <div className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 max-w-md ${notification.type === 'success' ? 'bg-emerald-600' : notification.type === 'alert' ? 'bg-amber-600' : 'bg-red-600'}`}>
          {notification.type === 'success' ? <Check className="w-4 h-4" /> : notification.type === 'alert' ? <Bell className="w-4 h-4" /> : <X className="w-4 h-4" />}
          <span className="text-sm font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:bg-white/20 rounded p-0.5"><X className="w-3 h-3" /></button>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentPage === 'search' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-amber-400" />Search Pawn Records</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Seller Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" value={searchFilters.sellerName} onChange={e => setSearchFilters(p => ({ ...p, sellerName: e.target.value }))} placeholder="Search seller..." className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Item Name</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" value={searchFilters.itemName} onChange={e => setSearchFilters(p => ({ ...p, itemName: e.target.value }))} placeholder="Search item..." className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select value={searchFilters.category} onChange={e => setSearchFilters(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500">
                    <option value="">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">State</label>
                  <select value={searchFilters.state} onChange={e => setSearchFilters(p => ({ ...p, state: e.target.value }))} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500">
                    <option value="">All States</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div><label className="block text-xs text-slate-400 mb-1">Pawn Shop</label><input type="text" value={searchFilters.pawnShopName} onChange={e => setSearchFilters(p => ({ ...p, pawnShopName: e.target.value }))} placeholder="Search shop..." className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500" /></div>
                <div><label className="block text-xs text-slate-400 mb-1">Serial #</label><input type="text" value={searchFilters.serialNumber} onChange={e => setSearchFilters(p => ({ ...p, serialNumber: e.target.value }))} placeholder="Search serial..." className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-amber-500" /></div>
                <div><label className="block text-xs text-slate-400 mb-1">Min Value</label><input type="number" value={searchFilters.minValue} onChange={e => setSearchFilters(p => ({ ...p, minValue: e.target.value }))} placeholder="$0" className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm" /></div>
                <div><label className="block text-xs text-slate-400 mb-1">Max Value</label><input type="number" value={searchFilters.maxValue} onChange={e => setSearchFilters(p => ({ ...p, maxValue: e.target.value }))} placeholder="No limit" className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm" /></div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-slate-700">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={searchFilters.showFlaggedOnly} onChange={e => setSearchFilters(p => ({ ...p, showFlaggedOnly: e.target.checked }))} className="w-4 h-4 rounded" /><span className="text-sm text-slate-300"><Flag className="w-3 h-3 inline text-red-400 mr-1" />Flagged Only</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={searchFilters.showRepeatSellersOnly} onChange={e => setSearchFilters(p => ({ ...p, showRepeatSellersOnly: e.target.checked }))} className="w-4 h-4 rounded" /><span className="text-sm text-slate-300"><AlertTriangle className="w-3 h-3 inline text-orange-400 mr-1" />Repeat Sellers</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={searchFilters.showKnownOffendersOnly} onChange={e => setSearchFilters(p => ({ ...p, showKnownOffendersOnly: e.target.checked }))} className="w-4 h-4 rounded" /><span className="text-sm text-slate-300"><AlertCircle className="w-3 h-3 inline text-red-400 mr-1" />Known Offenders</span></label>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={clearFilters} className="text-sm text-slate-400 hover:text-slate-200 flex items-center gap-1"><X className="w-4 h-4" />Clear</button>
                <div className="flex gap-2">
                  <button onClick={addToWatchlist} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium"><Eye className="w-4 h-4" />Add to Watchlist</button>
                  <button onClick={saveSearch} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg text-sm font-medium"><Bookmark className="w-4 h-4" />Save Search</button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-400">{filteredTransactions.length} records</p>
              {filteredTransactions.map(t => (
                <div key={t.id} onClick={() => setSelectedTransaction(t)} className={`bg-slate-800 rounded-xl p-4 border cursor-pointer hover:border-slate-600 ${t.isFlagged ? 'border-red-500/50 bg-red-950/20' : isKnownOffender(t.sellerName) ? 'border-orange-500/50 bg-orange-950/20' : 'border-slate-700'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1"><span className="text-[10px] text-slate-500 font-mono">{t.transactionId}</span><span className="text-[10px] text-slate-500">{new Date(t.submittedAt).toLocaleDateString()}</span></div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-white">{t.itemName}</h4>
                        <span className="px-2 py-0.5 bg-slate-700 rounded text-xs">{t.category}</span>
                        {repeatSellers.includes(t.sellerName.toLowerCase()) && <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Repeat</span>}
                        {isKnownOffender(t.sellerName) && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />Offender</span>}
                        {t.isFlagged && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs flex items-center gap-1"><Flag className="w-3 h-3" />Flagged</span>}
                        {t.images && t.images.length > 0 && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center gap-1"><Image className="w-3 h-3" />{t.images.length} photo{t.images.length > 1 ? 's' : ''}</span>}
                      </div>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-1">{t.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{t.sellerName}</span>
                        <span className="flex items-center gap-1"><Store className="w-3 h-3" />{t.pawnShopName}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.pawnShopCity}, {t.pawnShopState}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${t.estimatedValue.toLocaleString()}</span>
                      </div>
                      {/* IMAGE THUMBNAILS IN LIST VIEW */}
                      {t.images && t.images.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {t.images.slice(0, 3).map((imgSrc, idx) => (
                            <img key={idx} src={imgSrc} alt={`Item ${idx + 1}`} className="w-12 h-12 rounded-lg object-cover border border-slate-600" />
                          ))}
                          {t.images.length > 3 && (
                            <span className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-xs text-slate-400">+{t.images.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={e => { e.stopPropagation(); handleFlag(t.id); }} className={`p-2 rounded-lg ${t.isFlagged ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}><Flag className="w-4 h-4" /></button>
                      <button onClick={e => { e.stopPropagation(); setSelectedTransaction(t); }} className="p-2 bg-slate-700 text-slate-400 hover:bg-slate-600 rounded-lg"><Eye className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTransactions.length === 0 && <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center"><Search className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">No records match</p></div>}
            </div>
          </div>
        )}
        {currentPage === 'marketplace' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-amber-400" />Online Marketplace Search</h2>
              <div className="flex items-center gap-2 mb-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">eBay</span><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">OfferUp</span></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2"><input type="text" value={marketplaceSearch.query} onChange={e => setMarketplaceSearch(p => ({ ...p, query: e.target.value }))} placeholder="Search marketplaces..." className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm" /></div>
                <div><select value={marketplaceSearch.platform} onChange={e => setMarketplaceSearch(p => ({ ...p, platform: e.target.value }))} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm"><option value="all">All Platforms</option><option value="eBay">eBay</option><option value="OfferUp">OfferUp</option></select></div>
                <div className="flex gap-2"><input type="number" value={marketplaceSearch.minPrice} onChange={e => setMarketplaceSearch(p => ({ ...p, minPrice: e.target.value }))} placeholder="Min $" className="w-1/2 px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm" /><input type="number" value={marketplaceSearch.maxPrice} onChange={e => setMarketplaceSearch(p => ({ ...p, maxPrice: e.target.value }))} placeholder="Max $" className="w-1/2 px-2 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm" /></div>
              </div>
              <button onClick={searchMarketplace} disabled={isSearchingMarketplace} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-600 text-slate-900 rounded-lg font-medium flex items-center justify-center gap-2">{isSearchingMarketplace ? <><RefreshCw className="w-4 h-4 animate-spin" />Searching...</> : <><Search className="w-4 h-4" />Search eBay & OfferUp</>}</button>
            </div>
            {marketplaceResults.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-slate-400">{marketplaceResults.length} listings</p>
                {marketplaceResults.map(l => (
                  <div key={l.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><span className={`px-2 py-0.5 rounded text-xs font-medium ${l.platform === 'eBay' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{l.platform}</span><span className="text-xs text-slate-500">{l.listingDate}</span></div>
                        <h4 className="font-semibold text-white">{l.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500"><span>{l.seller}</span><span>{l.location}</span></div>
                      </div>
                      <div className="text-right"><p className="text-lg font-bold text-amber-400">${l.price.toLocaleString()}</p><a href={l.url} className="text-xs text-slate-400 hover:text-amber-400">View →</a></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {marketplaceResults.length === 0 && !isSearchingMarketplace && <div className="bg-slate-800/50 rounded-xl p-8 border border-dashed border-slate-600 text-center"><ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">Enter a search term to find marketplace listings</p></div>}
          </div>
        )}
        {currentPage === 'saved' && (
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Bookmark className="w-5 h-5 text-amber-400" />Saved Searches ({savedSearches.length})</h2>
            <p className="text-sm text-slate-400 mb-4">Saved searches alert you when new transactions match your criteria.</p>
            {savedSearches.length > 0 ? (
              <div className="space-y-2">{savedSearches.map(s => (
                <div key={s.id} className="flex items-center justify-between bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 min-w-0"><div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center"><Search className="w-5 h-5 text-amber-400" /></div><div className="min-w-0"><p className="text-sm font-medium text-white truncate">{s.name}</p><p className="text-xs text-slate-500">Saved {new Date(s.createdAt).toLocaleDateString()} • {s.resultCount} results</p></div></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setSearchFilters(s.filters); setCurrentPage('search'); }} className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded text-xs font-medium">Run<ChevronRight className="w-3 h-3" /></button>
                    <button onClick={() => { setSavedSearches(p => p.filter(x => x.id !== s.id)); setAlerts(p => p.filter(a => a.searchId !== s.id)); }} className="p-1.5 text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}</div>
            ) : (
              <div className="text-center py-8"><Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">No saved searches yet</p><p className="text-sm text-slate-500 mt-1">Run a search and click "Save Search" to start watching for matches.</p><button onClick={() => setCurrentPage('search')} className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">Go to Search</button></div>
            )}
          </div>
        )}
        {currentPage === 'interest' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Eye className="w-5 h-5 text-amber-400" />Items of Interest ({itemsOfInterest.length})</h2>
              <p className="text-sm text-slate-400 mb-4">Track specific items or sellers. Get alerted on matches.</p>
              {itemsOfInterest.length > 0 ? (
                <div className="space-y-2">{itemsOfInterest.map(i => (
                  <div key={i.id} className="flex items-center justify-between bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-3 min-w-0"><div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"><Eye className="w-5 h-5 text-blue-400" /></div><div className="min-w-0"><p className="text-sm font-medium text-white truncate">{i.name}</p><p className="text-xs text-slate-500">Added {new Date(i.createdAt).toLocaleDateString()}</p></div></div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSearchFilters(i.criteria); setCurrentPage('search'); }} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs font-medium">Search<ChevronRight className="w-3 h-3" /></button>
                      <button onClick={() => { setItemsOfInterest(p => p.filter(x => x.id !== i.id)); setAlerts(p => p.filter(a => a.itemId !== i.id)); }} className="p-1.5 text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}</div>
              ) : (
                <div className="text-center py-8"><Eye className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">No items on your watchlist</p><p className="text-sm text-slate-500 mt-1">Search and click "Add to Watchlist" to track items or sellers.</p><button onClick={() => setCurrentPage('search')} className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">Go to Search</button></div>
              )}
            </div>
          </div>
        )}
        {currentPage === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-5 h-5 text-amber-400" />Alerts ({alerts.length})</h2>{alerts.length > 0 && <button onClick={() => setAlerts([])} className="text-xs text-slate-400 hover:text-slate-200">Clear All</button>}</div>
              {alerts.length > 0 ? (
                <div className="space-y-3">{alerts.map(a => (
                  <div key={a.id} className={`rounded-lg p-4 border ${a.type === 'known_offender' ? 'bg-red-950/30 border-red-500/30' : 'bg-slate-900 border-slate-700'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${a.type === 'known_offender' ? 'bg-red-500/20' : a.type === 'item_of_interest' ? 'bg-blue-500/20' : 'bg-amber-500/20'}`}>
                          {a.type === 'known_offender' ? <AlertCircle className="w-5 h-5 text-red-400" /> : a.type === 'item_of_interest' ? <Eye className="w-5 h-5 text-blue-400" /> : <Bell className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{a.type === 'known_offender' && '⚠️ KNOWN OFFENDER'}{a.type === 'saved_search' && `Search Match: "${a.searchName}"`}{a.type === 'item_of_interest' && `Watchlist Match: "${a.itemName}"`}</p>
                          <p className="text-sm text-slate-400 mt-1"><span className="text-amber-400">{a.transactionItemName}</span> by <span className="text-amber-400">{a.sellerName}</span></p>
                          {a.offenderReason && <p className="text-xs text-red-400 mt-1">Reason: {a.offenderReason}</p>}
                          <p className="text-xs text-slate-600 mt-2">{new Date(a.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { const t = transactions.find(x => x.id === a.transactionId); if (t) setSelectedTransaction(t); }} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs font-medium">View</button>
                        <button onClick={() => setAlerts(p => p.filter(x => x.id !== a.id))} className="p-1.5 text-slate-500 hover:text-slate-300"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}</div>
              ) : (
                <div className="text-center py-8"><Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">No alerts</p><p className="text-sm text-slate-500 mt-1">Alerts appear when new transactions match your saved searches or watchlist.</p></div>
              )}
            </div>
          </div>
        )}
      </main>
      {/* TRANSACTION DETAIL MODAL WITH IMAGES */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTransaction(null)}>
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div><p className="text-xs text-slate-500 font-mono">{selectedTransaction.transactionId}</p><h3 className="text-lg font-semibold text-white">{selectedTransaction.itemName}</h3></div>
              <button onClick={() => setSelectedTransaction(null)} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                {selectedTransaction.isFlagged && <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1"><Flag className="w-3 h-3" />Flagged: {selectedTransaction.flagReason}</span>}
                {repeatSellers.includes(selectedTransaction.sellerName.toLowerCase()) && <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Repeat Seller</span>}
                {isKnownOffender(selectedTransaction.sellerName) && <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />Known Offender</span>}
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">{selectedTransaction.category}</span>
              </div>
              
              {/* ITEM PHOTOS SECTION */}
              {selectedTransaction.images && selectedTransaction.images.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Item Photos ({selectedTransaction.images.length})
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedTransaction.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => window.open(imgSrc, '_blank')}
                        className="focus:outline-none group"
                      >
                        <img
                          src={imgSrc}
                          alt={`Item photo ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-slate-700 group-hover:border-amber-400 transition-colors"
                        />
                        <p className="text-xs text-slate-500 mt-1 group-hover:text-amber-400">Click to enlarge</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-2"><Package className="w-4 h-4" />Item Details</h4>
                <div className="bg-slate-900 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="text-slate-500">Description:</span> <span className="text-slate-300">{selectedTransaction.description}</span></p>
                  {selectedTransaction.serialNumber && <p><span className="text-slate-500">Serial:</span> <span className="text-slate-300 font-mono">{selectedTransaction.serialNumber}</span></p>}
                  <p><span className="text-slate-500">Value:</span> <span className="text-amber-400 font-semibold">${selectedTransaction.estimatedValue.toLocaleString()}</span></p>
                  <p><span className="text-slate-500">Submitted:</span> <span className="text-slate-300">{new Date(selectedTransaction.submittedAt).toLocaleString()}</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-2"><User className="w-4 h-4" />Seller Information</h4>
                <div className="bg-slate-900 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="text-slate-500">Name:</span> <span className="text-slate-300">{selectedTransaction.sellerName}</span></p>
                  <p><span className="text-slate-500">Phone:</span> <span className="text-slate-300">{selectedTransaction.sellerPhone}</span></p>
                  <p><span className="text-slate-500">Address:</span> <span className="text-slate-300">{selectedTransaction.sellerAddress}</span></p>
                  <p><span className="text-slate-500">ID:</span> <span className="text-slate-300">{selectedTransaction.sellerIdType} - {selectedTransaction.sellerIdNumber}</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-2"><Store className="w-4 h-4" />Pawn Shop Information</h4>
                <div className="bg-slate-900 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="text-slate-500">Name:</span> <span className="text-slate-300">{selectedTransaction.pawnShopName}</span></p>
                  <p><span className="text-slate-500">License:</span> <span className="text-slate-300 font-mono">{selectedTransaction.pawnShopLicense}</span></p>
                  <p><span className="text-slate-500">Address:</span> <span className="text-slate-300">{selectedTransaction.pawnShopAddress}, {selectedTransaction.pawnShopCity}, {selectedTransaction.pawnShopState} {selectedTransaction.pawnShopZip}</span></p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-slate-700">
                <button onClick={() => handleFlag(selectedTransaction.id)} className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${selectedTransaction.isFlagged ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}><Flag className="w-4 h-4" />{selectedTransaction.isFlagged ? 'Remove Flag' : 'Flag Item'}</button>
                <button onClick={() => { setSearchFilters(p => ({ ...p, sellerName: selectedTransaction.sellerName })); setSelectedTransaction(null); setCurrentPage('search'); }} className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-medium flex items-center justify-center gap-2"><Search className="w-4 h-4" />Search Seller</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="mt-12 py-4 border-t border-slate-800"><div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-600"><p>DCJS Investigator Dashboard • Law Enforcement Only • IFB No. DCJS-IFB-2025-02</p></div></footer>
    </div>
  );
}

// ============================================================================
// MAIN APP WITH ROUTING
// ============================================================================

export default function DCJSPropertySearchApp() {
  const [currentRoute, setCurrentRoute] = useState('landing');

  if (currentRoute === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"><Shield className="w-12 h-12 text-slate-900" /></div>
            <h1 className="text-4xl font-bold text-white mb-3">DCJS Property Search System</h1>
            <p className="text-lg text-slate-400">New York State Division of Criminal Justice Services<br/>Second-hand Property Reporting & Investigation Platform</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => setCurrentRoute('submit')} className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-2xl p-8 text-left transition-all">
              <div className="w-14 h-14 bg-blue-600/20 group-hover:bg-blue-600/30 rounded-xl flex items-center justify-center mb-6"><Store className="w-8 h-8 text-blue-400" /></div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Pawn Shop Portal<ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" /></h2>
              <p className="text-slate-400 text-sm mb-4">For licensed pawn shops to submit transaction reports with photos as required by law.</p>
              <div className="flex flex-wrap gap-2"><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Submit Transactions</span><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Upload Photos</span><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Public Access</span></div>
              <p className="text-xs text-blue-400 mt-4 font-medium">Route: /submit</p>
            </button>
            <button onClick={() => setCurrentRoute('dashboard')} className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-8 text-left transition-all">
              <div className="w-14 h-14 bg-amber-600/20 group-hover:bg-amber-600/30 rounded-xl flex items-center justify-center mb-6"><Shield className="w-8 h-8 text-amber-400" /></div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Investigator Dashboard<ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" /></h2>
              <p className="text-slate-400 text-sm mb-4">Secure law enforcement portal for searching records, viewing photos, and managing alerts.</p>
              <div className="flex flex-wrap gap-2"><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Search Records</span><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">View Photos</span><span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Alerts</span></div>
              <p className="text-xs text-amber-400 mt-4 font-medium">Route: /dashboard</p>
            </button>
          </div>
          <div className="mt-12 text-center"><p className="text-sm text-slate-500">Demo Application • IFB No. DCJS-IFB-2025-02</p><p className="text-xs text-slate-600 mt-2">Transactions with photos submitted through the Pawn Shop Portal appear immediately in the Dashboard</p></div>
        </div>
      </div>
    );
  }
  if (currentRoute === 'submit') return <PublicSubmissionPage onNavigate={setCurrentRoute} />;
  if (currentRoute === 'dashboard') return <InvestigatorDashboard onNavigate={setCurrentRoute} />;
  return null;
}
