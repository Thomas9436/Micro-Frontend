import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Navbar.css';

function Navbar() {
  const [notifications, setNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Écouter l'événement game:joined du Lobby pour incrémenter les notifications
    const unsubGameJoined = eventBus.on('game:joined', () => {
      setNotifications(prev => prev + 1);
    });

    // Écouter l'événement cart:updated du Cart pour mettre à jour le compte des articles
    const unsubCartUpdated = eventBus.on('cart:updated', (cartData) => {
      setCartCount(cartData.count);
    });

    // Cleanup : se désabonner des deux événements au démontage
    return () => {
      unsubGameJoined();
      unsubCartUpdated();
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">PixelArena</span>
        <span className="mfe-badge">MFE</span>
      </div>

      <div className="navbar-menu">
        <button className="nav-button">Lobby</button>
        <button className="nav-button">Boutique</button>
      </div>

      <div className="navbar-user">
        <span className="username">Joueur_42</span>

        {/* Icone Panier */}
        <button className="nav-button cart-btn">
          🛒
          {cartCount > 0 && <span className="badge cart-badge">{cartCount}</span>}
        </button>

        {/* Icone Notifications */}
        <button className="nav-button notification-btn">
          🔔
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
