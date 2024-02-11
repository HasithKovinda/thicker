# Thicker: A Tour-Based Web Application

## Features

- View Tour Packages: Users can browse through a wide range of tour packages offered by the platform.
- Filtering: Thicker allows users to filter tour packages based on various criteria such as country, duration, price, etc.
- Secure Authentication: Utilizing NextAuth, Thicker ensures secure user authentication for seamless login and signUp processes.
- User Dashboard: Users have access to a personalized dashboard where they can manage their profile, view purchase history, download invoices, and give ratings for purchased tours.
- Booking Tours: Users can book tours directly from the tour details page, making the process quick and convenient.
- Interactive Map: Tour details pages feature an interactive map powered by React Leaflet, allowing users to visualize tour locations.
- Smooth Animations: Lottie is employed to enhance user experience with delightful animations throughout the application.
- Payment Integration: Thicker supports secure payments via Stripe, enabling users to complete their bookings hassle-free.
- Profile Customization: Users can update their name, email, upload profile pictures, and reset passwords from their dashboard.

## Technology Stack

- Next.js App Router: Next.js provides server-side rendering and easy routing for seamless navigation between pages.
- TypeScript: TypeScript adds static typing to JavaScript, enhancing code quality and developer productivity.
- Vanilla CSS: Vanilla CSS is used for styling with css modules in application components, ensuring a lightweight and customizable design.
- React Query: Utilized for managing asynchronous data fetching and caching in React applications, React Query enhances performance by providing efficient data handling solutions.
- React Hook Form: React Hook Form is utilized for building flexible and efficient forms.
- Zod: Zod is employed for schema validation, ensuring data integrity throughout the application.
- MongoDB: MongoDB serves as the database management system for storing user data, tour information, and more.
- Stripe: Stripe integration and webhook enables secure and seamless payment processing.
- Lottie: Lottie is used to incorporate engaging animations into the user interface.
- NextAuth: NextAuth provides authentication services for user login and signup processes and protected routes.
- React Leaflet: React Leaflet powers the interactive maps displayed on tour details pages.
- Cloudinary: Cloudinary is utilized for image storage.
- React PDF: React PDF is employed for generating and downloading invoices in PDF format.

## Getting Started

To run Thicker locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables for MongoDB, Stripe,next auth,redirect urls and Cloudinary.
4. Run the application using `npm run dev`.
5. Access Thicker in your browser at `http://localhost:3000`.
