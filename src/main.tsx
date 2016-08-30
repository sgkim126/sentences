import ISentence from './isentence.ts';
import Option from './option.tsx';
import Sentence from './sentence.tsx';
import Utterances from './utterances.ts';
import * as React from 'react';
import { Pagination } from 'react-bootstrap';

interface IProps {
  sentences: ISentence[];
  langs: string[];

  utterances: Utterances;
}
interface IState {
  disabled?: boolean;

  index?: number;
}

const OPTION = 'optionRef';

export default class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const disabled = false;
    const index = 1;

    this.state = { disabled, index };
  }

  public render(): JSX.Element {
    const { langs, sentences } = this.props;
    const { disabled, index } = this.state;

    const speak = langs.length === 0 ? null : this.speak.bind(this);
    const numberOfPages = sentences.length;

    const sentence = sentences[index - 1];
    const onPageSelect = this.onPageSelect.bind(this);

    return <div className='container-fluid'>
      <Option disabled={disabled} ref={OPTION} />
      <Sentence
        speak={speak}
        sentences={sentence.sentences}
        comments={sentence.comments} />
      <div className='center-block text-center'>
        <Pagination items={numberOfPages} bsSize='medium' activePage={index} maxButtons={10} onSelect={onPageSelect}
          first last next prev ellipsis />
      </div>
  </div>;
  }

  private speak(text: string, lang: string): void {
    this.setState({ disabled: true });

    const option = this.refs[OPTION] as Option;

    const volume = option.volume;
    const rate = option.rate;
    const pitch = option.pitch;

    const { utterances } = this.props;

    speak(text, lang, volume, rate, pitch, utterances).catch(e => console.log(e)).then(() => {
      this.setState({ disabled: false });
    });
  }

  private onPageSelect(index: number): void {
    this.setState({ index });
  }
}

function speak(text: string, lang: string,
               volume: number, rate: number, pitch: number, utterances: Utterances): Promise<{}> {
  if (text == null || text === '') {
    return Promise.reject<{}>(new Error('no text'));
  }
  const [ utterance, utteranceIndex ] = utterances.create(text, lang, volume, rate, pitch);
  const result = new Promise((resolve, reject) => {
    utterance.onend = resolve;
    utterance.onerror = reject;
    speechSynthesis.speak(utterance);
  });
  result.then(() => utterances.delete(utteranceIndex), () => utterances.delete(utteranceIndex));
  return result;
}
