import Image from "next/image";
import Link from "next/link";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./page.module.css";

const bestSellers = [
    {
        name: "Nasi Goreng Seafood",
        description:
            "Nasi goreng gurih dengan campuran udang, telur, dan seafood pilihan yang disajikan dengan pelengkap segar.",
        image: "/images/nasigoreng.jpeg",
        alt: "Nasi Goreng Seafood",
    },
    {
        name: "Ayam Goreng",
        description:
            "Ayam goreng berbumbu gurih dengan tekstur renyah, disajikan bersama nasi, lalapan, dan sambal khas.",
        image: "/images/ayam.jpeg",
        alt: "Ayam Goreng",
    },
    {
        name: "Spaghetti Bolognese",
        description:
            "Spaghetti dengan saus bolognese gurih dan kaya rasa, dilengkapi daging cincang serta taburan keju.",
        image: "/images/spaghetti.jpeg",
        alt: "Spaghetti Bolognese",
    },
];

export default function HomePage() {
    return (
        <main>
            {/* Hero / Banner */}
            <section className={styles.hero}>
                <Container fluid="xxl" className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <p className={styles.smallTitle}>SELAMAT DATANG DI</p>
                        <h1>Dapur Senja</h1>
                        <p className={styles.heroDescription}>
                            Sajian penuh rasa dalam suasana hangat yang
                            menghadirkan pengalaman makan senyaman menikmati
                            indahnya senja.
                        </p>

                        <div className={styles.heroButtons}>
                            <Link href="/menu" className={styles.primaryButton}>
                                Lihat Menu
                            </Link>
                            <Link
                                href="/reservation"
                                className={styles.outlineButton}
                            >
                                Reservasi
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Best Seller */}
            <section className={styles.bestSeller}>
                <Container fluid="xxl">
                    <div className={styles.sectionTitle}>
                        <p>MENU FAVORIT</p>
                        <h2>Best Seller</h2>
                        <span>
                            Beberapa menu yang paling banyak disukai pelanggan
                            kami.
                        </span>
                    </div>

                    <Row className="g-4 justify-content-center">
                        {bestSellers.map((menu) => (
                            <Col key={menu.name} xs={12} md={6} lg={4}>
                                <div className={`card ${styles.menuCard}`}>
                                    <div className={styles.menuImage}>
                                        <Image
                                            src={menu.image}
                                            alt={menu.alt}
                                            width={600}
                                            height={400}
                                            className={styles.menuImageFile}
                                        />
                                    </div>

                                    <div className={`card-body ${styles.menuContent}`}>
                                        <h5 className="card-title">
                                            {menu.name}
                                        </h5>

                                        <p className="card-text">
                                            {menu.description}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <footer className={styles.footer}>
                <p>
                    © {new Date().getFullYear()} Dapur Senja. All rights
                    reserved.
                </p>
            </footer>
        </main>
    );
}
