import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionsModel } from '../models/transactions.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {

  private apiUrl = '/api/transactions';

  constructor(private http: HttpClient) { }

  transactions = signal<TransactionsModel[]>([]);

  searchTerm = signal('');

  newTransaction: TransactionsModel = {
    id: '',
    whoDid: '',
    description: '',
    transactionValue: 0,
    payMethod: 1,
    exitJoin: 1,
    transactionDate: new Date().toISOString().slice(0, 16),
    haveInstallments: false,
    totalInstallments: 0
  }

  filteredTransactions = computed(() => {

    const term = this.searchTerm().toLowerCase();

    if (!term) return this.transactions();

    return this.transactions().filter(t =>
      t.whoDid?.toLowerCase().includes(term) ||
      t.description?.toLowerCase().includes(term)
    );
  });

  totalExits = computed(() => {
    return this.filteredTransactions()
      .filter(t => t.exitJoin == 2)
      .reduce((sum, item) => sum + (item.transactionValue || 0), 0);
  });

  totalJoins = computed(() => {
    return this.filteredTransactions()
      .filter(t => t.exitJoin == 1)
      .reduce((sum, item) => sum + (item.transactionValue || 0), 0);
  });

  totalBalance = computed(() => this.totalJoins() - this.totalExits());

  paymentMethods: { [key: number]: string } = {
    1: 'Dinheiro',
    2: 'Débito',
    3: 'Crédito',
    4: 'Transfêrencia'
  };

  loadTransactions() {
    this.getTransactions().subscribe(data => {
      const sortedData = data.sort((a, b) =>
        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
      );
      this.transactions.set(sortedData);
    });
  }

  resetForm() {
    this.newTransaction = {
      id: '',
      whoDid: '',
      exitJoin: 1,
      description: '',
      transactionValue: 0,
      payMethod: 1,
      transactionDate: new Date().toISOString().slice(0, 16),
      totalInstallments: 0, haveInstallments: false
    };
  }

  save() {
    const payload = {
      ...this.newTransaction,
      transactionValue: Number(this.newTransaction.transactionValue),
      PayMethod: Number(this.newTransaction.payMethod),
      ExitJoin: Number(this.newTransaction.exitJoin),
      totalInstallments: Number(this.newTransaction.totalInstallments)
    }

    console.log('Enviado para o servidor:', payload);

    this.addTransaction(payload).subscribe({
      next: (res) => {
        alert('Salvo com sucesso!');
        this.loadTransactions();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro ao salvar!', err);
        if (err.error && err.error.errors) {
          console.table(err.error.errors);
        }
      }
    });
  }

  addTransaction(transaction: TransactionsModel): Observable<TransactionsModel> {
    return this.http.post<TransactionsModel>(this.apiUrl, transaction);
  }

  getTransactions(): Observable<TransactionsModel[]> {
    return this.http.get<TransactionsModel[]>(this.apiUrl);
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
