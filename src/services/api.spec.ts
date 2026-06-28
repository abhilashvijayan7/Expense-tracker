import { api } from './api';

describe('FinTrack Axios API Service Layer Unit Tests', () => {
  let mockStorage: Record<string, string> = {};

  beforeAll(() => {
    // Intercept localStorage calls cleanly without modifying read-only globals
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => mockStorage[key] || null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
      mockStorage[key] = value.toString();
    });
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key: string) => {
      delete mockStorage[key];
    });
    jest.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
      mockStorage = {};
    });
  });

  beforeEach(() => {
    localStorage.clear();
    
    // Seed isolation metrics inside the storage container mock
    localStorage.setItem('fintrack_users', JSON.stringify([
      { id: "user_101", name: "John Doe", email: "john@company.com", password: "password123" }
    ]));
    localStorage.setItem('fintrack_ledger_data', JSON.stringify([
      { id: "t_1", userId: "user_101", name: "Monthly Salary - Corp Q4", amount: 6000.00, category: "Income", date: "2026-06-20" }
    ]));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should validate sign-in profile parameters successfully via POST /auth/login', async () => {
    const response = await api.post('/auth/login', {
      email: 'john@company.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.data.user.name).toBe('John Doe');
    expect(response.data.token).toBe('jwt-bearer-user_101');
  });

  it('should reject invalid credentials with status code 401', async () => {
    const response = await api.post('/auth/login', {
      email: 'john@company.com',
      password: 'wrongpassword'
    });

    expect(response.status).toBe(401);
    expect(response.data).toBeNull();
  });

  it('should register a new user profile and push entries to storage via POST /auth/register', async () => {
    const response = await api.post('/auth/register', {
      name: 'Abhilash M',
      email: 'abhilash@company.com',
      password: 'newsecurepassword'
    });

    expect(response.status).toBe(201);
    expect(response.data.user.email).toBe('abhilash@company.com');
  });

  it('should fetch isolated user transactions cleanly via GET /transactions', async () => {
    const response = await api.get('/transactions?userId=user_101');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data[0].name).toBe('Monthly Salary - Corp Q4');
  });

  it('should insert a fresh record payload seamlessly via POST /transactions', async () => {
    const recordPayload = {
      id: 't_test_99',
      userId: 'user_101',
      name: 'Aesthetic Studio Gear',
      amount: -450.00,
      category: 'Other',
      date: '2026-06-28'
    };

    const response = await api.post('/transactions', recordPayload);

    expect(response.status).toBe(201);
    expect(response.data.name).toBe('Aesthetic Studio Gear');
  });

  it('should remove a specific ledger row key seamlessly via DELETE /transactions/:id', async () => {
    const response = await api.delete('/transactions/t_1');

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });
});