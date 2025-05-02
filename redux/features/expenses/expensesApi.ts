import { apiSlice } from "../api/apiSlice";

/**
 * expensesApi
 * Provides endpoints for managing expenses, including creating, retrieving, editing, and deleting expenses.
 */
export const expensesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new expense.
     * @param {object} data - The expense data to create.
     */
    createExpense: builder.mutation({
      query: (data) => ({
        url: "create-expense",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Retrieves a specific expense by ID.
     * @param {string} id - The ID of the expense to retrieve.
     */
    getExpense: builder.query({
      query: ({ id }) => ({
        url: `get-expense/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Retrieves all expenses.
     */
    getAllExpenses: builder.query({
      query: () => ({
        url: "get-expenses",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Retrieves expenses associated with the current user.
     */
    getMyExpenses: builder.query({
      query: () => ({
        url: "my-expenses",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Edits an existing expense.
     * @param {string} id - The ID of the expense to edit.
     * @param {object} data - The updated expense data.
     */
    editExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-expense/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Deletes an expense by ID.
     * @param {string} id - The ID of the expense to delete.
     */
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetExpenseQuery,
  useGetAllExpensesQuery,
  useGetMyExpensesQuery,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
