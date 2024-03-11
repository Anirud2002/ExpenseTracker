import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../interfaces/expense-modal';
import { catchError, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient
  ) { }

  async getYears(): Promise<string[]> {
    const request = this.http.get<string[]>(`${environment.apiUrl}/api/expense/years`)
    .pipe(
      catchError(_ => of(null))
    );

    const response = await lastValueFrom(request);

    if(!response) {
      // TODO: Handle the error like show a Toast or something
    }

    return response;
  }

  async getExpenses(year: string, month: string): Promise<Expense> {
    const request = this.http.get<Expense>(`${environment.apiUrl}/api/expense/get?year=${year}&month=${month}`)
    .pipe(
      catchError(_ => of(null))
    );

    const response = await lastValueFrom(request);

    if(!response) {
      // TODO: Handle the error like show a Toast or something
    }

    return response;
  }
}
