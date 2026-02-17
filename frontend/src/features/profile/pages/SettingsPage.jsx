import React from "react";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import AddressList from "../components/AddressList";

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-8">
      <ProfileForm />
      <PasswordForm />
      <AddressList />
    </main>
  );
}
