import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./page.module.css";
import MainNavbar from "../../components/MainNavbar";
import SubNavbar from "../../components/SubNavbar";

const restaurantPhotos = [
    { src: "/images/about/resto.webp", alt: "Suasana interior Dapur Senja" },
    { src: "/images/about/outdoor.jpg", alt: "Area outdoor Dapur Senja" },
    { src: "/images/about/akustik.jpg", alt: "Suasana acara musik akustik di Dapur Senja" },
];

const teamMembers = [
    { name: "Chef Andi", role: "Head Chef", image: "/images/about/chef1.jpg", alt: "Chef Andi" },
    { name: "Chef Sinta", role: "Kitchen Team", image: "/images/about/chef2.jpg", alt: "Chef Sinta" },
    { name: "Rizky", role: "Restaurant Manager", image: "/images/about/manager.jpg", alt: "Rizky, Restaurant Manager" },
];

export default function AboutPage() {
    return (
        <>
            <MainNavbar />
            <SubNavbar />

            <div className="page-with-subnavbar">
                <main className={styles.aboutPage}>
                    <section className={styles.aboutHeader}>
                        <Container>
                            <p className={styles.aboutLabel}>TENTANG KAMI</p>
                            <h1>About Us</h1>
                            <p className={styles.headerDescription}>
                                Mengenal lebih dekat Dapur Senja, tempat kami menghadirkan
                                hidangan lezat, suasana hangat, dan pengalaman makan yang berkesan.
                            </p>
                        </Container>
                    </section>

                    <section className={styles.historySection}>
                        <Container>
                            <Row className="align-items-center g-4">
                                <Col lg={8}>
                                    <div className={styles.historyText}>
                                        <p className={styles.sectionLabel}>OUR STORY</p>
                                        <h2>Sejarah Restoran</h2>
                                        <p>
                                            Dapur Senja hadir dari kecintaan terhadap kuliner dan
                                            keinginan untuk menciptakan tempat makan yang nyaman
                                            untuk semua kalangan.
                                        </p>
                                        <p>
                                            Sejak berdiri pada tahun 2018, Dapur Senja terus
                                            berkembang dengan menghadirkan berbagai hidangan pilihan
                                            dan menjaga kualitas rasa serta pelayanan. Bagi kami,
                                            setiap hidangan bukan hanya tentang makanan, tetapi juga
                                            tentang menciptakan momen hangat bersama orang-orang
                                            terdekat.
                                        </p>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className={styles.historyBox}>
                                        <span>2018</span>
                                        <p>Awal berdirinya Dapur Senja</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className={styles.visionSection}>
                        <Container>
                            <div className={styles.sectionTitle}>
                                <p>OUR VALUES</p>
                                <h2>Visi &amp; Misi</h2>
                                <span>Nilai yang menjadi dasar dalam menjalankan restoran.</span>
                            </div>
                            <Row className="justify-content-center g-4">
                                <Col md={6} lg={5}>
                                    <div className={styles.valueCard}>
                                        <div className={styles.valueIcon}>🎯</div>
                                        <h3>Visi</h3>
                                        <p>
                                            Menjadi restoran yang dikenal karena cita rasa,
                                            kualitas makanan, dan pelayanan yang baik.
                                        </p>
                                    </div>
                                </Col>
                                <Col md={6} lg={5}>
                                    <div className={styles.valueCard}>
                                        <div className={styles.valueIcon}>⭐</div>
                                        <h3>Misi</h3>
                                        <p>
                                            Menyajikan makanan berkualitas, menjaga kebersihan,
                                            serta memberikan pelayanan yang ramah kepada pelanggan.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className={styles.gallerySection}>
                        <Container>
                            <div className={styles.sectionTitle}>
                                <p>OUR RESTAURANT</p>
                                <h2>Foto Restoran</h2>
                                <span>Suasana yang nyaman untuk menikmati makanan bersama.</span>
                            </div>
                            <Row className="g-4">
                                {restaurantPhotos.map((photo) => (
                                    <Col key={photo.src} md={4}>
                                        <div className={styles.restaurantPhoto}>
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                width={900}
                                                height={600}
                                                className={styles.photoImage}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <section className={styles.teamSection}>
                        <Container>
                            <div className={styles.sectionTitle}>
                                <p>OUR TEAM</p>
                                <h2>Chef &amp; Team</h2>
                                <span>Orang-orang yang bekerja di balik setiap hidangan.</span>
                            </div>
                            <Row className="justify-content-center g-4">
                                {teamMembers.map((member) => (
                                    <Col key={member.name} sm={10} md={6} lg={4}>
                                        <div className={styles.teamCard}>
                                            <div className={styles.teamPhoto}>
                                                <Image
                                                    src={member.image}
                                                    alt={member.alt}
                                                    width={600}
                                                    height={500}
                                                    className={styles.teamImage}
                                                />
                                            </div>
                                            <div className={styles.teamInfo}>
                                                <h3>{member.name}</h3>
                                                <p>{member.role}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <footer className={styles.footer}>
                        <p>© {new Date().getFullYear()} Dapur Senja. All rights reserved.</p>
                    </footer>
                </main>
            </div>
        </>
    );
}
