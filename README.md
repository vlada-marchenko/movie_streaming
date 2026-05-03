# StreamVibe 🎬
 
A modern, responsive movie and TV show streaming platform built with Next.js, featuring real-time data from The Movie Database (TMDB) API. Browse trending content, explore genres, and discover your next favorite film or series.
 
## ✨ Features
 
- **Dynamic Content Browsing**: Explore trending movies and TV shows with real-time data from TMDB API
- **Genre-Based Navigation**: Browse content by genre with visual preview cards
- **Detailed Item Pages**: View comprehensive information including cast, crew, ratings, and runtime
- **Responsive Hero Carousel**: Swipeable hero section featuring popular content
- **Mobile-First Design**: Fully responsive layout optimized for all screen sizes (375px, 768px, 1440px, 1920px)
- **Subscription Plans**: Interactive subscription page with pricing tiers
- **FAQ Section**: Custom-built accordion component for user support
- **Free Trial**: Trial signup component with TMDB poster grid background

## 🛠️ Tech Stack
 
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: CSS Modules
- **Form Handling**: Formik + Yup validation
- **Carousels & Swipe**: react-swipeable
- **UI Components**: Custom components + Radix UI Accordion
- **API**: The Movie Database (TMDB) API

 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js 18.x or higher
- npm or yarn
### Installation
 
1. Clone the repository:
```bash
git clone https://github.com/vlada-marchenko/movie_streaming.git
cd movie_streaming
```
 
2. Install dependencies:
```bash
npm install
```
 
3. Create a `.env.local` file in the root directory and add your TMDB API key:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```
 
4. Run the development server:
```bash
npm run dev
```
 
5. Open [http://localhost:3000](http://localhost:3000) in your browser
## 🎯 Key Implementation Details
 
### Data Fetching Architecture
- **Route-level fetching**: Data is fetched once at the page level and passed down as props to avoid duplicate API calls
- **TanStack Query**: Implements caching, automatic refetching, and loading states
- **Prop-based data flow**: The `ItemContent` component receives movie/show data as props from parent route
### Responsive Design
- Mobile-first approach with breakpoints at 375px, 768px, 1440px, and 1920px
- Container constraints: 1224px at 1440px viewport, 1644px at 1920px
- CSS Modules for scoped styling
- Proper z-index management for fixed mobile navigation
### Component Architecture
- Separate components for Movies (`GenreSectionMovies`) and TV Shows (`GenreSectionShows`)
- Shared `ItemContent` component for detail pages
- Reusable `GenreCard` with dynamic media type support
- Custom FAQ accordion (migrated from Radix UI for customization)
 
## 🌐 Deployment
 
The application is deployed on Vercel. Any push to the main branch triggers an automatic deployment.
 
## 🎨 Design Decisions
 
- **CSS Modules**: Chosen over styled-components for better performance and simpler setup
- **App Router**: Utilized Next.js 14+ App Router for improved routing and layouts
- **No External UI Library**: Custom components built from scratch for full control and learning
- **Mobile Navigation**: Fixed positioning with careful z-index management

## 🔮 Future Enhancements
 
- Search functionality with full movie/TV show catalog
- Genre filtering and navigation

 
## 👤 Author
 
**Vlada Marchenko**
- LinkedIn: [linkedin.com/in/vlada-marchenko](https://www.linkedin.com/in/vlada-marchenko)
- GitHub: [@vlada-marchenko](https://github.com/vlada-marchenko)
## 🙏 Acknowledgments
 
- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built as a portfolio project to demonstrate modern React/Next.js development skills