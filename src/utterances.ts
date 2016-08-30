let index: number = 0;

export default class Utterances {
  private utterances: Map<number, SpeechSynthesisUtterance>;

  constructor() {
    this.utterances = new Map<number, SpeechSynthesisUtterance>();
  }

  public create(text: string, lang: string,
                volume: number, rate: number, pitch: number): [ SpeechSynthesisUtterance, number ] {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang === lang);
    utterance.lang = lang;
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;

    index += 1;
    this.utterances.set(index, utterance);

    return [ utterance, index ];
  }

  public delete(index: number): void {
    this.utterances.delete(index);
  }
}
