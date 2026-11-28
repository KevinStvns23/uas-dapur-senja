"use client";

import type { FormEvent } from "react";
import MainNavbar from "../../components/MainNavbar";
import SubNavbar from "../../components/SubNavbar";
import styles from "./page.module.css";

export default function ContactPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.alert(
      "Pesan berhasil dikirim. Terima kasih sudah menghubungi Dapur Senja!"
    );

    event.currentTarget.reset();
  }

  return (
    <>
      <MainNavbar />
      <SubNavbar />

      <div className={styles.pageContent}>
        <main>
          <section className={styles.contactHeader}>
            <p className={styles.contactLabel}>GET IN TOUCH</p>
            <h1>Contact Us</h1>
            <p>
              Hubungi kami untuk informasi, reservasi, atau pertanyaan lainnya.
              Kami siap membantu Anda.
            </p>
          </section>

          <section className={styles.contactInfoSection}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📍</div>
              <h3>Alamat</h3>
              <p>
                Jl. Letjen S. Parman
                <br />
                Jakarta, Indonesia
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jakarta%2C%20Indonesia"
                target="_blank"
                rel="noreferrer"
              >
                Lihat di Maps
              </a>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h3>Nomor Telepon</h3>
              <p>021-1234-5678</p>
              <a href="tel:02112345678">Hubungi Kami</a>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>✉️</div>
              <h3>Email</h3>
              <p>info@dapursenja.com</p>
              <a href="mailto:info@dapursenja.com">Kirim Email</a>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>🕐</div>
              <h3>Jam Operasional</h3>
              <p>
                Senin - Minggu
                <br />
                10.00 - 22.00 WIB
              </p>
            </div>
          </section>

          <section className={styles.locationSection}>
            <div className={styles.locationText}>
              <p className={styles.sectionLabel}>FIND US</p>
              <h2>Lokasi Kami</h2>
              <p>
                Dapur Senja berusaha memberikan suasana yang nyaman dan mudah
                dijangkau oleh pelanggan.
              </p>

              <div className={styles.openingBox}>
                <h3>Jam Operasional</h3>
                <div className={styles.openingRow}>
                  <span>Senin - Jumat</span>
                  <strong>10.00 - 22.00</strong>
                </div>
                <div className={styles.openingRow}>
                  <span>Sabtu - Minggu</span>
                  <strong>10.00 - 23.00</strong>
                </div>
              </div>
            </div>

            <div className={styles.mapContainer}>
              <iframe
                title="Peta lokasi Dapur Senja"
                src="https://www.google.com/maps?q=Jakarta%2C%20Indonesia&output=embed"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </section>

          <section className={styles.messageSection}>
            <div className={styles.contactTitle}>
              <p>CONTACT US</p>
              <h2>Kirim Pesan</h2>
              <span>Silakan kirim pertanyaan atau pesan kepada kami.</span>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pesan">Pesan</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={5}
                  placeholder="Tulis pesan Anda..."
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Kirim Pesan
              </button>
            </form>
          </section>

          <footer className={styles.footer}>
            <p>
              © {new Date().getFullYear()} Dapur Senja. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
