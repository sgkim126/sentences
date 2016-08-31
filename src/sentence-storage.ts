import ISentence from './isentence.ts';
const KEY = 'SENTENCES-STORAGE';

export default class SentenceStorage {
  private storage: Storage;

  constructor(storage: Storage[]) {
    this.storage = storage.find(storage => storage != null);
  }

  public get(): ISentence[] {
    if (this.storage == null) {
      return [];
    }
    const sentences = this.storage.getItem(KEY);
    if (sentences == null) {
      return [];
    }
    return JSON.parse(sentences);
  }

  public set(sentences: ISentence[]): void {
    if (this.storage == null) {
      return;
    }
    this.storage.setItem(KEY, JSON.stringify(sentences));
  }
}
