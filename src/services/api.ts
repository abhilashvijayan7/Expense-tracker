import axios from 'axios';

// Create the shared configured Axios client instance
export const api = axios.create({
  baseURL: 'https://api.fintrack-ledger.local/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ==========================================================================
   MOCK SEED DATABASE: Runs only on the client side to initialize data rows
   ========================================================================== */
const seedDatabase = () => {
  if (typeof window === 'undefined') return;

  // 1. Seed global users registration table if empty
  if (!localStorage.getItem('fintrack_users')) {
    localStorage.setItem('fintrack_users', JSON.stringify([
      { id: "user_101", name: "John Doe", email: "john@company.com", password: "password123" }
    ]));
  }

  // 2. Seed initial isolated transactions matching your UI executive screenshot metrics ($6,000 / $1,750)
  if (!localStorage.getItem('fintrack_ledger_data')) {
    localStorage.setItem('fintrack_ledger_data', JSON.stringify([
      { id: "t_1", userId: "user_101", name: "Monthly Salary - Corp Q4", amount: 6000.00, category: "Income", date: "2026-06-20" },
      { id: "t_2", userId: "user_101", name: "Supermarket - Whole Foods Market", amount: -1750.00, category: "Groceries", date: "2026-06-22" }
    ]));
  }
};
seedDatabase();

/* ==========================================================================
   AXIOS INTERCEPTORS: Catches outward HTTP calls and routes them to Storage
   ========================================================================== */
api.interceptors.request.use(async (config) => {
  const users = JSON.parse(localStorage.getItem('fintrack_users') || '[]');
  const records = JSON.parse(localStorage.getItem('fintrack_ledger_data') || '[]');

  // Intercepting Auth Login Pipeline
  if (config.url === '/auth/login' && config.method === 'post') {
    const { email, password } = config.data;
    const match = users.find((u: any) => u.email === email && u.password === password);

    config.adapter = () => Promise.resolve({
      data: match ? { user: { id: match.id, name: match.name, email: match.email }, token: `jwt-bearer-${match.id}` } : null,
      status: match ? 200 : 401,
      statusText: match ? 'OK' : 'Unauthorized',
      headers: {},
      config,
    });
  }

  // Intercepting User Registration Pipeline
  if (config.url === '/auth/register' && config.method === 'post') {
    const newUser = { id: `user_${Date.now()}`, ...config.data };
    users.push(newUser);
    localStorage.setItem('fintrack_users', JSON.stringify(users));

    config.adapter = () => Promise.resolve({
      data: { user: { id: newUser.id, name: newUser.name, email: newUser.email }, token: `jwt-bearer-${newUser.id}` },
      status: 201,
      statusText: 'Created',
      headers: {},
      config,
    });
  }

  // Intercepting GET Ledger Call (Filters rows to protect data containment per user)
  if (config.url?.startsWith('/transactions') && config.method === 'get') {
    const urlParams = new URLSearchParams(config.url.split('?')[1]);
    const targetUid = urlParams.get('userId');
    const filteredRows = records.filter((r: any) => r.userId === targetUid);

    config.adapter = () => Promise.resolve({
      data: filteredRows,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  }

  // Intercepting POST New Ledger Item Call
  if (config.url === '/transactions' && config.method === 'post') {
    const freshRecord = config.data;
    records.unshift(freshRecord);
    localStorage.setItem('fintrack_ledger_data', JSON.stringify(records));

    config.adapter = () => Promise.resolve({
      data: freshRecord,
      status: 201,
      statusText: 'Created',
      headers: {},
      config,
    });
  }

  // Intercepting DELETE Ledger Item Row Call
  if (config.url?.startsWith('/transactions/') && config.method === 'delete') {
    const rowId = config.url.split('/').pop();
    const updatedRows = records.filter((r: any) => r.id !== rowId);
    localStorage.setItem('fintrack_ledger_data', JSON.stringify(updatedRows));

    config.adapter = () => Promise.resolve({
      data: { id: rowId, success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  }

  return config;
});