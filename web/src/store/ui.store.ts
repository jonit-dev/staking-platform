import { makeAutoObservable } from "mobx";

import { RootStore } from "./root.store";
import { INotification } from "./types/ui.types";

export class UIStore {
  public notification: INotification | null = null;
  public isLoading = false;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }

  public showNotification(newNotification: INotification): void {
    this.notification = newNotification;

    setTimeout(() => {
      this.notification = null;
    }, 5000);
  }

  public setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
}
