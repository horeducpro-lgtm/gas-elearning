/**
 * Service gérant les appels API liés à l'authentification
 */
export const login = async (credentials: { email: string; password: string }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Échec de la connexion");
    }
  
    return response.json();
  };