import React, { useState } from 'react';
import { Download, Share2, Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react';

export default function BusinessCardGenerator() {
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('CEO & Founder');
  const [businessName, setBusinessName] = useState('Acme Corporation');
  const [email, setEmail] = useState('john@acmecorp.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [website, setWebsite] = useState('www.acmecorp.com');
  const [address, setAddress] = useState('123 Innovation Drive, Tech City');
  
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState('#1e293b');
  
  // Auto-generate abbreviation logo
  const generateLogo = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 0 || name === '') return 'LG';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} - ${businessName} Business Card`,
          text: `Contact ${name} at ${businessName}. Phone: ${phone}, Email: ${email}`,
          url: website.startsWith('http') ? website : `https://${website}`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser. You can download the PDF instead.');
    }
  };

  const logoText = generateLogo(businessName);

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 print-friendly">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .card-preview-area, .card-preview-area * {
            visibility: visible;
          }
          .card-preview-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `}} />

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Card Details</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
            <input type="text" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Brand Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-10 w-10 rounded border" />
                  <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-xl font-mono text-sm uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="h-10 w-10 rounded border" />
                  <input type="text" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-xl font-mono text-sm uppercase" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-8 rounded-3xl flex flex-col items-center justify-center border border-slate-200">
        <div className="w-full max-w-md card-preview-area">
          {/* Card Preview */}
          <div 
            className="w-full aspect-[1.586/1] rounded-2xl shadow-2xl relative overflow-hidden text-white flex flex-col"
            style={{ backgroundColor: secondaryColor }}
          >
            {/* Design elements */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/3 opacity-20"
              style={{ backgroundColor: primaryColor }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/3 -translate-x-1/4 opacity-10"
              style={{ backgroundColor: 'white' }}
            />
            <div 
              className="absolute inset-y-0 right-0 w-1/3 opacity-80"
              style={{ backgroundColor: primaryColor, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
            />

            <div className="relative z-10 flex-grow p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                  <p className="text-sm opacity-90 mt-1 uppercase tracking-wider font-medium" style={{ color: primaryColor === '#ffffff' ? '#000000' : 'rgba(255,255,255,0.7)' }}>{title}</p>
                </div>
                
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg border-[3px] border-white/20"
                  style={{ backgroundColor: primaryColor, color: '#fff' }}
                >
                  {logoText}
                </div>
              </div>

              <div className="space-y-2.5 mt-8 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: primaryColor }} />
                  <span className="opacity-90">{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: primaryColor }} />
                  <span className="opacity-90">{email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} style={{ color: primaryColor }} />
                  <span className="opacity-90">{website}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} flexShrink={0} style={{ color: primaryColor }} />
                  <span className="opacity-90">{address}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-black/20 p-4 px-8 mt-auto flex items-center gap-3">
              <Building2 size={18} />
              <span className="font-semibold tracking-wide">{businessName}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4 w-full">
            <button 
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Download size={20} />
              Save PDF
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Share2 size={20} />
              Share Digital Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
