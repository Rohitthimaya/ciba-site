import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamCard, { Avatar } from "@/components/TeamCard";
import { findImage, slugify } from "@/lib/serverImages";

const teamPhoto = (name) => findImage(`images/team/${slugify(name)}`);

export const metadata = {
  title: "About Us — Central Interior Business Accelerator",
  description:
    "For over a decade, Central Interior Business Accelerator (CIBA) has empowered startups, growth-stage, and scaling companies to thrive and transform.",
};

const EXEC = {
  name: "Sachin Singh",
  role: "Executive Director",
  bio: [
    "Sachin is a visionary leader and seasoned entrepreneur with over 15 years of experience driving growth and fostering inclusive innovation. As CIBA's Executive Director, he brings a passion for empowering regional ecosystems through mentorship, strategic partnerships, and technology-driven solutions.",
    "A TRU alumnus and PMP®-certified professional, Sachin has a proven track record of scaling startups and building bridges between academia, industry, and government. His roles at SAP Canada, Farm FinTech, and Agro Sapiens highlight his expertise in securing investments, designing AI-powered tools, and creating impactful partnerships with Indigenous communities and global organizations.",
  ],
};

const BOARD = [
  {
    name: "Fiona Chan",
    role: "Chair",
    bio: [
      "Fiona retired in July 2018 from her role as Assistant Vice President, Credit Risk Management of the Business Development Bank of Canada (BDC) for Western Canada. Active in the community, Fiona has been and continues to be involved in numerous boards across disciplines, namely education, health care, and the arts.",
    ],
  },
  {
    name: "Michele Bedard",
    role: "Vice Chair",
    bio: [
      "Michele Bedard is an accomplished technology and business leader with over 20 years of experience driving transformational change. As Director of Technology Operations at BCLC, she leads proactive IT operations, drives platform performance, and oversees delivery of critical technology solutions.",
      "Michele is known for building trust, empowering teams, and challenging the status quo. A strategic and outcome-focused leader, she brings systems thinking, pragmatism, and clarity to help teams drive improvements in operational excellence, customer experience, and business agility.",
    ],
  },
  {
    name: "Ravi Sharma",
    role: "Treasurer",
    bio: [
      "With an honours degree in Business and Finance from London South Bank University, Ravi began his career in software development in the UK, working his way up to executive positions in IT with multi-billion organisations in the UK and Canada. Having established a reputation for reengineering businesses through technology, Ravi then moved to assisting organisations via consulting engagements.",
      "In 2005 Ravi co-founded R2 Gaming and has subsequently seeded and grown two further start-ups, as well as the acquisition in 2016 of Lang's Ventures in Kamloops. Today the R2 Organisation consists of four companies serving customers in all 9 Canadian provinces. Trained in Steven Covey and Dale Carnegie principles, Ravi's goal is to help people, organisations, and communities grow through nurturing and empowerment.",
    ],
  },
  {
    name: "Kuldeep Bath",
    role: "Secretary",
    bio: [
      "Kuldeep Bath has over 30 years of experience in Information Technology across both public and private sector organizations. As a lifelong Kamloops resident and Thompson Rivers University alum, Kuldeep spent much of his career at BC Lottery Corporation and co-founded a local private technology startup.",
      "In 2018, Kuldeep became the IT Manager at the City of Kamloops, where he focuses on providing strategic leadership, coaching, and mentoring to staff, users, and executives to ensure IT goals align with organizational goals. Kuldeep also serves as a summer sessional instructor for the Strategic MIS course in TRU's MBA program, regularly helping others establish and grow their careers.",
    ],
  },
  {
    name: "John O'Fee",
    role: "Director",
    bio: [
      "John is a lawyer, Associate Teaching Professor with Thompson Rivers University, Panel Chair for the BC Health Professions Review Board, and also serves as an elected Kamloops-Thompson School Trustee.",
    ],
  },
  {
    name: "Heidi Milovick",
    role: "Director",
    bio: [
      "Heidi is the Executive Director of Student Services and Administration at Thompson Rivers University, where she provides strategic leadership across student-facing operations, service delivery, and institutional administration. With deep experience in university systems, cross-functional coordination, and student success initiatives, Heidi brings a strong operational lens to CIBA's board.",
      "Her leadership helps strengthen the alignment between TRU, student employability, innovation pathways, and the continued growth of the TRU Generator ecosystem.",
    ],
  },
  {
    name: "Greg Anderson",
    role: "Director",
    bio: [
      "Greg is a Professor and Dean of the Faculty of Science at Thompson Rivers University. His research focuses on exercise and occupational physiology, exploring the health, resilience, and well-being of athletes, first responders, and public safety professionals across diverse ages and abilities.",
      "As a respected academic leader and researcher, Greg brings valuable expertise in applied science, interdisciplinary collaboration, and research-driven innovation that strongly supports CIBA's work in AI, commercialization, and university-industry partnerships.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow eyebrow--light">About us</p>
            <h1>A decade of momentum</h1>
            <p className="page-head__sub">
              Empowering startups, growth-stage, and scaling companies across the Central
              Interior since 2012.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container about-intro reveal">
            <p>
              For over a decade, <strong>Central Interior Business Accelerator (CIBA)</strong>{" "}
              has empowered startups, growth-stage, and scaling companies to thrive and
              transform. Since 2012, we&apos;ve supported over 100 ventures, creating 150+
              jobs, generating over $40M+ in revenue, and securing around $10M in new
              investment. Our one-on-one mentorship has guided more than 300 entrepreneurs
              on their journey to success.
            </p>
            <p>
              Our programs foster valuable connections with seasoned mentors, advisors, and
              industry experts. We deliver customized business training in strategy, finance,
              market validation, marketing, technology integration, and communications. Our
              growing network provides access to entrepreneurs, investors, potential
              partners, and industry connections.
            </p>
            <p>
              We&apos;re dedicated to nurturing the business ecosystem across the
              Thompson-Nicola Regional District and South Cariboo.
            </p>
            <div className="tru-callout">
              <h3>Powering the TRU Generator</h3>
              <p>
                We also power the TRU Generator, the on-campus accelerator at Thompson Rivers
                University, where we fuel innovation by streamlining pathways to research and
                commercialization for industry, students, and faculty at TRU.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--cream" id="team">
          <div className="container">
            <p className="eyebrow">Our team</p>
            <h2>The people behind CIBA</h2>

            <div className="team-exec reveal">
              <Avatar name={EXEC.name} photo={teamPhoto(EXEC.name)} className="avatar--lg" />
              <div className="team-exec__body">
                <h3>{EXEC.name}</h3>
                <span className="team-role">{EXEC.role}</span>
                {EXEC.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <p className="team-governance reveal">
              Central Interior Business Accelerator Society is governed by a board
              of&nbsp;directors.
            </p>

            <div className="team-grid">
              {BOARD.map((m, i) => (
                <TeamCard key={m.name} {...m} photo={teamPhoto(m.name)} delay={(i % 2) * 100} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
