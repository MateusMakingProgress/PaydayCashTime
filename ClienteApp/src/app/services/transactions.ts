import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsModel } from '../models/transactions.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = '/api/transactions';

  constructor(private http: HttpClient) { }

  addTransaction(transaction: TransactionsModel): Observable<TransactionsModel> {
    return this.http.post<TransactionsModel>(this.apiUrl, transaction);
  }

  getTransactions(): Observable<TransactionsModel[]> {
    return this.http.get<TransactionsModel[]>(this.apiUrl);
  }
}
