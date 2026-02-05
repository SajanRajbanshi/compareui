"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./landing.module.css";

export default function LandingPage() {
  const libraries = [
    "Material UI",
    "Chakra UI",
    "Ant Design",
    "Shadcn UI",
    "Aceternity UI",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>

      {/* Curved Stream Animation */}
      <div className={styles.streamContainer}>
        {["Material UI", "Chakra UI", "Ant Design", "Shadcn UI", "Aceternity UI"].map((lib, i) => (
          <div key={i} className={styles.streamItem} style={{ animationDelay: `${i * 4}s` }}>
            {lib}
          </div>
        ))}
      </div>

      <main className={styles.main}>
        
        {/* Hero Section */}
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className={styles.title}>
              CompareUI
            </h1>
            <p className={styles.subtitle}>
              Can&apos;t decide which UI to use? <br className="hidden md:block" />
              <span className={styles.highlight}>We have got some for you here.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link 
              href="/home" 
              className={styles.ctaButton}
            >
              LETS COMPARE
              <ArrowRight className={styles.icon} />
            </Link>
          </motion.div>
        </div>


      </main>
    </div>
  );
}

