import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CreateEntryPage from "./pages/CreateEntryPage";
import EditEntryPage from "./pages/EditEntryPage";
import EntryDetailPage from "./pages/EntryDetailPage";
import TagsPage from "./pages/TagsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import JournalEntryPage from "./pages/JournalEntryPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container mt-4">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/journal-entries" component={JournalEntryPage} />
              <ProtectedRoute
                path="/entries/create"
                component={CreateEntryPage}
              />
              <ProtectedRoute
                path="/entries/edit/:id"
                component={EditEntryPage}
              />
              <Route path="/entries/:id" component={EntryDetailPage} />
              <Route path="/tags" component={TagsPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <ProtectedRoute path="/profile" component={ProfilePage} />
              <Route path="/reset-password" component={ResetPasswordPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
