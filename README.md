# 🔥 INDVA - Indian Streetwear E-Commerce App

<p align="center">
  <strong>Where Indian Heritage Meets Street Culture</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.73.4-61DAFB?style=flat-square&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=flat-square" alt="Platform" />
</p>

---

## 📱 About

**INDVA** is a mobile e-commerce app for an Indian streetwear brand, built with React Native and TypeScript. The app combines rich cultural motifs (mandalas, chakras, rangoli, Sanskrit) with modern urban fashion to create a unique shopping experience.

## ✨ Features

- **Product Catalog** — Browse products by category with search & filter
- **Product Details** — Full product view with size/color selection, ratings, and reviews
- **Shopping Cart** — Add/remove items, update quantities, order summary with free shipping threshold
- **Wishlist** — Save favorite items for later
- **Brand Theming** — Custom saffron & navy color palette inspired by Indian heritage
- **Accessibility** — Full accessibilityRole, accessibilityLabel, and accessibilityState support
- **Responsive Design** — Adapts to various screen sizes

## 🏗️ Architecture

```
INDVA/
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ProductCard.tsx
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   └── CartScreen.tsx
│   ├── navigation/        # React Navigation setup
│   │   └── AppNavigator.tsx
│   ├── context/           # State management (Context + useReducer)
│   │   └── CartContext.tsx
│   ├── constants/         # Theme, mock data, types
│   │   ├── theme.ts
│   │   └── data.ts
│   ├── hooks/             # Custom hooks
│   ├── services/          # API service layer
│   ├── utils/             # Helper functions
│   └── assets/            # Images, fonts
├── App.tsx                # Root component
├── index.js               # Entry point
└── package.json
```

## 🎨 Brand Colors

| Color         | Hex       | Usage                    |
| ------------- | --------- | ------------------------ |
| Saffron       | `#FF6B35` | Primary / CTAs           |
| Deep Navy     | `#1A1A2E` | Secondary / Backgrounds  |
| Turmeric Gold | `#F7D716` | Accents / Ratings        |
| Off White     | `#F8F9FA` | Cards / Light BG         |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (iOS) / Android Studio (Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/INDVA.git
cd INDVA

# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🛠️ Tech Stack

- **Framework**: React Native 0.73
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Context API + useReducer
- **Animations**: React Native Reanimated
- **Icons**: React Native Vector Icons

## 📋 Roadmap

- [ ] User authentication (Firebase Auth)
- [ ] Backend API integration (Node.js/Express)
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Push notifications
- [ ] Order tracking
- [ ] Product reviews & ratings
- [ ] AR try-on feature
- [ ] Internationalization (Hindi, Tamil, Telugu)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



---

<p align="center">
  <strong>INDVA</strong> — Redefining Indian Street Fashion 🇮🇳
</p>
