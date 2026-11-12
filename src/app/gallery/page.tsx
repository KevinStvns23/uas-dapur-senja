"use client";
import { useState } from "react";
import "./style.css";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("tab-momen");
  const [modalData, setModalData] = useState({ isOpen: false, imgSrc: "", title: "", desc: "" });

  const openModal = (imgSrc: string, title: string, desc: string) => {
    setModalData({ isOpen: true, imgSrc, title, desc });
  };

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Dapur Senja</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/promotions">Promo & Info</a></li>
          <li><a href="/reservation">Reservation</a></li>
          <li><a href="/login">Account</a></li>
        </ul>
      </nav>

      <header className="menu-header">
        <h1>Galeri & Momen</h1>
        <p>Jelajahi fasilitas dan momen hangat di restoran kami</p>
      </header>

      <div className="filter-container">
        <a href="/promotions" className="filter-btn">Promotions</a>
        <a href="/events" className="filter-btn">Events</a>
        <a href="/gallery" className="filter-btn active">Gallery</a>
        <a href="/reviews" className="filter-btn">Reviews</a>
      </div>

      <main>
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'tab-momen' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab-momen')}
          >
            Suasana & Momen
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tab-rasa' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tab-rasa')}
          >
            Kisah di Balik Rasa
          </button>
        </div>

        <section id="tab-momen" className="tab-content" style={{ display: activeTab === 'tab-momen' ? 'block' : 'none' }}>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Intip fasilitas dan momen hangat di Dapur Senja.</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/img-events&momen/suasana-restoran.webp" alt="Suasana Resto" />
              <p>Area Makan Nyaman</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/suasana-outdoor.jpg" alt="Suasana Outdoor" />
              <p>Area Teras Terbuka</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/momen-hangat-keluarga.jpeg" alt="Momen Keluarga" />
              <p>Momen Hangat Keluarga</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/dapur-restoran.jpg" alt="Dapur" />
              <p>Dapur Profesional</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/tim-restoran.jpg" alt="Tim Koki" />
              <p>Chef Berpengalaman</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/live-akustik.jpg" alt="Akustik" />
              <p>Panggung Akustik</p>
            </div>
            <div className="gallery-item">
              <img src="/img-events&momen/nonton-bareng.jpg" alt="Nobar" />
              <p>Area Nonton Bareng</p>
            </div>
          </div>
        </section>

        <section id="tab-rasa" className="tab-content" style={{ display: activeTab === 'tab-rasa' ? 'block' : 'none' }}>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Klik hidangan untuk mengetahui cerita di balik rasanya.</p>
          <div className="gallery-grid">
            <div className="gallery-item" onClick={() => openModal('/menu/images/ayambakar.jpg', 'Ayam Bakar', 'Diungkep perlahan dengan racikan rempah warisan keluarga sebelum dibakar di atas arang.')}>
              <img src="/menu/images/ayambakar.jpg" alt="Ayam Bakar" />
              <p>Ayam Bakar</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/ayamgeprek.jpg', 'Ayam Geprek', 'Perpaduan tekstur ayam krispi keemasan dengan ulekan sambal bawang pedas yang menggigit.')}>
              <img src="/menu/images/ayamgeprek.jpg" alt="Ayam Geprek" />
              <p>Ayam Geprek</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/nasigoreng.jpg', 'Nasi Goreng Spesial', 'Dimasak dengan api besar untuk mengunci aroma wok hei, dipadukan dengan bumbu rempah pekat.')}>
              <img src="/menu/images/nasigoreng.jpg" alt="Nasi Goreng" />
              <p>Nasi Goreng Spesial</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/miegoreng.jpg', 'Mie Goreng', 'Racikan mie kenyal yang ditumis bersuhu tinggi, menyajikan cita rasa gurih manis dengan limpahan topping.')}>
              <img src="/menu/images/miegoreng.jpg" alt="Mie Goreng" />
              <p>Mie Goreng</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/rendang.jpg', 'Rendang Sapi', 'Potongan daging sapi dimasak perlahan berjam-jam dalam lumuran santan kental, tekstur empuk bumbu meresap.')}>
              <img src="/menu/images/rendang.jpg" alt="Rendang Sapi" />
              <p>Rendang Sapi</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/sate.jpg', 'Sate Ayam', 'Daging ayam lembut dipanggang sempurna, dilumuri bumbu kacang kental gurih manis.')}>
              <img src="/menu/images/sate.jpg" alt="Sate Ayam" />
              <p>Sate Ayam</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/spageti.jpg', 'Spaghetti Bolognese', 'Pasta al dente yang disajikan dengan saus tomat daging cincang kaya rempah khas Italia.')}>
              <img src="/menu/images/spageti.jpg" alt="Spaghetti" />
              <p>Spaghetti</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/frenchfries.jpg', 'French Fries', 'Potongan kentang pilihan yang digoreng garing di luar namun tetap lembut di dalam.')}>
              <img src="/menu/images/frenchfries.jpg" alt="French Fries" />
              <p>French Fries</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/lumpia.jpg', 'Lumpia Goreng', 'Kulit krispi menyembunyikan isian rebung dan sayur gurih yang kaya rasa, digoreng dadakan.')}>
              <img src="/menu/images/lumpia.jpg" alt="Lumpia Goreng" />
              <p>Lumpia Goreng</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/mendoan.jpg', 'Tempe Mendoan', 'Dibalut adonan tepung berbumbu yang digoreng setengah matang, tekstur basah dan gurih khas.')}>
              <img src="/menu/images/mendoan.jpg" alt="Tempe Mendoan" />
              <p>Tempe Mendoan</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/bread.jpg', 'Roti Bakar', 'Roti tebal dipanggang dengan mentega hingga garing, menyembunyikan kelembutan dan manis di dalam.')}>
              <img src="/menu/images/bread.jpg" alt="Roti Bakar" />
              <p>Roti Bakar</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/pisangbakar.jpg', 'Pisang Bakar', 'Pisang manis legit yang dibakar perlahan hingga karamelisasi alaminya keluar.')}>
              <img src="/menu/images/pisangbakar.jpg" alt="Pisang Bakar" />
              <p>Pisang Bakar</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/cake.jpg', 'Choco Cake', 'Kejutan manis yang menghangatkan suasana. Bolu cokelat lembut dengan rasa pekat yang lumer.')}>
              <img src="/menu/images/cake.jpg" alt="Choco Cake" />
              <p>Choco Cake</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/tiramisu.jpg', 'Tiramisu', 'Dessert klasik berlapis ladyfingers celup kopi dengan krim mascarpone yang ringan dan taburan kakao.')}>
              <img src="/menu/images/tiramisu.jpg" alt="Tiramisu" />
              <p>Tiramisu</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/escampur.jpg', 'Es Campur', 'Mangkuk nostalgia dengan serutan es, sirup manis legit, dan ragam isian kenyal menyegarkan.')}>
              <img src="/menu/images/escampur.jpg" alt="Es Campur" />
              <p>Es Campur</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/jusalpukat.jpg', 'Jus Alpukat', 'Alpukat mentega yang diblend sempurna dengan sentuhan kental manis cokelat di pinggiran gelas.')}>
              <img src="/menu/images/jusalpukat.jpg" alt="Jus Alpukat" />
              <p>Jus Alpukat</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/smoothies.jpg', 'Berry Smoothies', 'Campuran buah beri segar dan yogurt yang dihaluskan, sangat cocok untuk mengimbangi hidangan gurih.')}>
              <img src="/menu/images/smoothies.jpg" alt="Smoothies" />
              <p>Berry Smoothies</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/matcha.jpg', 'Matcha Latte', 'Perpaduan teh hijau premium dengan susu krimi, menghasilkan rasa earthy yang khas dan menenangkan.')}>
              <img src="/menu/images/matcha.jpg" alt="Matcha" />
              <p>Matcha Latte</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/lemontea.jpg', 'Lemon Tea', 'Kesegaran teh pilihan berpadu dengan asam manis perasan lemon asli.')}>
              <img src="/menu/images/lemontea.jpg" alt="Lemon Tea" />
              <p>Lemon Tea</p>
            </div>
            <div className="gallery-item" onClick={() => openModal('/menu/images/americano.jpg', 'Americano', 'Ekstraksi kopi murni yang tegas dan berkarakter, memberikan energi murni tanpa rasa manis berlebih.')}>
              <img src="/menu/images/americano.jpg" alt="Americano" />
              <p>Americano</p>
            </div>
          </div>
        </section>

        <div id="food-modal" className={`modal ${modalData.isOpen ? 'show-animasi' : ''}`} style={{ display: modalData.isOpen ? 'flex' : 'none' }}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <img id="modal-img" src={modalData.imgSrc} alt="Menu Foto" />
            <div className="modal-text">
              <h2 id="modal-title">{modalData.title}</h2>
              <p id="modal-desc">{modalData.desc}</p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p style={{ textAlign: 'center' }}>&copy; 2026 Dapur Senja. All rights reserved.</p>
      </footer>
    </>
  );
}