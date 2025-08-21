import axiosInstance from "../axios/axiosInstance";

export interface TokenCreateRequest {
    name: string;
    scopes: string[];
}

export interface TokenCreateResponse {
    token: string;
    note: string;
}

export interface Token {
    id: string;
    name: string;
    lastUsed: string;
    createdAt: string;
    scopes: string[];
}

class TokenService {
    private baseUrl = '/git/tokens';

    async createToken(request: TokenCreateRequest): Promise<TokenCreateResponse> {
        console.log('Creating token with request:', request);

        const response = await axiosInstance.post<TokenCreateResponse>(
            this.baseUrl,
            request.name
        );

        console.log('Token created:', response.data);
        return response.data;
    }

    async listTokens(): Promise<Token[]> {
        const response = await axiosInstance.get<Token[]>(this.baseUrl);
        return response.data;
    }

    async revokeToken(tokenId: string): Promise<void> {
        await axiosInstance.delete(`${this.baseUrl}/${tokenId}`);
    }

    // Helper method to convert scopes array to string format expected by backend
    formatScopes(scopes: string[]): string {
        return scopes.map(scope => {
            // Add read/write permissions based on scope
            if (scope === 'repo') {
                return 'repo:read,repo:write';
            }
            if (scope === 'workflow') {
                return 'workflow:read,workflow:write';
            }
            // Add more scope formatting as needed
            return scope;
        }).join(',');
    }
}

export const tokenService = new TokenService();
