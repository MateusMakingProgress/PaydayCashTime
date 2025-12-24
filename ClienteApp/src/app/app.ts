import { Component, OnInit, signal, computed } from '@angular/core';
import { TransactionsService } from './services/transactions';
import { TransactionsModel } from './models/transactions.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '/components/transactionList/transactionsList.component.html',
  styleUrls: ['/components/transactionList/transactionList.component.css']
})
export class App implements OnInit {

  transactions = signal<TransactionsModel[]>([]);

  totalExits = computed(() => {
    return this.transactions()
      .filter(t => t.exitJoin == 2)
      .reduce((sum, item) => sum + (item.transactionValue || 0), 0);
  });

  totalJoins = computed(() => {
    return this.transactions()
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

  newTransaction: TransactionsModel = {
    whoDid: '',
    description: '',
    transactionValue: 0,
    payMethod: 1,
    exitJoin: 1,
    transactionDate: new Date().toISOString().slice(0, 16),
    haveInstallments: false,
    totalInstallments: 0

  }

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionsService.getTransactions().subscribe(data => {
      const sortedData = data.sort((a, b) => 
        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
      );
      this.transactions.set(sortedData);
    });
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

    this.transactionsService.addTransaction(payload).subscribe({
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

  resetForm() {
    this.newTransaction = {
      whoDid: '',
      exitJoin: 1,
      description: '',
      transactionValue: 0,
      payMethod: 1,
      transactionDate: new Date().toISOString().slice(0, 16),
      totalInstallments: 0, haveInstallments: false
    };
  }
}
