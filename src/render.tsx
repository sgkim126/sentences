import Main from './main.tsx';
import SentenceStorage from './sentence-storage.ts';
import Utterances from './utterances.ts';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function isSpeechSupport(window: Window): boolean {
  const SPEECH_SYNTHESIS_UTTERANCE = 'SpeechSynthesisUtterance';
  return window.speechSynthesis != null && window[SPEECH_SYNTHESIS_UTTERANCE] != null;
}

function isFirst(value: string, index: number, arr: string[]) {
  return arr.indexOf(value) === index;
}

function isEmptyString(value: string) {
  return value === '';
}

function getLanguages(speechSynthesis: SpeechSynthesis): Promise<string[]> {
  return (new Promise(resolve => {
    speechSynthesis.onvoiceschanged = resolve;
  })).then(() => speechSynthesis.getVoices().map(v => v.lang).filter(isFirst).filter(isEmptyString));
}

document.body.onload = () => {
  const target: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
  const utterances = new Utterances();
  const sentenceStorage = new SentenceStorage([ window.localStorage, window.sessionStorage ]);

  const sentences = sentenceStorage.get();

  ReactDOM.render(<Main sentences={sentences} langs={[]} utterances={utterances} />, target);
  if (!isSpeechSupport(window)) {
    return;
  }

  getLanguages(window.speechSynthesis)
  .then(langs => ReactDOM.render(<Main sentences={sentences} langs={langs} utterances={utterances} />, target));
};
