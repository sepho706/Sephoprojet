import React, { useState } from "react";
import "./Contact.css";
import contactData from "../data/contact.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/UNIVERSITE.png";

function Contact() {
  const { form, info, footer } = contactData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000); // Message disparaît après 3s
  };

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo Université+" className="logo" />
        <nav>
          <Link to="/" className="btn-primary">
            Accueil
          </Link>
          <Link to="/apropos" className="btn-primary">
            A propos
          </Link>
        </nav>
      </header>


      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={form.name}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={form.email}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows={5}
          placeholder={form.message}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{form.buttonText}</button>

        {sent && (
          <motion.p
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            ✅ Message envoyé avec succès !
          </motion.p>
        )}
      </form>

      <motion.div
        className="contact-info"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3>Informations</h3>
        <p><strong>📍 Adresse :</strong> {info.address}</p>
        <p><strong>📞 Téléphone :</strong> {info.phone}</p>
        <p><strong>📧 Email :</strong> {info.email}</p>
      </motion.div>

      <footer className="footer">
        <p>{footer.text}</p>
      </footer>
    </motion.div>
  );
}

export default Contact;
