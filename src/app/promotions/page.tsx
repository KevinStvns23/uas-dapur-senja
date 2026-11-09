"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Accordion } from "react-bootstrap";

export default function PromotionsPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [countdown, setCountdown] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    const targetDate = new Date("Oct 10, 2026 23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setCountdown("PROMO TELAH BERAKHIR");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown("Waktu Tersisa: " + days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container className="py-5">
      <div className="bg-warning text-dark p-4 rounded mb-5 text-center">
        <h1 className="fw-bold">Promo Makanan & Penawaran Spesial</h1>
        <p className="mb-0">Klaim vouchernya sekarang dan nikmati harga spesial untuk menu andalan Dapur Senja!</p>
      </div>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="border-warning h-100 shadow-sm" style={{ borderLeftWidth: '4px' }}>
            <Card.Body>
              <Card.Title className="text-warning fw-bold">Weekend Santai (Diskon 15%)</Card.Title>
              <Card.Text>
                Nikmati akhir pekan Anda! Setiap pembelian menu makanan apa saja, dapatkan diskon 15% plus pilihan Jus Strawberry atau Jus Alpukat GRATIS.
                <br /><br />
                <strong>Masa Berlaku:</strong> Setiap Sabtu & Minggu (Berlaku Sepanjang Tahun)
              </Card.Text>
              <Button variant="warning" onClick={() => handleShow("INFORMASI KLAIM MANUAL", "Kode Promo: WEEKEND15\n\nTunjukkan kode promo ini langsung kepada kasir kami sebelum Anda membayar pesanan. Jangan lupa sebutkan pilihan jus gratis Anda!")}>Klaim Voucher</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="border-warning h-100 shadow-sm" style={{ borderLeftWidth: '4px' }}>
            <Card.Body>
              <Card.Title className="text-warning fw-bold">Promo Spesial Bulanan (Oktober)</Card.Title>
              <Card.Text>
                Transaksi minimal Rp 100.000, langsung dapat potongan Rp 15.000 untuk kunjungan Anda berikutnya.
                <br /><br />
                <strong>Masa Berlaku:</strong> 1 - 31 Oktober 2026
              </Card.Text>
              <Button variant="warning" onClick={() => handleShow("INFORMASI KLAIM MANUAL", "Kode Promo: OKT15K\n\nPromo ini berlaku untuk transaksi berikutnya. Simpan struk transaksi Anda hari ini (minimal Rp 100.000) dan tunjukkan kepada kasir saat Anda datang kembali.")}>Klaim Voucher</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="border-warning h-100 shadow-sm" style={{ backgroundColor: '#fff4e6', border: '2px solid #ff8c00' }}>
            <Card.Body>
              <Card.Title className="text-warning fw-bold">Flash Sale 10.10 (Menu Cuma 15rb!)</Card.Title>
              <p style={{ fontWeight: 'bold', color: '#ff8c00', fontSize: '18px' }}>{countdown}</p>
              <Card.Text>
                Spesial tanggal kembar! Nikmati Nasi Goreng Spesial atau Ayam Bakar hanya seharga Rp 15.000.
              </Card.Text>
              <Button variant="warning" onClick={() => handleShow("INFORMASI KLAIM MANUAL", "Kode Promo: FLASH1010\n\nHanya berlaku pada tanggal 10 Oktober 2026! Tunjukkan pesan ini ke kasir sebelum memesan.")}>Klaim Voucher</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="border-warning h-100 shadow-sm" style={{ borderLeft: '4px solid #ffcc00' }}>
            <Card.Body>
              <Card.Title className="text-warning fw-bold">Promo Hari Kelahiran (Diskon 10%)</Card.Title>
              <Card.Text>
                Rayakan hari spesial Anda bersama kami! Dapatkan diskon 10% untuk seluruh pesanan tanpa minimum transaksi.
                <br /><br />
                <strong>Masa Berlaku:</strong> Berlaku tepat di hari ulang tahun Anda.
              </Card.Text>
              <Button style={{ backgroundColor: '#ffcc00', color: '#333', borderColor: '#ffcc00' }} onClick={() => handleShow("INFORMASI KLAIM MANUAL", "Klaim Promo Ulang Tahun berhasil!\n\nPromo ini HANYA BERLAKU tepat pada hari kelahiran Anda. Silakan tunjukkan KTP/Identitas asli Anda langsung ke kasir kami untuk diverifikasi.")}>Klaim Promo Ulang Tahun</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="border-warning h-100 shadow-sm" style={{ borderLeft: '4px solid #4CAF50' }}>
            <Card.Body>
              <Card.Title className="text-warning fw-bold">Paket Pelajar & Mahasiswa (Diskon 20%)</Card.Title>
              <Card.Text>
                Tunjukkan kartu pelajar atau KTM aktif kamu dan nikmati potongan harga 20% untuk semua menu tanpa terkecuali.
                <br /><br />
                <strong>Masa Berlaku:</strong> Senin - Jumat (Tidak berlaku di hari libur nasional)
              </Card.Text>
              <Button style={{ backgroundColor: '#4CAF50', color: 'white', borderColor: '#4CAF50' }} onClick={() => handleShow("INFORMASI KLAIM MANUAL", "Promo Mahasiswa/Pelajar tidak menggunakan kode voucher di website.\n\nAnda cukup membawa dan menunjukkan Kartu Pelajar atau KTM fisik yang masih aktif kepada kasir kami sebelum melakukan pembayaran.")}>Cek Syarat Pelajar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-4 text-center mt-5">Tanya Jawab Syarat & Ketentuan Promo</h2>
      <Accordion className="mx-auto" style={{ maxWidth: '800px' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bagaimana cara menggunakan kode promo dari website ini?</Accordion.Header>
          <Accordion.Body>
            Semua promo diproses secara manual. Anda cukup menekan tombol klaim pada website, kemudian tunjukkan kode atau layar HP Anda secara langsung kepada staf kasir kami sebelum melakukan pembayaran.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Apakah kode voucher promo bisa digabungkan?</Accordion.Header>
          <Accordion.Body>
            Tidak bisa. Dalam satu struk transaksi, Anda hanya dapat memilih dan menggunakan satu penawaran promo yang memberikan keuntungan terbesar bagi Anda.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Apakah Promo Spesial Bulanan akan selalu sama setiap bulannya?</Accordion.Header>
          <Accordion.Body>
            Tidak. Kami rutin mengganti jenis Promo Bulanan setiap tanggal 1 di awal bulan untuk memberikan variasi penawaran menarik. Pantau terus halaman ini untuk promo terbaru.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Apa syarat wajib untuk Promo Hari Kelahiran?</Accordion.Header>
          <Accordion.Body>
            Diskon 10% ini hanya berlaku tepat pada tanggal kelahiran Anda (H-0). Kasir kami wajib memverifikasinya melalui KTP asli atau identitas resmi lainnya yang memiliki tanggal lahir. Tidak berlaku untuk hari sebelum atau sesudah ulang tahun.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Apakah Promo Pelajar berlaku untuk mahasiswa yang sedang skripsi/cuti?</Accordion.Header>
          <Accordion.Body>
            Selama Kartu Tanda Mahasiswa (KTM) Anda memiliki masa berlaku (tahun akademik) yang masih aktif tercetak di kartu, kasir kami akan memproses diskon 20% tersebut.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Apakah promo diskon berlaku untuk dibawa pulang (Takeaway)?</Accordion.Header>
          <Accordion.Body>
            Semua promo yang tertera di website saat ini eksklusif berlaku untuk makan di tempat (Dine-in) agar kualitas dan kehangatan hidangan tetap terjaga saat dinikmati.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Apakah transaksi menggunakan promo bisa pisah struk (Split Bill)?</Accordion.Header>
          <Accordion.Body>
            Mohon maaf, demi kelancaran sistem pencatatan kasir, satu meja yang menggunakan promo wajib melakukan pembayaran gabungan dalam satu struk (tidak bisa di-split).
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderTop: '4px solid #ff8c00' }}>
          <Modal.Title className="text-success fw-bold">{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {modalMessage.split('\n').map((line, index) => (
            <p key={index} className={line.startsWith('Kode Promo:') ? 'fw-bold text-warning border border-warning p-2 rounded d-inline-block mt-3' : 'mb-2'}>
              {line}
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}