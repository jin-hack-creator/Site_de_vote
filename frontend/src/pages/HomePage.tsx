import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToCandidates = () => {
    navigate('/candidats');
  };

  const title = "Le Grand Concours de Vote";
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="home-hero">
            <Container className="text-center">
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="display-3"
              >
                {title.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="lead mt-3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
              >
                Votre voix compte. Choisissez votre favori et propulsez-le vers la victoire.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <Button
                  variant="light"
                  size="lg"
                  className="cta-button mt-4"
                  onClick={handleNavigateToCandidates}
                >
                  Voir les candidats <ArrowRight className="ms-2" />
                </Button>
              </motion.div>
            </Container>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HomePage;

