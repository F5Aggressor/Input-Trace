import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService) { 
    this.configureOAuth();
  }

  private configureOAuth() {
    const authConfig: AuthConfig = {
      issuer: 'https://localhost:6000', //IDP server
      redirectUri: window.location.origin,
      clientId: 'your-client-id', //replace with client ID
      responseType: 'code',
      scope: 'openid profile email', //configure scopes, openid is required
      showDebugInformation: true,
      oidc: true,
      requireHttps: true,
      // Add PKCE support
    };

    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }


}
