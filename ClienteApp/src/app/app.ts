import { Component, OnInit ,signal, computed } from '@angular/core';
import { TransactionsService } from './services/transactions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './components/transactionList/transactionsList.component.html',
  styleUrls: ['./components/transactionList/transactionList.component.css']
})
export class App implements OnInit {

  transactions = computed(() => this.transactionsService.filteredTransactions());
  totalJoins = computed(() => this.transactionsService.totalJoins());
  totalExits = computed(() => this.transactionsService.totalExits());
  totalBalance = computed(() => this.transactionsService.totalBalance());

  constructor(public transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.loadTransactions();
  }

  updateSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.transactionsService.searchTerm.set(target.value);
  }

  filteredTransactions() {
    return this.transactionsService.filteredTransactions();
  }

  paymentMethods() {
    return this.transactionsService.paymentMethods;
  }

  save() {
    this.transactionsService.save();
  }

  remove(id: string | undefined) {
    if (!id) return;

    if (confirm('Tem certeza que deseja remover esta transação?')) {
      this.transactionsService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactionsService.loadTransactions();
          alert('Removido com sucesso!');
        },
        error: (err: any) => alert('Não foi possível remover a transação.')
      });
    }
  }
}
