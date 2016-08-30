import ISentence from './isentence.ts';
import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

interface IProps extends ISentence {
  speak?: (sentence: string, lang: string) => void;
}
interface IState {
}

export default class Sentence extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { };
  }

  public render(): JSX.Element {
    const { sentences, comments, speak } = this.props;
    return <ListGroup>
      {sentences.map(([sentence, lang]) =>
        <ListGroupItem key={'s-' + sentence + '-' + lang} onClick={() => speak && speak(sentence, lang)}>{sentence}</ListGroupItem>
      )}
      {comments.map(comment => <ListGroupItem key={'c-' + comment} bsStyle='info'>{comment}</ListGroupItem>)}
    </ListGroup>;
  }
}
