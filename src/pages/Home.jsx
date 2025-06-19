import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-yellow-50 text-black">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Manage Your Tasks, Collaborate with Ease</h1>
        <p className="text-lg mb-8 max-w-xl">
          A smart task management app to assign, track, and complete tasks efficiently with real-time updates.
        </p>
        <div className="space-x-4">
          <NavLink
            to="/signup"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md shadow"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/login"
            className="border border-yellow-500 hover:bg-yellow-100 text-black font-semibold px-6 py-2 rounded-md"
          >
            Login
          </NavLink>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Why Use TaskApp?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Assign Tasks Easily</h3>
              <p>Create tasks and assign them to your team with deadlines and priority levels.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Get Real-Time Notifications</h3>
              <p>Stay updated with instant alerts when tasks are created or updated.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p>Change task status and keep your work organized from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} TaskApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
