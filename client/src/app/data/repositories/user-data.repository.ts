import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserDataRepository {
  private readonly userCode: WritableSignal<string> = signal<string>('');
  public setUserCode(code: string): void {
    this.userCode.set(code);
    sessionStorage.setItem('userCode', code);
  }
  public getUserCode(): string {
    return this.userCode();
  }

  private readonly userProfile: WritableSignal<any> = signal<any>(null);
  public setUserProfile(data: any): void {
    this.userProfile.set(data);
  }
  public getUserProfile(): any {
    return this.userProfile();
  }
}
