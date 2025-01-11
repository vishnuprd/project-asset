Asset Management React Application

Overview

This React application is designed to manage and track various assets within an organization. It provides the ability to add, view, and manage assets such as laptops, desktops, printers, projectors, dongles, phones, tablets, and scrap items. Additionally, the application maintains a list of employees who are associated with these assets.

Features

Asset Categories: Manage assets categorized as:

Laptops

Desktops

Printers

Projectors

Dongles

Phones

Tablets

Scrap Items

Employee Management: Maintain a list of employees and their assigned assets.

CRUD Operations:

Add new assets and employees.

View all assets and employees.

Update asset or employee details.

Remove assets or employees.

Search and Filter: Quickly find assets or employees using search and filter functionality.

Installation and Setup

Clone the Repository:

https://github.com/vishnuprd/project-asset.git

Navigate to the Project Directory:

cd asset-management-react

Install Dependencies:

npm install

Start the Application:

npm start

The application will run on http://localhost:3000 by default.

Application Structure

Asset Categories

Laptops:

Track details such as brand, model, serial number, purchase date, and assigned employee.

Desktops:

Manage specifications, location, and user details.

Scrap Items:

Maintain a list of scrapped or decommissioned items for recordkeeping.

Employee Management

Employee Name

Employee ID

Department

Assigned Assets

Usage Guide

Add Assets:



Click "Add New Asset" and fill in the required details.

View Assets:

Access the category to view all listed items.

Use the search bar to filter items based on criteria.

Update Asset Details:

Select an asset from the list and click "Edit."

Update the necessary information and save changes.

Delete Assets:

Select an asset and click "Delete" to remove it from the system.

Manage Employees:

Navigate to the "Employees" section.

Add, update, or remove employee records.

Assign or unassign assets to employees.

Technical Stack

Frontend: React, Redux (for state management)

Backend: Node.js, Express.js

Database: MongoDB (or any preferred database)

Styling: CSS, TailwindCSS (or Daisy UI)

Authentication: JWT-based authentication 

Future Enhancements

Reporting: Generate reports on asset usage and allocation.

Notifications: Alert admins when assets are due for maintenance or reassignment.

Bulk Uploads: Allow batch imports of assets and employees.

Audit Logs: Track changes to asset and employee records.

Contribution Guidelines

Fork the repository.

Create a feature branch:

git checkout -b feature-name

Commit changes:

git commit -m "Add new feature"

Push to your fork:

git push origin feature-name

Create a pull request.