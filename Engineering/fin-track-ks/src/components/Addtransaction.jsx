import React, { useState } from "react";

const AddTransaction = ({onClose}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-tarnsparent bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-50">
        {/* Current Balance */}
        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          Current Balance: ₹100
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="e.g. Grocery Shopping"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              required

              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="e.g. 500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
