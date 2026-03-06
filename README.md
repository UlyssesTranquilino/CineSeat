# 🎬 CineSeat

CineSeat is a modern, full-stack movie ticket booking application designed for a seamless user experience. It features a responsive interface with light and dark mode support, real-time movie filtering, and a comprehensive booking flow from seat selection to payment confirmation.

---

## 📖 Background
Developed as a solution for cinema-goers, CineSeat addresses the need for a simplified, aesthetic platform to browse upcoming films, view trailers, and manage personal movie watchlists and ticket histories. The project is built for high performance, as evidenced by recent performance metrics showing a **5ms Time to First Byte (TTFB)** and zero error rates on the Vercel Edge Network.

---

## 🛠 Tech Stack

### Frontend
* **Framework**: React with TypeScript for type-safe development.
* **Styling**: Tailwind CSS for responsive, utility-first UI design.
* **State Management**: Zustand with persistence for user sessions and theme settings.
* **Routing**: React Router DOM for single-page application navigation.
* **UI Components**: Material UI (MUI) for icons, loaders (Skeletons), and interactive elements like Drawers and Modals.

### Backend & Database
* **Runtime**: Node.js with Express (via external API).
* **Database**: MongoDB (referenced through backend API calls).
* **HTTP Client**: Axios for handling API requests.

### Deployment
* **Hosting**: Vercel for frontend deployment.
* **CDN**: Vercel Global Content Delivery Network.

---

## 🚀 Key Features
* **Dynamic Theming**: Integrated Light and Dark modes that update the body class dynamically and persist in local storage.
* **Movie Discovery**: Advanced filtering by genre, interactive slick-carousels, and a real-time global search bar in the Navbar.
* **Detailed Content**: YouTube trailer embedding, cast/crew galleries, and similar movie recommendations.
* **Interactive Booking**: 
    * Dynamic showtime generation and date selection.
    * Real-time seat map with "Taken," "Available," and "Selected" status indicators.
* **Secure Checkout**: Simulated payment gateway supporting Credit/Debit Cards, GCash, PayMaya, and PayPal.
* **Personalized Dashboard**: User-specific profile management, favorite movies list, and digital tickets featuring generated QR codes.

---

## 📅 Development Roadmap

| Day | Milestone | Key Accomplishments |
| :--- | :--- | :--- |
| **1-5** | **Inception** | API discovery, Figma design, Tailwind setup, and initial database integration. |
| **6-10** | **Core UI** | Carousel implementation, genre filtering, and responsive Movie Details page. |
| **11-15** | **Content** | Cast/Crew API integration, trailer embedding, and "Similar Movies" logic. |
| **16-20** | **Booking Logic** | Showtime selection, interactive seat mapping, and global search bar. |
| **21-22** | **Finalization** | Payment gateway simulation and booking confirmation flow. |

