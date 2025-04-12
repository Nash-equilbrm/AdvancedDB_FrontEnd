import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="text-gray-300">
              Diễn đàn công nghệ hàng đầu Việt Nam, nơi chia sẻ kiến thức và kinh nghiệm về công nghệ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Trang chủ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Diễn đàn</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Tin tức</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Hỗ trợ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: support@forum.com</li>
              <li className="text-gray-300">Hotline: 1900 1234</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Forum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 