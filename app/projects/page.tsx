import React from 'react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Project 1</h2>
          <p>Description of project 1</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Project 2</h2>
          <p>Description of project 2</p>
        </div>
      </div>
    </div>
  );
}