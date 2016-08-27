import PitchOption from './pitch-option.tsx';
import RateOption from './rate-option.tsx';
import VolumeOption from './volume-option.tsx';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

interface IProps {
  disabled: boolean;
}

interface IState {
}

const VOLUME = 'volumeRefOption';
const RATE = 'rateOptionRef';
const PITCH = 'pitchOptionRef';

export default class Option extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { };
  }

  public render(): JSX.Element {
    const { disabled } = this.props;

    return <Grid fluid>
      <Row>
        <Col xs={1} sm={1}>Volume:</Col>
        <Col xs={11} sm={3}>
          <VolumeOption disabled={disabled} ref={VOLUME} />
        </Col>
        <Col xs={1} sm={1}>Rate:</Col>
        <Col xs={11} sm={3}>
          <RateOption disabled={disabled} ref={RATE} />
        </Col>
        <Col xs={1} sm={1}>Pitch:</Col>
        <Col xs={11} sm={3}>
          <PitchOption disabled={disabled} ref={PITCH} />
        </Col>
      </Row>
    </Grid>;
  }

  public get volume(): number {
    return (this.refs[VOLUME] as VolumeOption).volume;
  }
  public get rate(): number {
    return (this.refs[RATE] as RateOption).rate;
  }
  public get pitch(): number {
    return (this.refs[PITCH] as PitchOption).pitch;
  }
}
