'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const phoneNumber = '8562052373435';
  const message = encodeURIComponent("Hi Maxon! I'm interested in discussing a project with you.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform group-hover:scale-110">
          <MessageCircle size={28} strokeWidth={2} />
        </div>
      </div>
    </a>
  );
}
