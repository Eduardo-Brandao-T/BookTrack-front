import type { User, LoginResponse } from '@/types/auth'



export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // futuramente, aqui vai sua chamada HTTP com fetch ou axios
    // const response = await api.post('/auth/login', { email, password })
    // return response.data

    // Simulação:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', name: 'Eduardo', email },
          token: 'fake-jwt-token-123',
        })
      }, 800)
    })
  },

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },

  getStoredUser(): User | null {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  },
}
