import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private router: Router,
) { }

  addAuthHeader(request) {
   
    // const authHeader = this.tokenService.getToken();
    const authHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJVc2VybmFtZSI6ImRvY3RvcjIiLCJUeXBlIjoiUGFydG5lciIsIkZ1bGxOYW1lIjoiZG9jdG9yIDIiLCJFbWFpbCI6IjJAZ21haWwuY29tIiwiUGhvbmUiOiIwIiwiSXNBZ3JlZW1lbnQiOiJUcnVlIiwiSXNMb3lhbHR5UHJvZ3JhbSI6IlRydWUiLCJMaXN0SG9zcGl0YWwiOiJbe1wiSWRcIjo0NzczLFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDA3NDhcIixcIk5hbWVcIjpcIkJWIFBTIE1la29uZ1wifSx7XCJJZFwiOjQ5MjUsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDA3MVwiLFwiTmFtZVwiOlwiUEsgQlMgVHLhuqduIFRo4buLIFPGoW4gVHLDoFwifSx7XCJJZFwiOjQ5MzQsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDM2NFwiLFwiTmFtZVwiOlwiUEsgQlMgVHLGsMahbmcgTmfhu41jIFRo4bqjb1wifSx7XCJJZFwiOjQ5ODMsXCJUeXBlXCI6XCJvdGhlclwiLFwiQ29kZVwiOlwiR1MwMDczNFwiLFwiTmFtZVwiOlwiVklOQ0lCSU9cIn0se1wiSWRcIjo1MTQxLFwiVHlwZVwiOlwicGtcIixcIkNvZGVcIjpcIkdTMDA0MTNcIixcIk5hbWVcIjpcIlBLIFRoYW5oIEjDom5cIn0se1wiSWRcIjo2ODU5LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIxMDlcIixcIk5hbWVcIjpcIlBYTiBZIEtob2EgNDhcIn0se1wiSWRcIjo2OTg3LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIyMzdcIixcIk5hbWVcIjpcIlBLIEJTIMSQb8OgbiBUaOG7iyBLaW0gRHVuZ1wifV0iLCJleHAiOjE3MTk0NjE5NjQsImlzcyI6ImhjcC1nZW5lc29sdXRpb24iLCJhdWQiOiJoY3AtZ2VuZXNvbHV0aW9uIn0.hCt4oMmC8DcsAMKSFOIVKp06p2f7uLRRa8pwa34yeq4';
    if (authHeader) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ` + authHeader
        }
      });
    }
    return request;
  }

  async handleResponseError(error, request?, next?) {
    // Business error
    if (error.status === 400) {
      const errMessage = await (new Response(error.error)).text();
    }

    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    request = this.addAuthHeader(request);

    // Handle response
    return next.handle(request).pipe(catchError(error => {
      return this.handleResponseError(error, request, next);
    }));
  }
}
