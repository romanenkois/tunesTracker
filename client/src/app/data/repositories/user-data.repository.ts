import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserDataRepository {
  private readonly userCode: WritableSignal<string> = signal<string>('');
  public setUserCode(code: string): void {
    this.userCode.set(code);
  }
  public getUserCode(): string {
    return this.userCode();
  }
}
