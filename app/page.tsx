"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, BookOpen, Award, Users, BarChart2, Check, Mail, Lock, User, Eye, EyeOff, Phone, Building } from "lucide-react"
import axios from "axios"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("student")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password
      })

      if (response.status === 200) {
        document.cookie = `authToken=${response.data.token}; path=/`
        localStorage.setItem('authToken', response.data.token);
        console.log()
        const userRole = response.data.role // Assuming your API returns the user's role
        console.log(localStorage.getItem('authToken'));

        if (userRole === 'student') {
          router.push("/student/dashboard")
        } else if (userRole === 'instructor') {
          router.push("/instructor/dashboard")
        } else if (userRole === 'admin') {
          router.push("/admin/panel")
        } else {
          // Default fallback if role is undefined or another value
          router.push("/")
        }
      }
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", {
        user_name: name,
        email,
        password,
        confirm_password: confirmPassword,
        role,
        phone_number: phoneNumber,
        department
      })

      if (response.status === 201) {
        setActiveTab("login")
        alert("Signup successful")
        setError("")
      }
    } catch (err) {
      setError("Error during signup. Please try again.")
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-900 text-xl font-bold">EduQuest</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="hidden md:block">
            <button
              onClick={() => setActiveTab("login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Auth */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Hero Content */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Learn, Achieve, <span className="text-blue-600">Succeed</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The ultimate learning management system designed to make education engaging, effective, and enjoyable
                for students and instructors alike.
              </p>
              <div className="space-y-4 mb-8">
                <FeatureItem text="Gamified learning experience for students" />
                <FeatureItem text="Professional tools for instructors" />
                <FeatureItem text="Comprehensive analytics and reporting" />
                <FeatureItem text="Seamless content management" />
              </div>
              <div className="hidden md:block lg:hidden">
                <button
                  onClick={() => setActiveTab("login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors inline-flex items-center"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right Column - Auth Form */}
            <motion.div
              className="lg:w-1/2 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      activeTab === "login"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      activeTab === "signup"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === "login" ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back!</h2>
                         <form className="space-y-6" onSubmit={handleLogin}>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your email"
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <div className="relative">
                              <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your password"
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                              </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                              Forgot password?
                            </a>
                          </div>
                          {error && <p className="text-red-500 text-sm">{error}</p>}
                          <div>
                            <button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                        <div className="mt-6 text-center">
                          <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button
                              onClick={() => setActiveTab("signup")}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Sign up
                            </button>
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
                        <form className="space-y-4" onSubmit={handleSignup}>
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your name"
                                required
                              />
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                id="signup-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your email"
                                required
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                id="phone-number"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your phone number"
                                required
                              />
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                              Department
                            </label>
                            <div className="relative">
                              <input
                                id="department"
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter your department"
                                required
                              />
                              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <div className="relative">
                              <input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Create a password"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Confirm your password"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                              I am a
                            </label>
                            <select
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                              required
                            >
                              <option value="student">Student</option>
                              <option value="instructor">Instructor</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                              I agree to the{" "}
                              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          {error && <p className="text-red-500 text-sm">{error}</p>}
                          <div>
                            <button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                            >
                              Create Account
                            </button>
                          </div>
                        </form>
                        <div className="mt-6 text-center">
                          <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                              onClick={() => setActiveTab("login")}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Sign in
                            </button>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers specialized tools for both students and educators, creating an engaging and effective
              learning environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-blue-600" />}
              title="Interactive Learning"
              description="Engage with content through gamified experiences that make learning fun and effective."
            />
            <FeatureCard
              icon={<Award className="w-10 h-10 text-blue-600" />}
              title="Achievement System"
              description="Track progress and earn rewards to stay motivated throughout your learning journey."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-blue-600" />}
              title="Collaborative Tools"
              description="Work together with peers and instructors through integrated communication features."
            />
            <FeatureCard
              icon={<BarChart2 className="w-10 h-10 text-blue-600" />}
              title="Advanced Analytics"
              description="Get insights into performance and learning patterns to optimize your education."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your learning experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students and educators who are already using EduQuest to achieve their educational goals.
          </p>
          <button
            onClick={() => setActiveTab("signup")}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors inline-flex items-center"
          >
            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl font-bold">EduQuest</span>
              </div>
              <p className="mb-4">Making education engaging, effective, and enjoyable for everyone.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 EduQuest. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Item Component
function FeatureItem({ text }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
        <Check className="w-4 h-4 text-blue-600" />
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-50 p-6 rounded-xl border border-gray-200"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}