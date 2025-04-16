<script>
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Redirect to dashboard if already logged in
  $: if ($authStore.user) {
    goto('/dashboard');
  }

  const features = [
    {
      icon: '📅',
      title: 'Smart Task Management',
      description: 'Organize tasks with priorities, due dates, and categories'
    },
    {
      icon: '⏰',
      title: 'Auto-Rescheduling',
      description: 'Overdue tasks automatically move to the next business day'
    },
    {
      icon: '📍',
      title: 'Location Reminders',
      description: 'Get notified when you reach specific locations'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Beautiful dark and light themes for any preference'
    },
    {
      icon: '🗣️',
      title: 'Voice Input',
      description: 'Add tasks quickly using your voice'
    },
    {
      icon: '📊',
      title: 'Productivity Stats',
      description: 'Track your completion rates and progress'
    }
  ];
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
  <!-- Navigation -->
  <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
      DailyPlanner
    </div>
    <div class="flex items-center space-x-4">
      <a 
        href="/login" 
        class="px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        Sign In
      </a>
      <a 
        href="/signup" 
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="container mx-auto px-6 py-16 text-center">
    <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Organize Your Day, <span class="text-blue-600 dark:text-blue-400">Boost Your Productivity</span>
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
      The ultimate daily planner that helps you stay on top of your tasks, appointments, and goals with intelligent features.
    </p>
    <div class="flex justify-center space-x-4">
      <a 
        href="/signup" 
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
      >
        Start Planning - It's Free
      </a>
      <a 
        href="#features" 
        class="px-8 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
      >
        Learn More
      </a>
    </div>
  </section>

  <!-- App Preview -->
  <div class="container mx-auto px-6 py-12 flex justify-center">
    <div class="relative w-full max-w-4xl h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="absolute top-4 left-4 flex space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div class="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
        <div class="text-center p-8">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="text-xl font-medium mb-2">Daily Planner Dashboard</h3>
          <p class="max-w-md mx-auto">Experience a clean, intuitive interface designed for maximum productivity.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <section id="features" class="container mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
      Powerful Features
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
          <div class="text-4xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
          <p class="text-gray-600 dark:text-gray-300">{feature.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Testimonials -->
  <section class="bg-blue-50 dark:bg-gray-700 py-16">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        What Our Users Say
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold mr-4">
              JD
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">John D.</h4>
              <div class="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "The auto-rescheduling feature has been a game-changer for my productivity. No more stressing about overdue tasks!"
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold mr-4">
              SM
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Sarah M.</h4>
              <div class="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "I love how the location reminders help me remember to do errands when I'm actually near the stores."
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 font-bold mr-4">
              AT
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Alex T.</h4>
              <div class="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "Finally a planner that understands my workflow. The space categorization helps me separate work and personal tasks."
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-6 py-16 text-center">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
      Ready to Transform Your Productivity?
    </h2>
    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
      Join thousands of users who are getting more done with DailyPlanner.
    </p>
    <a 
      href="/signup" 
      class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
    >
      Get Started for Free
    </a>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 md:mb-0">
          DailyPlanner
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Terms</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</a>
        </div>
      </div>
      <div class="mt-4 text-center md:text-left text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} DailyPlanner. All rights reserved.
      </div>
    </div>
  </footer>
</div>

<style>
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }
</style>